import GoogleProvider from "next-auth/providers/google";
import prisma from "@repo/db/client";
import { Account, User } from "next-auth";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: User; account: Account | null }) {
      console.log("Successfully signed in");

      if (!user || !user.email || !account) return false;

      await prisma.merchant.upsert({
        select: {
          id: true,
        },
        where: {
          email: user.email,
        },
        create: {
          email: user.email,
          name: user.name ?? "",
          auth_type: account.provider === "google" ? "GOOGLE" : "GITHUB",
        },
        update: {
          name: user.name ?? "",
          auth_type: account.provider === "google" ? "GOOGLE" : "GITHUB",
        },
      });

      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "secret",
};
