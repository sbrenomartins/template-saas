"use server";

import { signIn } from "@/app/lib/auth";

export async function handleSignIn() {
  await signIn("google", {
    redirectTo: "/dashboard",
  });
}
