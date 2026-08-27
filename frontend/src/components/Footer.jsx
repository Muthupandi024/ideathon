import React from 'react';
import { Cpu, ChevronUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#02050D] border-t border-cyan-500/20 pt-16 pb-12 overflow-hidden text-slate-400 font-inter text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 p-[1px]">
                <div className="w-full h-full bg-[#0B0F19] rounded-[11px] flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="font-orbitron font-extrabold text-2xl tracking-wider text-white">
                IDEATHON ’26
              </span>
            </div>

            <div className="space-y-1 font-mono text-slate-300">
              <p className="font-bold text-white text-sm">AAA COLLEGE OF ENGINEERING AND TECHNOLOGY</p>
              <p className="text-[11px] text-cyan-400">AN AUTONOMOUS INSTITUTION</p>
              <p className="text-purple-400 font-semibold">DEPARTMENT OF INFORMATION TECHNOLOGY</p>
            </div>

            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Theme: AI & EMERGING INTELLIGENT TECH. FOR A SMARTER FUTURE
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-orbitron font-bold text-sm text-white tracking-wider">
              QUICK NAVIGATION
            </h4>
            <ul className="space-y-2 font-mono">
              {['Home', 'About', 'Theme', 'Registration', 'Coordinators', 'FAQ', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-cyan-400 transition flex items-center space-x-1"
                  >
                    <span>›</span>
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Event Summary */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-orbitron font-bold text-sm text-white tracking-wider">
              EVENT AT A GLANCE
            </h4>
            <div className="space-y-2 font-mono text-[11px] text-slate-300">
              <p>📅 Date: 15.09.2026 (Tuesday)</p>
              <p>📍 Venue: Sir CV Raman Seminar Hall</p>
              <p>🏆 Cash Prize: ₹10,000</p>
              <p>👥 Team Size: 2 or 4 Members</p>
              <p>💳 Reg Fee: ₹200 / Head</p>
            </div>
          </div>

        </div>

        {/* Scroll Top & Tagline */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-orbitron font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 text-sm sm:text-base">
            TECHNOLOGY &nbsp;|&nbsp; INNOVATION &nbsp;|&nbsp; IMPACT
          </div>

          <button
            onClick={scrollToTop}
            className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 hover:text-cyan-400 transition"
            title="Scroll to Top"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
