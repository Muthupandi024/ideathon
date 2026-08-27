import React from 'react';
import { Brain, Sparkles, Workflow, Eye, MessageSquare, Layers } from 'lucide-react';

const Theme = () => {
  const tracks = [
    {
      icon: Brain,
      title: 'Artificial Intelligence',
      desc: 'Intelligent systems capable of learning, reasoning, and assisting humans across diverse real-world domains.',
      color: 'from-cyan-500 to-blue-600',
      badge: 'CORE AI'
    },
    {
      icon: Sparkles,
      title: 'Generative AI',
      desc: 'Modern AI systems capable of creating text, high-resolution imagery, synthetic code, and multimodal content.',
      color: 'from-purple-500 to-pink-600',
      badge: 'GEN AI'
    },
    {
      icon: Workflow,
      title: 'Intelligent Automation',
      desc: 'Using AI algorithms and smart software systems to automate complex, meaningful real-world operational workflows.',
      color: 'from-blue-500 to-indigo-600',
      badge: 'AUTOMATION'
    },
    {
      icon: Eye,
      title: 'Computer Vision',
      desc: 'AI-powered perceptual understanding of images, visual streams, video analytics, and spatial data.',
      color: 'from-emerald-500 to-teal-600',
      badge: 'VISION'
    },
    {
      icon: MessageSquare,
      title: 'Natural Language Intelligence',
      desc: 'Cognitive systems capable of understanding, parsing, translating, and processing human language effortlessly.',
      color: 'from-pink-500 to-rose-600',
      badge: 'NLP'
    },
    {
      icon: Layers,
      title: 'Emerging Technologies',
      desc: 'Explore groundbreaking technological paradigms shaping the next generation of intelligent digital architecture.',
      color: 'from-amber-500 to-orange-600',
      badge: 'EMERGING'
    }
  ];

  return (
    <section id="theme" className="relative py-24 bg-[#050A15] border-t border-cyan-500/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-300">
            <span>OFFICIAL EVENT THEME</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-white tracking-tight">
            AI & EMERGING <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">INTELLIGENT TECH.</span>
          </h2>

          <p className="text-cyan-400 font-mono text-sm sm:text-base tracking-widest uppercase font-bold">
            FOR A SMARTER FUTURE
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track) => {
            const Icon = track.icon;
            return (
              <div
                key={track.title}
                className="glass-panel p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/50 hover:shadow-neon-purple transition-all duration-300 relative group overflow-hidden"
              >
                {/* Subtle Gradient Accent */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${track.color} opacity-10 rounded-full blur-2xl group-hover:opacity-30 transition-opacity`} />

                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${track.color} p-[1px] shadow-lg`}>
                    <div className="w-full h-full bg-[#0B0F19] rounded-[11px] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-cyan-300" />
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                    {track.badge}
                  </span>
                </div>

                <h3 className="font-orbitron font-bold text-lg text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {track.title}
                </h3>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {track.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Theme;
