"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { api } from "../../trpc/react";
import { logout } from "../../server/actions/authActions";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { data: portfolio, isLoading } = api.portfolioRouter.getByUser.useQuery(
    { userId: session?.user?.id ?? "" },
    {
      enabled: !!session?.user?.id,
    }
  );

  const deletePortfolioMutation = api.portfolioRouter.delete.useMutation({
    onSuccess: async () => {
      toast.success("Portfolio deleted successfully!");
      router.refresh(); 
    },
    onError: () => toast.error("Failed to delete portfolio."),
  });


  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!session) {
    return <p className="text-white">Redirecting...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-3xl text-center space-y-10">
        {/* Profile Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-28 h-28 rounded-full overflow-hidden ring-4 ring-cyan-500 shadow-lg">
            <Image
              src={session.user?.image ?? "/default-avatar.png"}
              alt={session.user?.name ?? "User"}
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold">
            Welcome, <span className="text-cyan-400">{session.user?.name}</span>
          </h1>
          <p className="text-gray-400 mt-2">
            Your developer journey, beautifully showcased.
          </p>
        </div>

        {/* Portfolio Section */}
        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-600/30 rounded-2xl p-10 shadow-xl backdrop-blur-md">
          {portfolio ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">🌐 Your Portfolio</h2>
              <p className="text-gray-300">
                Manage and share your portfolio with the world.
              </p>
              <div className="flex justify-center items-center gap-6 mt-6">
                <Link
                  href={`/dashboard/manage?id=${portfolio?.id}`}
                  className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-medium transition"
                >
                  Manage Portfolio
                </Link>

                <Link
                target="_blank"
                  href={`/user/${session.user?.githubId}`}
                  className="px-6 py-2 border border-cyan-500 hover:bg-cyan-500 hover:text-black rounded-lg font-medium transition"
                >
                  View Live
                </Link>
                
                <button
                    onClick={async () => {
                        const confirmed = window.confirm(
                            "Are you sure you want to delete your portfolio? This action cannot be undone."
                        );
                        if (confirmed && portfolio?.id) {
                            await deletePortfolioMutation.mutateAsync({ id: portfolio.id });
                        }
                    }}
                    disabled={deletePortfolioMutation.status === "pending"}
                    className="p-2 bg-red-600 cursor-pointer hover:bg-red-700 rounded-lg transition disabled:opacity-50"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">✨ No Portfolio Yet</h2>
              <p className="text-gray-300">
                Create your stunning developer portfolio in seconds.
              </p>
              <Link
                href="/dashboard/create"
                className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-medium transition"
              >
                Create Portfolio
              </Link>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button
          className="mt-6 px-6 py-2 bg-red-600 rounded-md text-white hover:bg-red-700 cursor-pointer transition"
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
