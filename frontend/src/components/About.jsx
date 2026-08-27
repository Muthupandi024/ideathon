import React from 'react';
import { Lightbulb, Code2, Cpu, Rocket, Users, Target } from 'lucide-react';

const About = () => {
  const pillars = [
    {
      icon: Target,
      title: 'Problem Solving',
      desc: 'Formulate crisp engineering solutions for pressing real-world challenges through intelligent methodology.'
    },
    {
      icon: Cpu,
      title: 'Artificial Intelligence',
      desc: 'Harness machine intelligence, neural networks, and modern data-driven cognitive algorithms.'
    },
    {
      icon: Code2,
      title: 'Emerging Technologies',
      desc: 'Integrate automation, smart systems, computer vision, and next-gen technological frameworks.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      desc: 'Transform conceptual theories into tangible working prototypes and impactful software architectures.'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      desc: 'Foster high-energy collaborative synergy in teams of 2 or 4 members to build compelling solutions.'
    },
    {
      icon: Rocket,
      title: 'Real-World Thinking',
      desc: 'Present ideas designed for scalability, operational deployment, and practical industry utility.'
    }
  ];

  return (
    <section id="about" className="relative py-24 bg-[#030712] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400">
            <span>DEPARTMENT OF INFORMATION TECHNOLOGY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-white tracking-tight">
            THINK. BUILD. <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">INNOVATE.</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-inter">
            IDEATHON ’26 is an innovation-focused technology event organized by the Department of Information Technology at AAA College of Engineering and Technology, bringing together ambitious student teams to explore ideas driven by Artificial Intelligence and emerging intelligent technologies for a smarter future.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="glass-panel p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/50 hover:shadow-neon-cyan transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-cyan-400 group-hover:text-pink-400 transition-colors" />
                  </div>
                  <h3 className="font-orbitron font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>PILLAR 0{idx + 1}</span>
                  <span className="text-cyan-400/80 font-semibold">IDEATHON ’26</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default About;
