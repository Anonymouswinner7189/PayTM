import prisma from "../src/index";
import bcrypt from "bcryptjs";

async function main() {
  const hashedPassword = await bcrypt.hash("123456", 10);
  const jin = await prisma.user.upsert({
    where: {
      number: "1234567890",
    },
    update: {},
    create: {
      number: "1234567890",
      password: hashedPassword,
      name: "jin",
      Balance: {
        create: {
          amount: 789645,
          locked: 78872,
        },
      },
      OnRampTransaction: {
        createMany: {
          data: [
            {
              startTime: new Date(),
              amount: 4444,
              status: "Success",
              token: "435",
              provider: "HDFC Bank",
            },
            {
              startTime: new Date(),
              amount: 555555,
              status: "Failure",
              token: "987",
              provider: "AXIS Bank",
            },
          ],
        },
      },
    },
  });

  const sung = await prisma.user.upsert({
    where: {
      number: "1542636475",
    },
    update: {},
    create: {
      number: "1542636475",
      password: hashedPassword,
      name: "sung",
      Balance: {
        create: {
          amount: 7709709,
          locked: 53979,
        },
      },
      OnRampTransaction: {
        createMany: {
          data: [
            {
              startTime: new Date(),
              amount: 44444553,
              status: "Failure",
              token: "43532",
              provider: "HDFC Bank",
            },
            {
              startTime: new Date(),
              amount: 55463,
              status: "Success",
              token: "98427",
              provider: "AXIS Bank",
            },
          ],
        },
      },
    },
  });

  const woo = await prisma.user.upsert({
    where: {
      number: "6463631234",
    },
    update: {},
    create: {
      number: "6463631234",
      password: hashedPassword,
      name: "woo",
      Balance: {
        create: {
          amount: 352352,
          locked: 53252,
        },
      },
      OnRampTransaction: {
        createMany: {
          data: [
            {
              startTime: new Date(),
              amount: 12345,
              status: "Success",
              token: "3243",
              provider: "HDFC Bank",
            },
          ],
        },
      },
    },
  });

  console.log({ jin, sung, woo });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
