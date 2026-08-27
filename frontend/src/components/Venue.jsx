import React from 'react';
import { MapPin, Calendar, Clock, Building2, Navigation } from 'lucide-react';

const Venue = () => {
  return (
    <section className="relative py-20 bg-[#030712] border-t border-cyan-500/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">OFFICIAL VENUE</span>
          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-white">
            SIR CV RAMAN <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500">SEMINAR HALL</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Details Card */}
          <div className="lg:col-span-6 glass-panel-glow p-8 rounded-3xl border border-cyan-500/30 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-xl text-white">
                  AAA COLLEGE OF ENGINEERING AND TECHNOLOGY
                </h3>
                <p className="text-xs font-mono text-cyan-400">AN AUTONOMOUS INSTITUTION</p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-800 text-sm font-inter text-slate-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-orbitron text-xs">VENUE LOCATION</strong>
                  <span>SIR CV RAMAN SEMINAR HALL, AAA Campus</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Calendar className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-orbitron text-xs">EVENT DATE</strong>
                  <span>15.09.2026 (Tuesday)</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-orbitron text-xs">EVENT TIME</strong>
                  <span>09:00 AM IST onwards</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://maps.google.com/?q=AAA+College+of+Engineering+and+Technology"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 text-xs font-orbitron font-bold hover:bg-cyan-500/20 transition"
              >
                <Navigation className="w-4 h-4" />
                <span>OPEN IN GOOGLE MAPS</span>
              </a>
            </div>
          </div>

          {/* Right Map Placeholder Module */}
          <div className="lg:col-span-6 glass-panel rounded-3xl overflow-hidden border border-cyan-500/20 h-80 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-circuit-lines opacity-20" />
            
            <div className="relative z-10 text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400/50 mx-auto flex items-center justify-center animate-bounce">
                <MapPin className="w-8 h-8 text-pink-400" />
              </div>
              <h4 className="font-orbitron font-bold text-lg text-white">
                AAA COLLEGE CAMPUS
              </h4>
              <p className="text-xs font-mono text-cyan-400">
                SIR CV RAMAN SEMINAR HALL :: DEPT OF IT
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Venue;
