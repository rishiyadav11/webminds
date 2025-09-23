"use client";

import { signIn, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Github } from "lucide-react";

const StartPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if user is already logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  // GitHub login handler (forces account chooser)
  const handleGitHubLogin = () => {
    void signIn("github", {
      prompt: "select_account", // Force GitHub to show account chooser
      allow_signup: true,       // Optional: allow new user signup
    });
  };

  // Logout handler
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/start" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex flex-col items-center justify-center px-6 md:px-12">
      
      {/* Hero Section */}
      {!session && (
        <div className="text-center max-w-3xl flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 md:mb-8 leading-tight">
            Connect with <span className="text-cyan-400">WebMinds</span>
          </h1>
          <p className="text-gray-400 mb-10 text-base md:text-lg">
            Sign in with your GitHub account so we can get to know each other better. 
            Explore your projects, showcase your work, and instantly create a stunning developer portfolio.
          </p>

          {/* GitHub Login Button */}
          <button
            onClick={handleGitHubLogin}
            className="flex items-center cursor-pointer justify-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 text-black font-semibold py-3 px-8 rounded-xl shadow-lg"
          >
            <Github size={24} /> Connect with GitHub
          </button>
        </div>
      )}

      {/* Illustration / Hero Image */}
      {!session && (
        <div className="mt-16 w-full flex justify-center">
          <div className="relative w-full max-w-3xl h-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 animate-gradient-x"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <span className="text-white text-2xl md:text-4xl font-bold animate-bounce mb-2">
                🚀 Let&apos;s explore your projects
              </span>
              <span className="text-gray-200 text-sm md:text-lg">
                Your GitHub projects will be instantly visible in your portfolio.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Logout Button if logged in */}
      {session && (
        <button
          onClick={handleLogout}
          className="mt-10 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg"
        >
          Logout
        </button>
      )}

      {/* Footer */}
      {!session && (
        <footer className="mt-16 text-gray-600 text-sm md:text-base text-center">
          &copy; {new Date().getFullYear()} WebMinds. All rights reserved.
        </footer>
      )}

      {/* Animations */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 6s ease infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default StartPage;
