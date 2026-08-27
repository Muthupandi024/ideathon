import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Cpu, ChevronRight, Zap, Search } from 'lucide-react';

const Navbar = ({ onOpenAdmin, onOpenStatusCheck }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Theme', href: '#theme' },
    { name: 'Event', href: '#highlights' },
    { name: 'Registration', href: '#register' },
    { name: 'Coordinators', href: '#coordinators' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#030712]/80 backdrop-blur-xl border-b border-cyan-500/20 py-3 shadow-lg shadow-cyan-950/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-400/50 transition-all duration-300">
              <div className="w-full h-full bg-[#0B0F19] rounded-[11px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <span className="font-orbitron font-extrabold text-xl tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-500">
                IDEATHON ’26
              </span>
              <div className="flex items-center space-x-1.5 text-[10px] text-cyan-400/80 tracking-widest font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>AAA COLLEGE IT</span>
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 glass-panel px-4 py-1.5 rounded-full border border-cyan-500/20">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-full transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={onOpenStatusCheck}
              className="px-3.5 py-2 text-xs font-mono font-bold text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/10 rounded-lg transition-all duration-200 border border-cyan-500/30 flex items-center space-x-1.5"
              title="Check Registration Status"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span>STATUS CHECK</span>
            </button>

            <button
              onClick={onOpenAdmin}
              className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all duration-200 border border-slate-800 hover:border-cyan-500/30"
              title="Admin Portal Login"
            >
              <Shield className="w-4 h-4" />
            </button>

            <a
              href="#register"
              onClick={(e) => handleLinkClick(e, '#register')}
              className="relative group inline-flex items-center justify-center px-5 py-2 text-xs font-orbitron font-bold tracking-wider text-black bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 rounded-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center space-x-1.5">
                <span>REGISTER NOW</span>
                <Zap className="w-3.5 h-3.5 fill-black" />
              </span>
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={onOpenStatusCheck}
              className="p-2 text-cyan-400 hover:bg-cyan-500/10 rounded-lg border border-cyan-500/30"
              title="Status Check"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenAdmin}
              className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg border border-slate-800"
              title="Admin Portal"
            >
              <Shield className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 border border-cyan-500/20"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#070C18]/95 backdrop-blur-2xl border-b border-cyan-500/30 py-6 px-6 shadow-2xl transition-all duration-300">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-400 border border-transparent hover:border-cyan-500/20 transition-all flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-cyan-400/50" />
              </a>
            ))}
            <div className="pt-4 border-t border-slate-800 flex flex-col space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenStatusCheck();
                }}
                className="w-full py-3 text-center text-xs font-mono font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 rounded-lg"
              >
                CHECK REGISTRATION STATUS
              </button>

              <a
                href="#register"
                onClick={(e) => handleLinkClick(e, '#register')}
                className="w-full py-3 text-center text-xs font-orbitron font-bold tracking-widest text-black bg-gradient-to-r from-cyan-400 to-pink-500 rounded-lg shadow-lg shadow-cyan-500/30"
              >
                REGISTER NOW — ₹200 / HEAD
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
