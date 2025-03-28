"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import prisma from "@repo/db/client";

export async function createOnRampTransactions(
  amount: number,
  provider: string
) {
  const session = await getServerSession(authOptions);
  const userId = await session?.user.id;
  const token = (Math.random() * 10000).toString();
  if (!userId) {
    return {
      message: "User not logged in",
    };
  }
  await prisma.onRampTransaction.create({
    data: {
      userId: Number(userId),
      amount: amount * 100,
      status: "Processing",
      startTime: new Date(),
      provider: provider,
      token: token,
    },
  });
  return {
    message: "OnRamp Transaction Processing",
  };
}
