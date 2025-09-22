import React from "react";

interface FooterProps {
  personal: {
    name: string;
    role?: string;
  };
  socials?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

const Footer: React.FC<FooterProps> = ({ personal, socials }) => {
  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left: Branding */}
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-2xl font-extrabold tracking-wide text-white">
            WebMinds
          </h2>
          <p className="text-gray-400 text-sm">
            Crafted with ❤️ by{" "}
            <a
              href={`https://github.com/${socials?.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-400 transition-colors"
            >
              {personal.name}
            </a>
          </p>

        </div>

        {/* Right: Socials & Copyright */}
        <div className="flex flex-col md:items-end items-center gap-3">
                   {personal.role && (
<p className="text-gray-400 text-sm mt-1">
    Role: <span className="text-white font-medium capitalize">{personal.role}</span>
  </p>

          )}
          <p className="text-gray-500 text-sm text-center md:text-right">
            © {new Date().getFullYear()} WebMinds. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
