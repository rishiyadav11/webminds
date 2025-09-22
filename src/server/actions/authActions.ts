"use server";
import { signOut as serverSignOut } from "../auth";

export async function logout() {
  await serverSignOut({ redirectTo: "/start" });
}
