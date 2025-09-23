import { signOut } from "next-auth/react";

export function handleLogout() {
  signOut({ callbackUrl: "/start" }); // redirects and clears session cookies
}
