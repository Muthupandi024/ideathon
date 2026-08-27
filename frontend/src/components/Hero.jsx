import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Trophy, Users, Sparkles, ArrowRight, ShieldCheck, Cpu, Terminal } from 'lucide-react';

const Hero = ({ onRegisterClick }) => {
  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-hero-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT CONTENT COLUMN */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col space-y-6 text-left"
          >
            {/* Institution Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 w-fit backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="text-xs font-mono font-semibold tracking-wider text-cyan-300">
                AAA COLLEGE OF ENGINEERING AND TECHNOLOGY
              </span>
            </div>

            {/* Sub-Header */}
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-semibold tracking-widest text-slate-400 uppercase font-mono">
                AN AUTONOMOUS INSTITUTION
              </p>
              <h2 className="text-sm sm:text-base font-orbitron font-bold tracking-widest text-purple-400 uppercase">
                DEPARTMENT OF INFORMATION TECHNOLOGY
              </h2>
            </div>

            {/* MAIN TITLE: IDEATHON '26 */}
            <div className="relative">
              <h1 className="text-5xl sm:text-7xl xl:text-8xl font-orbitron font-black tracking-tight uppercase leading-none">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-sky-200 via-purple-300 to-pink-500 drop-shadow-[0_0_35px_rgba(0,240,255,0.4)]">
                  IDEATHON
                </span>
                <span className="text-pink-500 font-extrabold ml-2 drop-shadow-[0_0_25px_rgba(236,72,153,0.7)]">
                  ’26
                </span>
              </h1>
            </div>

            {/* THEME TAGLINE */}
            <div className="border-l-4 border-cyan-400 pl-4 py-1 space-y-1">
              <p className="text-xl sm:text-2xl font-orbitron font-bold text-slate-100 tracking-wide">
                AI & EMERGING INTELLIGENT TECH.
              </p>
              <p className="text-sm sm:text-base font-mono text-cyan-400 tracking-widest uppercase">
                FOR A SMARTER FUTURE
              </p>
            </div>

            {/* EVENT QUICK BADGES */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="glass-panel p-3 rounded-xl border border-cyan-500/20 flex flex-col items-start space-y-1">
                <div className="flex items-center space-x-1.5 text-cyan-400 text-xs font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>DATE</span>
                </div>
                <span className="text-sm font-orbitron font-bold text-white">15.09.2026</span>
                <span className="text-[10px] text-slate-400 font-mono">( TUESDAY )</span>
              </div>

              <div className="glass-panel p-3 rounded-xl border border-yellow-500/30 bg-yellow-500/5 flex flex-col items-start space-y-1">
                <div className="flex items-center space-x-1.5 text-yellow-400 text-xs font-mono">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>CASH PRIZE</span>
                </div>
                <span className="text-sm font-orbitron font-extrabold text-yellow-400 glow-text-gold">₹10,000</span>
                <span className="text-[10px] text-yellow-300/80 font-mono">WORTH OF GLORY</span>
              </div>

              <div className="glass-panel p-3 rounded-xl border border-purple-500/20 flex flex-col items-start space-y-1">
                <div className="flex items-center space-x-1.5 text-purple-400 text-xs font-mono">
                  <Users className="w-3.5 h-3.5" />
                  <span>TEAM SIZE</span>
                </div>
                <span className="text-sm font-orbitron font-bold text-white">2 OR 4</span>
                <span className="text-[10px] text-slate-400 font-mono">MEMBERS</span>
              </div>

              <div className="glass-panel p-3 rounded-xl border border-pink-500/20 flex flex-col items-start space-y-1">
                <div className="flex items-center space-x-1.5 text-pink-400 text-xs font-mono">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>VENUE</span>
                </div>
                <span className="text-xs font-orbitron font-bold text-white truncate w-full">SIR CV RAMAN</span>
                <span className="text-[10px] text-slate-400 font-mono">SEMINAR HALL</span>
              </div>
            </div>

            {/* CTA BUTTONS */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <a
                href="#register"
                className="relative group px-8 py-4 text-sm font-orbitron font-extrabold tracking-widest text-black bg-gradient-to-r from-cyan-400 via-sky-400 to-pink-500 rounded-xl shadow-xl shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-3 overflow-hidden"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>REGISTER NOW</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-white/25 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </a>

              <a
                href="#about"
                className="px-6 py-4 text-sm font-orbitron font-bold tracking-wider text-cyan-300 glass-panel hover:bg-cyan-500/10 rounded-xl border border-cyan-500/30 hover:border-cyan-400/60 transition-all flex items-center justify-center space-x-2"
              >
                <span>EXPLORE IDEATHON</span>
              </a>
            </div>

            {/* Fee note */}
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Registration Fee: <strong className="text-cyan-300">₹200 / HEAD</strong></span>
            </div>
          </motion.div>

          {/* RIGHT VISUAL COLUMN: AI CHIP HOLOGRAPHIC CHIP */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center items-center relative"
          >
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
              {/* Outer Rotating Glowing Ring */}
              <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-spin-slow" />
              <div className="absolute inset-4 rounded-full border border-purple-500/20 border-dashed animate-[spin_30s_linear_infinite_reverse]" />
              <div className="absolute inset-8 rounded-full border border-pink-500/30 animate-pulse" />

              {/* Glowing Neural Center Box */}
              <div className="w-48 h-48 sm:w-64 sm:h-64 glass-panel-glow rounded-3xl p-6 flex flex-col items-center justify-center text-center relative border border-cyan-400/40 shadow-[0_0_50px_rgba(0,240,255,0.25)] animate-float">
                
                {/* AI Processor Icon */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-600/30 p-[1px] border border-cyan-400/50 mb-3 shadow-lg shadow-cyan-500/20 flex items-center justify-center relative group">
                  <Cpu className="w-12 h-12 text-cyan-400 animate-pulse" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
                </div>

                <div className="font-orbitron font-black text-xl text-white tracking-wider">
                  AI INTELLIGENCE
                </div>
                <div className="text-[10px] font-mono text-cyan-400 tracking-widest mt-1">
                  NEXUS CORE :: ACTIVE
                </div>

                {/* Floating Metric Badges */}
                <div className="absolute -top-4 -left-6 glass-panel px-3 py-1 rounded-full text-[10px] font-mono text-cyan-300 border border-cyan-500/30 shadow-md">
                  MODEL: HYPER-AI v2.6
                </div>
                <div className="absolute -bottom-4 -right-6 glass-panel px-3 py-1 rounded-full text-[10px] font-mono text-pink-400 border border-pink-500/30 shadow-md">
                  PRIZE: ₹10,000 INR
                </div>
              </div>

              {/* Holographic Circuit Stream Lines */}
              <div className="absolute -top-8 right-8 text-xs font-mono text-cyan-400/40 flex items-center space-x-1">
                <Terminal className="w-3.5 h-3.5" />
                <span>SYS_INTEL_READY</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
