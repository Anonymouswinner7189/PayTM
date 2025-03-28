"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AppBar } from "./components/AppBar";

export function AppBarClient() {
  const session = useSession();
  const router = useRouter();

  return (
    <AppBar
      onSignin={signIn}
      onSignout={async () => {
        await signOut();
        router.push("/api/auth/signin");
      }}
      user={session.data?.user}
    />
  );
}
