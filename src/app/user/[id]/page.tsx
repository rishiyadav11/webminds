import { api } from "../../../trpc/server";
import { z } from "zod";
import { ThemeProvider } from "hooks/useTheme";

import Header from "app/_components/portfolio/Header";
import Home from "app/_components/portfolio/Home";
import Experience from "app/_components/portfolio/Experience";
import Projects from "app/_components/portfolio/Projects";
import Contact from "app/_components/portfolio/Contact";
import Skills from "app/_components/portfolio/Skills";
import Footer from "app/_components/portfolio/Footer";

import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "../../../server/api/root";

type Portfolio = inferRouterOutputs<AppRouter>["portfolioRouter"]["getByGithubId"];

// Zod validation
const personalSchema = z.object({
  name: z.string(),
  role: z.string(),
  bio: z.string(),
  image: z.string().url(),
});
const socialsSchema = z.object({
  github: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
});
const projectSchema = z.object({ name: z.string(), url: z.string() });
const experienceSchema = z.object({
  role: z.string(),
  company: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  current: z.boolean(),
  description: z.string(),
});
const portfolioSchema = z.object({
  personal: personalSchema,
  skills: z.array(z.string()),
  projects: z.array(projectSchema),
  experience: z.array(experienceSchema),
  socials: socialsSchema,
  theme: z.string(),
});

// ✅ Strongly typed params
interface PageParams {
  params: {
    id: string;
  };
}

// ✅ Dynamic Metadata
export async function generateMetadata({ params }: PageParams) {
  const githubId = params.id;

  const portfolio: Portfolio | null = await api.portfolioRouter.getByGithubId({ githubId });

  if (!portfolio) {
    return {
      title: "Webminds Portfolio",
      description: "Create your portfolio in seconds with Webminds.",
    };
  }

  const { personal } = portfolioSchema.parse(portfolio);

  return {
    title: `${personal.name} | ${personal.role}`,
    description: personal.bio,
    openGraph: {
      title: `${personal.name} | ${personal.role}`,
      description: personal.bio,
      images: [{ url: personal.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${personal.name} | ${personal.role}`,
      description: personal.bio,
      images: [personal.image],
    },
  };
}

export default async function UserPortfolioPage({ params }: PageParams) {
  const githubId = params.id;

  if (!githubId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
        <h1 className="text-3xl">No user ID provided.</h1>
      </div>
    );
  }

  const portfolio: Portfolio | null = await api.portfolioRouter.getByGithubId({ githubId });

  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
        <h1 className="text-3xl">This user has not created a portfolio yet.</h1>
      </div>
    );
  }

  // ✅ Zod parse ensures safe typing
  const { personal, skills, projects, experience, socials, theme } = portfolioSchema.parse(portfolio);

  return (
    <ThemeProvider initialThemeName={theme}>
      <Header />
      <Home personal={personal} />
      <Skills skills={skills} />
      <Experience experience={experience} />
      <Projects projects={projects} />
      <Contact socials={socials} />
      <Footer personal={personal} socials={socials} />
    </ThemeProvider>
  );
}
