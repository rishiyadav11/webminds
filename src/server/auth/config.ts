import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { db } from "server/db";
import { account, sessions, users, verificationTokens } from "server/db/schema";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      githubId?: string;
      bio?: string;
    } & DefaultSession["user"];
  }
}

// Define a typed user that matches your Drizzle schema
interface AuthUser {
  id: string;
  githubId?: string;
  bio?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export const authConfig: NextAuthConfig = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
          githubId: profile.login,
          bio: profile.bio,
        };
      },
    }),
  ],
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: account,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  trustHost: true,
  callbacks: {
    session: ({ session, user }) => {
      const typedUser = user as AuthUser; // ✅ safely cast user
      return {
        ...session,
        user: {
          ...session.user,
          id: typedUser.id,
          githubId: typedUser.githubId,
          bio: typedUser.bio,
        },
      };
    },
  },
};
