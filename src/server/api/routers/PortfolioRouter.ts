import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { portfolios, users } from "../../db/schema";
import { db } from "../../db";
import { eq } from "drizzle-orm";

// Input schemas
const experienceSchema = z.object({
  id: z.string().optional(),
  company: z.string(),
  role: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  current: z.boolean(),
  description: z.string(),
});

const createPortfolioSchema = z.object({
  userId: z.string(),
  personal: z.any(), // required
  skills: z.array(z.string()),
  projects: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
      selected: z.boolean(),
    })
  ),
  socials: z.any(), // required
  experience: z.array(experienceSchema),
  theme: z.string(),
  link: z.string(),
});

const updatePortfolioSchema = z.object({
  id: z.string(),
  personal: z.any().optional(),
  skills: z.array(z.string()).optional(),
  projects: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
      selected: z.boolean(),
    })
  ).optional(),
  socials: z.any().optional(),
  experience: z.array(experienceSchema).optional(),
  theme: z.string().optional(),
  link: z.string().optional(),
});

const deletePortfolioSchema = z.object({
  id: z.string(),
});

const getByUserSchema = z.object({
  userId: z.string(),
});

const getByIdSchema = z.object({
  id: z.string(),
});

// Router
export const portfolioRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createPortfolioSchema)
    .mutation(async ({ input }) => {
      // Ensure required fields are not undefined
      const result = await db.insert(portfolios).values({
        personal: input.personal,
        socials: input.socials,
        skills: input.skills,
        projects: input.projects,
        experience: input.experience,
        theme: input.theme,
        link: input.link,
        userId: input.userId,
      });
      return result;
    }),
  update: protectedProcedure
    .input(updatePortfolioSchema)
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const result = await db
        .update(portfolios)
        .set({ ...data }) // updatedAt will be auto-updated if table has default triggers
        .where(eq(portfolios.id, id));
      return result;
    }),
  getByUser: protectedProcedure
    .input(getByUserSchema)
    .query(async ({ input }) => {
      const portfolio = await db
        .select()
        .from(portfolios)
        .where(eq(portfolios.userId, input.userId))
        .limit(1);
      return portfolio[0] ?? null;
    }),
  getById: protectedProcedure
    .input(getByIdSchema)
    .mutation(async ({ input }) => {
      const portfolio = await db
        .select()
        .from(portfolios)
        .where(eq(portfolios.id, input.id))
        .limit(1);
      return portfolio[0] ?? null;
    }),
  getAll: protectedProcedure.query(async () => {
    const allPortfolios = await db.select().from(portfolios);
    return allPortfolios;
  }),
  delete: protectedProcedure
    .input(deletePortfolioSchema)
    .mutation(async ({ input }) => {
      const result = await db
        .delete(portfolios)
        .where(eq(portfolios.id, input.id));
      return result;
    }),
  // New procedure to get portfolio by GitHub ID
  getByGithubId: publicProcedure
    .input(z.object({ githubId: z.string() }))
    .query(async ({ input }) => {
      // Find the user by their GitHub ID
      const user = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.githubId, input.githubId))
        .limit(1);
      // If the user is not found, return null
      if (!user[0]) {
        return null;
      }
      const userId = user[0].id;
      // Find the portfolio using the user's ID
      const portfolio = await db
        .select()
        .from(portfolios)
        .where(eq(portfolios.userId, userId))
        .limit(1);
      return portfolio[0] ?? null;
    }),
});

export type PortfolioRouter = typeof portfolioRouter;
