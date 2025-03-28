"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import prisma from "@repo/db/client";

export async function p2pTransfer({
  to,
  amount,
}: {
  to: string;
  amount: number;
}) {
  const session = await getServerSession(authOptions);
  const fromUser = session?.user?.id;
  if (!fromUser) {
    return {
      message: "Error while sending",
    };
  }

  const toUser = await prisma.user.findFirst({
    where: {
      number: to,
    },
  });
  if (!toUser) {
    return {
      message: "User not found",
    };
  }

  await prisma.$transaction(async (transaction) => {
    await transaction.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(fromUser)} FOR UPDATE`;

    const fromBalance = await prisma.balance.findUnique({
      where: {
        userId: Number(fromUser),
      },
    });

    if (!fromBalance || fromBalance.amount < amount) {
      return {
        message: "Insufficient Funds",
      };
    }

    await transaction.balance.update({
      where: {
        userId: Number(fromUser),
      },
      data: {
        amount: {
          decrement: amount,
        },
      },
    });

    await transaction.balance.update({
      where: {
        userId: toUser.id,
      },
      data: {
        amount: {
          increment: amount,
        },
      },
    });

    await transaction.p2pTransfer.create({
      data: {
        fromUserId: Number(fromUser),
        toUserId: toUser.id,
        amount: amount,
        timestamp: new Date(),
      },
    });
  });

  return {
    message: "Transfer Successful",
  };
}
