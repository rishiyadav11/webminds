import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left: Logo / Branding */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold">WebMinds</h2>
          <p className="text-gray-400 text-sm mt-1">
            Crafted with ❤️ by{" "}
            <a
              href="https://github.com/rishiyadav11"
              target="_blank"
              className="text-blue-500 underline hover:text-blue-400 transition-colors"
            >
              Rishi Yadav
            </a>
          </p>
        </div>

        {/* Right: Copyright */}
        <div className="text-gray-500 text-sm text-center md:text-right">
          © {new Date().getFullYear()} WebMinds. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
