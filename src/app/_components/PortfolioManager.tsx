
"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { api as trpc } from "../../trpc/react";
import toast from "react-hot-toast";
import type { TRPCClientErrorLike } from "@trpc/client";
import { useRouter } from "next/navigation";
import {
  Github, Linkedin, Twitter, ExternalLink, Plus, Edit3, Trash2, Save, X,
  Sparkles, User, Code, Briefcase, Calendar, Share2, Palette, CheckCircle
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import Image from "next/image";

// Types
type Personal = {
  name: string;
  bio: string;
  role: string;
  location: string;
  image: string;
};
type Project = { name: string; url: string; selected: boolean };
type Experience = {
  id?: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
};
type Socials = { github: string; linkedin: string; twitter: string };

interface PortfolioManagerProps {
  mode?: 'create' | 'edit';
  initialData?: {
    personal: Personal;
    skills: string[];
    projects: Project[];
    socials: Socials;
    experience: Experience[];
    theme: string;
  };
  portfolioId?: string;
}

// Data
const themes = [
  { name: "Light", color: "bg-gray-100", accent: "bg-blue-500" ,image:"/light.png"},
  { name: "Dark", color: "bg-gray-900", accent: "bg-purple-500" ,image:"/dark.png"},
  { name: "Cyan", color: "bg-cyan-50", accent: "bg-cyan-500" ,image:"/cyan.png"},
  { name: "Gradient", color: "bg-gradient-to-br from-purple-400 to-pink-400", accent: "bg-white" ,image:"/gradient.png"}
];
const predefinedSkills = [
  "React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3",
  "Node.js", "Express", "MongoDB", "PostgreSQL", "MySQL", "Redis",
  "Docker", "AWS", "Vercel", "Netlify", "Git", "GitHub",
  "Tailwind CSS", "Styled Components", "SASS", "Bootstrap",
  "GraphQL", "REST APIs", "Prisma", "Supabase", "Firebase",
  "Vue.js", "Angular", "Svelte", "Python", "Java", "PHP"
];

// Main Component
export default function PortfolioManager({
  mode = "create",
  initialData,
  portfolioId,
}: PortfolioManagerProps) {
  const { data: session } = useSession();
  const [step, setStep] = useState(1);
  const [editingExperience, setEditingExperience] = useState<number | null>(null);
  const [isLoadingPortfolio, setIsLoadingPortfolio] = useState(false);
  const router = useRouter();

  // Controlled state, with types everywhere
  const [personal, setPersonal] = useState<Personal>({
    name: "",
    bio: "",
    role: "",
    location: "",
    image: "",
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [customSkill, setCustomSkill] = useState("");
  const [socials, setSocials] = useState<Socials>({ github: "", linkedin: "", twitter: "" });
  const [experience, setExperience] = useState<Experience[]>([]);
  const [newExperience, setNewExperience] = useState<Experience>({
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  });
  const [theme, setTheme] = useState<string>(themes[0]!.name);
  const [loadingRepos, setLoadingRepos] = useState(false);

  // Steps definition
  const steps = [
    { id: 1, title: "Personal", icon: User, description: "Basic information" },
    { id: 2, title: "Skills", icon: Code, description: "Technical expertise" },
    { id: 3, title: "Projects", icon: Briefcase, description: "Your work" },
    { id: 4, title: "Experience", icon: Calendar, description: "Career history" },
    { id: 5, title: "Socials", icon: Share2, description: "Connect with you" },
    { id: 6, title: "Theme", icon: Palette, description: "Visual style" },
    { id: 7, title: "Finish", icon: CheckCircle, description: "Launch time" },
  ];

  // Mutations
  const fetchPortfolio = trpc.portfolioRouter.getById.useMutation({
    onSuccess: (
      data: {
        id: string;
        userId: string;
        personal: unknown;
        skills: unknown;
        projects: unknown;
        socials: unknown;
        experience: unknown;
        theme: string;
        link: string;
        createdAt: Date;
        updatedAt: Date;
      } | null,
    ) => {
      if (data) {
        // Set all state based on the fetched portfolio data
        setPersonal(data.personal as Personal ?? personal);
        setSkills((data.skills as string[]) ?? []);
        const fetchedProjects = (data.projects as Project[]) ?? [];
        setProjects(fetchedProjects);
        setSocials((data.socials as Socials) ?? socials);
        setExperience((data.experience as Experience[]) ?? []);
        setTheme(data.theme ?? theme);

        // Call the repo fetch only after the portfolio data is successfully loaded.
        // This prevents the infinite loading loop.
        const user = session?.user as { githubId?: string };
        if (user?.githubId) {
          void fetchGitHubRepos(user.githubId, fetchedProjects);
        }
      }
      setIsLoadingPortfolio(false);
    },
    onError: (
      err: TRPCClientErrorLike<
        {
          input: { id: string };
          output: {
            id: string;
            userId: string;
            personal: unknown;
            skills: unknown;
            projects: unknown;
            socials: unknown;
            experience: unknown;
            theme: string;
            link: string;
            createdAt: Date;
            updatedAt: Date;
          } | null;
          transformer: true;
          errorShape: object;
        }
      >,
    ) => {
      console.error("Failed to fetch portfolio:", err);
      setIsLoadingPortfolio(false);
    },
  });

  const createPortfolio = trpc.portfolioRouter.create.useMutation({
    onSuccess: () => {
      toast.success("Portfolio created successfully!");
      router.push("/dashboard");
    },
    onError: () => toast.error("Failed to create portfolio"),
  });

  const updatePortfolio = trpc.portfolioRouter.update.useMutation({
    onSuccess: () => {
      toast.success("Portfolio updated!");
      router.push("/dashboard");
    },
    onError: () => toast.error("Failed to update portfolio"),
  });

  // Fetch GitHub repos function, now takes initialProjects as an argument
  const fetchGitHubRepos = async (githubId: string, initialProjects: Project[] = []) => {
    setLoadingRepos(true);
    try {
      let allRepos: Project[] = [];
      let page = 1;
      while (true) {
        const res = await fetch(`https://api.github.com/users/${githubId}/repos?sort=updated&per_page=100&page=${page}`);
        const data = (await res.json()) as { name: string; homepage: string; html_url: string }[];

        if (!data.length) break;

        const repos: Project[] = data.map((r) => ({
          name: r.name,
          url: r.homepage ?? r.html_url,
          selected: false, // Default to false
        }));

        allRepos = [...allRepos, ...repos];
        page++;
      }

      // Create a map of existing projects for faster lookup
      const initialProjectMap = new Map(initialProjects.map(p => [p.name, p.selected]));

      // Merge fetched repos with any pre-selected projects from initialData
      const mergedProjects = allRepos.map(repo => ({
        ...repo,
        selected: initialProjectMap.get(repo.name) ?? false
      }));

      setProjects(mergedProjects);

    } catch (err) {
      console.error("Failed to fetch GitHub repos:", err);
    } finally {
      setLoadingRepos(false);
    }
  };

  // State to track if the initial fetch for create mode has occurred
  const [initialCreateFetchDone, setInitialCreateFetchDone] = useState(false);

  useEffect(() => {
    const user = session?.user as {
      name?: string;
      bio?: string;
      image?: string;
      githubId?: string;
    };
    
    // Logic for "edit" mode
    if (mode === "edit") {
      // If initialData is provided, use it directly
      if (initialData) {
        setPersonal(initialData.personal ?? personal);
        setSkills(initialData.skills ?? []);
        setProjects(initialData.projects ?? []);
        setSocials(initialData.socials ?? socials);
        setExperience(initialData.experience ?? []);
        setTheme(initialData.theme ?? theme);

        // Fetch GitHub repos and merge with initialData
        if (user?.githubId) {
          void fetchGitHubRepos(user.githubId, initialData.projects);
        }
      } else if (portfolioId) {
        // If no initialData, fetch from the database using TRPC
        // The onSuccess callback will handle setting state and fetching repos.
        setIsLoadingPortfolio(true);
        fetchPortfolio.mutate({ id: portfolioId });
      }
    }
    
    // Logic for "create" mode
    if (mode === "create" && user && !initialCreateFetchDone) {
      setPersonal({
        name: user.name ?? "",
        bio: user.bio ?? "",
        role: "",
        location: "",
        image: user.image ?? "",
      });
      setSocials((prev) => ({ ...prev, github: user.githubId ?? "" }));
      
      // Fetch repos only once on initial load for create mode
      if (user?.githubId) {
        void fetchGitHubRepos(user.githubId);
      }
      setInitialCreateFetchDone(true); // Set the flag to prevent re-fetching
    }
}, [session, mode, initialData, portfolioId]); // <-- Missing dependencies

  // Helpers
  const toggleSkill = (skill: string) =>
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );

  const addCustomSkill = () => {
    if (customSkill.trim() && !skills.includes(customSkill.trim())) {
      setSkills([...skills, customSkill.trim()]);
      setCustomSkill("");
    }
  };

  const addExperience = () => {
    if (newExperience.company && newExperience.role) {
      setExperience([
        ...experience,
        { ...newExperience, id: Date.now().toString() },
      ]);
      setNewExperience({
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      });
    }
  };

  const updateExperience = (index: number, updatedExp: Experience) => {
    setExperience(experience.map((exp, i) => (i === index ? updatedExp : exp)));
    setEditingExperience(null);
  };

  const deleteExperience = (index: number) =>
    setExperience(experience.filter((_, i) => i !== index));

  const next = () => setStep((s) => Math.min(s + 1, 7));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmitPortfolio = () => {
    if (!session?.user?.id) return;
    const portfolioData = {
      personal,
      skills,
      projects: projects.filter((p) => p.selected),
      socials,
      experience,
      theme,
      link: `${(personal.name ?? "user").toLowerCase().replace(/\s+/g, "-")}-portfolio`,
    };
    if (mode === "create") {
      createPortfolio.mutate({
        userId: session.user.id,
        ...portfolioData,
      });
    } else if (mode === "edit" && portfolioId) {
      updatePortfolio.mutate({
        id: portfolioId,
        ...portfolioData,
      });
    }
  };

  const isSaving = createPortfolio.status === "pending" || updatePortfolio.status === "pending";

  // Show loading state when fetching portfolio data from the database
  if (mode === 'edit' && isLoadingPortfolio) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 py-12">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-white/20">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-medium">
              {mode === 'create' ? 'Create Your Portfolio' : 'Edit Portfolio'}
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-4 ">
            {mode === 'create' ? '✨ Build Something Amazing' : '🎨 Update Your Story'}
          </h1>
          <p className="text-gray-300 text-lg">
            {mode === 'create'
              ? 'Create a stunning portfolio that showcases your talents'
              : 'Keep your portfolio fresh and up-to-date'
            }
          </p>
        </div>

        {/* Progress Stepper */}
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 mb-8">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              {steps.map((stepItem, idx) => {
                const StepIcon = stepItem.icon;
                const isActive = step === stepItem.id;
                const isCompleted = step > stepItem.id;
                
                return (
                  <div key={stepItem.id} className="flex-1 flex flex-col items-center relative">
                    {/* Connection Line */}
                    {idx < steps.length - 1 && (
                      <div className={`absolute top-6 left-1/2 w-full h-0.5 ${
                        isCompleted ? 'bg-gradient-to-r from-cyan-400 to-purple-400' : 'bg-white/20'
                      }`} style={{ transform: 'translateX(50%)' }} />
                    )}
                    
                    {/* Step Circle */}
                    <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-400 to-purple-400 text-white scale-110 shadow-lg'
                        : isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-white/10 text-gray-400 border border-white/20'
                    }`}>
                      <StepIcon className="w-5 h-5" />
                    </div>
                    
                    {/* Step Label */}
                    <div className="text-center">
                      <p className={`text-sm font-medium ${
                        isActive ? 'text-cyan-400' : isCompleted ? 'text-green-400' : 'text-gray-400'
                      }`}>
                        {stepItem.title}
                      </p>
                      <p className="text-xs text-gray-500 hidden sm:block">
                        {stepItem.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl">
          <CardContent className="p-8">
            {/* Step 1 - Personal */}
            {step === 1 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">Tell us about yourself</h2>
                  <p className="text-gray-300">Let&apos;s start with the basics</p>
                </div>
                
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <Image
                      fill
                        src={personal.image}
                        alt="Profile"
                        className="w-40 h-40 rounded-full border-4 border-cyan-500/50 object-cover shadow-xl"
                      />

                    </div>
                    
                  </div>
                  
                  <div className="flex-1 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                        <Input
                          placeholder="John Doe"
                          value={personal.name}
                          onChange={(e) => setPersonal({ ...personal, name: e.target.value })}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                        <Input
                          placeholder="Full Stack Developer"
                          value={personal.role}
                          onChange={(e) => setPersonal({ ...personal, role: e.target.value })}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                      <Input
                        placeholder="San Francisco, CA"
                        value={personal.location}
                        onChange={(e) => setPersonal({ ...personal, location: e.target.value })}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                      <Textarea
                        placeholder="Tell the world about yourself..."
                        value={personal.bio}
                        onChange={(e) => setPersonal({ ...personal, bio: e.target.value })}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 min-h-[120px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 - Skills */}
            {step === 2 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">What&apos;s your expertise?</h2>
                  <p className="text-gray-300">Select your skills and add custom ones</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Popular Web Development Skills</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {predefinedSkills.map((skill) => (
                        <button
                          key={skill}
                          onClick={() => toggleSkill(skill)}
                          className={`p-3 rounded-lg border transition-all duration-200 text-sm font-medium ${
                            skills.includes(skill)
                              ? 'bg-gradient-to-r from-cyan-500 to-purple-500 border-transparent text-white shadow-lg scale-105'
                              : 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20'
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Your Selected Skills</h3>
                    {skills.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-3 py-1"
                          >
                            {skill}
                            <button
                              onClick={() => setSkills(skills.filter(s => s !== skill))}
                              className="ml-2 hover:text-red-400"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400">No skills selected yet</p>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Add Custom Skill</h3>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter a skill..."
                        value={customSkill}
                        onChange={(e) => setCustomSkill(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addCustomSkill()}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400"
                      />
                      <Button
                        onClick={addCustomSkill}
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

{/* Step 3 - Projects  */}
{step === 3 && (
    <div className="space-y-8">
      <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Show your best work</h2>
          <p className="text-gray-300">Select projects to showcase</p>
      </div>

      {/* New button to fetch repositories */}
      <div className="flex justify-center">
          <Button
              onClick={() => {
                  const user = session?.user as { githubId?: string };
                  if (user?.githubId) {
                      void fetchGitHubRepos(user.githubId, projects);
                  } else {
                      toast.error("GitHub ID not found. Please connect your GitHub account.");
                  }
              }}
              disabled={loadingRepos}
              className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 disabled:opacity-50"
          >
              {loadingRepos ? (
                  <>
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Fetching Repos...
                  </>
              ) : (
                  <>
                      <Github className="w-5 h-5 mr-2" />
                      Fetch Repos from GitHub
                  </>
              )}
          </Button>
      </div>
      
      {loadingRepos ? (
          <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-400">Fetching your repositories...</p>
          </div>
      ) : projects.length === 0 ? (
          <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No projects found</p>
          </div>
      ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project, idx) => (
                  <Card
                      key={idx}
                      className={`transition-all duration-200 cursor-pointer ${
                          project.selected
                              ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500/50'
                              : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                      onClick={() => setProjects(projects.map((p, i) =>
                          i === idx ? { ...p, selected: !p.selected } : p
                      ))}
                  >
                      <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                              <div className="flex-1">
                                  <h3 className="font-semibold text-white mb-2">{project.name}</h3>
                                  {project.url && (
                                      <a
                                          href={project.url}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-sm"
                                          onClick={(e) => e.stopPropagation()}
                                      >
                                          View Live <ExternalLink size={12} />
                                      </a>
                                  )}
                              </div>
                              <div className={`w-5 h-5 rounded-full border-2 transition-colors ${
                                  project.selected
                                      ? 'bg-cyan-500 border-cyan-500'
                                      : 'border-gray-400'
                              }`}>
                                  {project.selected && (
                                      <CheckCircle className="w-3 h-3 text-white m-0.5" />
                                  )}
                              </div>
                          </div>
                      </CardContent>
                  </Card>
              ))}
          </div>
      )}
    </div>
)}

            {/* Step 4 - Experience */}
            {step === 4 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">Your career journey</h2>
                  <p className="text-gray-300">Add your work experience</p>
                </div>
                
                {/* Add New Experience */}
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Plus className="w-5 h-5" />
                      Add Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                        <Input
                          placeholder="Google"
                          value={newExperience.company}
                          onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                        <Input
                          placeholder="Software Engineer"
                          value={newExperience.role}
                          onChange={(e) => setNewExperience({ ...newExperience, role: e.target.value })}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
                        <Input
                          type="date"
                          value={newExperience.startDate}
                          onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">End Date</label>
                        <Input
                          type="date"
                          value={newExperience.endDate}
                          onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                          disabled={newExperience.current}
                          className="bg-white/10 border-white/20 text-white disabled:opacity-50"
                        />
                        <label className="flex items-center gap-2 mt-2">
                          <input
                            type="checkbox"
                            checked={newExperience.current}
                            onChange={(e) => setNewExperience({
                              ...newExperience,
                              current: e.target.checked,
                              endDate: e.target.checked ? '' : newExperience.endDate
                            })}
                            className="rounded"
                          />
                          <span className="text-sm text-gray-300">Currently working here</span>
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                      <Textarea
                        placeholder="Describe your role and achievements..."
                        value={newExperience.description}
                        onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </div>
                    
                    <Button
                      onClick={addExperience}
                      disabled={!newExperience.company || !newExperience.role}
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 disabled:opacity-50"
                    >
                      Add Experience
                    </Button>
                  </CardContent>
                </Card>
                
                {/* Experience List */}
                <div className="space-y-4">
                  {experience.map((exp, idx) => (
                    <Card key={idx} className="bg-white/5 border-white/10">
                      <CardContent className="p-6">
                        {editingExperience === idx ? (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Input
                                value={exp.company}
                                onChange={(e) => updateExperience(idx, { ...exp, company: e.target.value })}
                                className="bg-white/10 border-white/20 text-white"
                              />
                              <Input
                                value={exp.role}
                                onChange={(e) => updateExperience(idx, { ...exp, role: e.target.value })}
                                className="bg-white/10 border-white/20 text-white"
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button
                                onClick={() => setEditingExperience(null)}
                                size="sm"
                                variant="outline"
                                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                              >
                                <Save className="w-4 h-4 mr-1" />
                                Save
                              </Button>
                              <Button
                                onClick={() => setEditingExperience(null)}
                                size="sm"
                                variant="outline"
                                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                              >
                                <X className="w-4 h-4 mr-1" />
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="font-semibold text-white text-lg">{exp.role}</h3>
                              <p className="text-cyan-400 mb-2">{exp.company}</p>
                              <p className="text-sm text-gray-400 mb-3">
                                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                              </p>
                              {exp.description && (
                                <p className="text-gray-300 text-sm">{exp.description}</p>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button
                                onClick={() => setEditingExperience(idx)}
                                size="sm"
                                variant="ghost"
                                className="text-gray-400 hover:text-white"
                              >
                                <Edit3 className="w-4 h-4" />
                              </Button>
                              <Button
                                onClick={() => deleteExperience(idx)}
                                size="sm"
                                variant="ghost"
                                className="text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                  
                  {experience.length === 0 && (
                    <div className="text-center py-8">
                      <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400">No experience added yet</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 5 - Socials */}
            {step === 5 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">Connect with you</h2>
                  <p className="text-gray-300">Add your social media links</p>
                </div>
                
                <div className="space-y-6 max-w-md mx-auto">
                  {[
                    { icon: Github, placeholder: "GitHub Username or URL", key: "github", prefix: "https://github.com/" },
                    { icon: Linkedin, placeholder: "LinkedIn Profile URL", key: "linkedin", prefix: "https://linkedin.com/in/" },
                    { icon: Twitter, placeholder: "Twitter Handle", key: "twitter", prefix: "https://twitter.com/" }
                  ].map((social) => {
                    const SocialIcon = social.icon;
                    return (
                      <Card key={social.key} className="bg-white/5 border-white/10">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                              <SocialIcon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">
                                {social.key}
                              </label>
                              <Input
                                placeholder={social.placeholder}
                                value={socials[social.key as keyof Socials]}
                                onChange={(e) => setSocials({ ...socials, [social.key]: e.target.value })}
                                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 6 - Theme */}
   {step === 6 && (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Choose your style</h2>
        <p className="text-gray-300">Pick a theme that represents you</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {themes.map((themeOption) => (
          <Card
            key={themeOption.name}
            className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
              theme === themeOption.name
                ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500 shadow-xl'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
            onClick={() => setTheme(themeOption.name)}
          >
            <CardContent className="p-4 flex flex-col items-center">
              {/* Theme Image */}
              <div className="w-full h-32 mb-4 relative rounded-lg overflow-hidden">
                <Image
                  src={themeOption.image}
                  alt={themeOption.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              {/* Theme Name */}
              <h3 className="font-semibold text-white text-center">{themeOption.name}</h3>

              {/* Selected Check */}
              {theme === themeOption.name && (
                <div className="flex justify-center mt-2">
                  <CheckCircle className="w-5 h-5 text-cyan-400" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )}

            {/* Step 7 - Finish */}
            {step === 7 && (
              <div className="space-y-8 text-center">
                <div>
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">🎉 Ready to Launch!</h2>
                  <p className="text-gray-300 text-lg">Your portfolio is ready to showcase your amazing work</p>
                </div>
                
                <Card className="bg-white/5 border-white/10 max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle className="text-white">Portfolio Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="text-left">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Name:</span>
                        <span className="text-white">{personal.name || 'Not provided'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Role:</span>
                        <span className="text-white">{personal.role || 'Not provided'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Skills:</span>
                        <span className="text-white">{skills.length} skills</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Projects:</span>
                        <span className="text-white">{projects.filter(p => p.selected).length} selected</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Experience:</span>
                        <span className="text-white">{experience.length} entries</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Theme:</span>
                        <span className="text-white">{theme}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Button
                  onClick={handleSubmitPortfolio}
                  disabled={isSaving}
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-12 py-4 text-lg font-semibold disabled:opacity-50 shadow-xl"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      {mode === 'create' ? 'Creating...' : 'Updating...'}
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      {mode === 'create' ? 'Create Portfolio 🚀' : 'Update Portfolio ✨'}
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <Button
              onClick={back}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              ← Back
            </Button>
          )}
          {step < 7 && (
            <Button
              onClick={next}
              className="ml-auto bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
            >
              Next →
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
