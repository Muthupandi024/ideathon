import React, { useState, useEffect } from 'react';
import { Clock, Radio } from 'lucide-react';

const Countdown = () => {
  const targetDate = new Date('2026-09-15T09:00:00+05:30').getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { isLive: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
      isLive: false
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-12 bg-[#050A15] border-y border-cyan-500/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
              <Clock className="w-5 h-5 text-cyan-400 animate-spin-slow" />
            </div>
            <div>
              <h3 className="font-orbitron font-bold text-lg text-white tracking-wider flex items-center space-x-2">
                <span>EVENT COUNTDOWN</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              </h3>
              <p className="text-xs font-mono text-slate-400">TARGET DATE: 15 SEPTEMBER 2026 | SIR CV RAMAN SEMINAR HALL</p>
            </div>
          </div>

          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-300">
            <Radio className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
            <span>AAA COLLEGE OF ENGINEERING & TECHNOLOGY</span>
          </div>
        </div>

        {/* Countdown Grid */}
        {timeLeft.isLive ? (
          <div className="text-center py-8 glass-panel rounded-2xl border border-emerald-500/50 shadow-2xl">
            <h2 className="text-3xl sm:text-5xl font-orbitron font-black text-emerald-400 glow-text-cyan">
              IDEATHON ’26 IS LIVE
            </h2>
            <p className="text-sm font-mono text-slate-300 mt-2">SIR CV RAMAN SEMINAR HALL :: EVENT UNDERWAY</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: 'DAYS', value: timeLeft.days },
              { label: 'HOURS', value: timeLeft.hours },
              { label: 'MINUTES', value: timeLeft.minutes },
              { label: 'SECONDS', value: timeLeft.seconds },
            ].map((unit, index) => (
              <div
                key={unit.label}
                className="glass-panel p-5 rounded-2xl border border-cyan-500/20 flex flex-col items-center justify-center relative group hover:border-cyan-400/50 transition-all duration-300"
              >
                {/* Glowing Number */}
                <div className="text-4xl sm:text-6xl font-orbitron font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-200 to-cyan-400 glow-text-cyan">
                  {String(unit.value || 0).padStart(2, '0')}
                </div>
                
                {/* Label */}
                <span className="text-xs font-mono font-bold tracking-widest text-slate-400 mt-2 group-hover:text-cyan-400 transition-colors">
                  {unit.label}
                </span>

                {/* Subtle corner tech dashes */}
                <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t-2 border-l-2 border-cyan-500/50" />
                <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t-2 border-r-2 border-cyan-500/50" />
                <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b-2 border-l-2 border-cyan-500/50" />
                <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b-2 border-r-2 border-cyan-500/50" />
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Countdown;
