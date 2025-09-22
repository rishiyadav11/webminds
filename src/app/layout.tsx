import "styles/globals.css";
import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { TRPCReactProvider } from "trpc/react";
import { Toaster } from "react-hot-toast";
import Providers from "./_components/Providers";
import LayoutClient from "./_components/LayoutClient";

export const metadata: Metadata = {
  title: "WebMinds Studio - Fullstack Web Development & Digital Solutions",
  description: "WebMinds Studio offers top-notch web development, portfolio creation, and digital solutions for businesses and developers.",
  keywords: ["WebMinds", "Web Development", "Portfolio", "React", "Next.js", "Fullstack", "JavaScript", "TypeScript", "Digital Solutions"],
  authors: [{ name: "Rishi Yadav", url: "https://webminds1.vercel.app" }],
  openGraph: {
    type: "website",
    title: "WebMinds Studio - Fullstack Web Development",
    description: "Create portfolios, web apps, and digital solutions quickly with WebMinds Studio.",
    url: "https://webminds1.vercel.app",
    siteName: "WebMinds Studio",
    images: [
      {
        url: "/og.PNG",
        width: 1200,
        height: 630,
        alt: "WebMinds Studio Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@rishiyadav11",
    title: "WebMinds Studio - Fullstack Web Development",
    description: "Create portfolios, web apps, and digital solutions quickly with WebMinds Studio.",
    images: ["/og.PNG"],
  },
  icons: [{ rel: "icon", url: "logo.png" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="bg-black text-white w-[120vw] md:w-screen overflow-x-hidden">
        <Providers>
          <Toaster position="top-right" />
          <TRPCReactProvider>
            <LayoutClient>{children}</LayoutClient>
          </TRPCReactProvider>
        </Providers>
      </body>
    </html>
  );
}
