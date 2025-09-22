import React from "react";
import { Users, Rocket, Target } from "lucide-react";

const Aboutus = () => {
  return (
    <section id="about" className="w-full bg-black text-white py-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold">About WebMinds</h1>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            At WebMinds, we’re on a mission to make developer portfolios effortless, 
            beautiful, and impactful — helping coders showcase their skills to the world.
          </p>
        </div>

        {/* Mission / Vision */}
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div className="p-6 bg-gray-900 rounded-2xl shadow-lg border border-gray-700 hover:scale-105 transition-transform">
            <Rocket className="mx-auto mb-4 text-cyan-400" size={40} />
            <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
            <p className="text-gray-400">
              Empower every developer with a stunning portfolio that speaks louder 
              than a résumé — without writing extra code.
            </p>
          </div>

          <div className="p-6 bg-gray-900 rounded-2xl shadow-lg border border-gray-700 hover:scale-105 transition-transform">
            <Target className="mx-auto mb-4 text-emerald-400" size={40} />
            <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
            <p className="text-gray-400">
              To become the go-to platform where developers, designers, and creators 
              showcase their journeys and connect with opportunities.
            </p>
          </div>

          <div className="p-6 bg-gray-900 rounded-2xl shadow-lg border border-gray-700 hover:scale-105 transition-transform">
            <Users className="mx-auto mb-4 text-amber-400" size={40} />
            <h2 className="text-xl font-semibold mb-2">Our Values</h2>
            <p className="text-gray-400">
              Simplicity, creativity, and community — we believe in tools that are 
              easy to use, beautifully designed, and open to everyone.
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-20">
          <h2 className="text-2xl font-bold mb-4">Join the WebMinds Movement 🚀</h2>
          <p className="text-gray-400 mb-6">
            Be part of our journey. Follow us on GitHub and start building your portfolio today.
          </p>
          <a
            href="https://github.com/rishiyadav11"
            target="_blank"
            className="bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-all"
          >
            Follow on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Aboutus;
