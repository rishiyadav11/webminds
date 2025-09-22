import { pgTableCreator, text, timestamp, primaryKey, pgTable, integer, json } from "drizzle-orm/pg-core";
import { randomUUID } from "crypto";

export const createTable = pgTableCreator((name) => `webmindsapp_${name}`);

// Users table
export const users = createTable("user", {
  id: text("id").primaryKey().$defaultFn(() => randomUUID()),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  bio: text("bio"),
  githubId: text("githubId"),
});

// Portfolios table
export const portfolios = createTable("portfolio", {
  id: text("id").primaryKey().$defaultFn(() => randomUUID()),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  personal: json("personal").notNull(),
  skills: json("skills").notNull(),
  projects: json("projects").notNull(),
  socials: json("socials").notNull(),
  experience: json("experience").notNull(),
  theme: text("theme").notNull(),
  link: text("link").notNull(), // unique portfolio link
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

// Accounts table
export const account = pgTable("account", {
  userId: text("userId").notNull(),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("providerAccountId").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
}, (account) => ({
  pk: primaryKey(account.provider, account.providerAccountId),
}));

// Sessions table
export const sessions = createTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

// Verification tokens table
export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    pk: primaryKey(vt.identifier, vt.token),
  })
);
