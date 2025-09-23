"use client"; // must be client-side for signOut

import { signOut } from "next-auth/react";

export async function logout() {
  // Clears NextAuth session and cookies, then redirects to /start
  await signOut({ callbackUrl: "/start" });
}
