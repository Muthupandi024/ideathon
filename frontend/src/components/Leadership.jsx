import React from 'react';
import { Award, UserCheck, Star } from 'lucide-react';

const Leadership = () => {
  const leaders = [
    { name: 'Dr. P. Karvannan', title: 'CHAIRMAN & SECRETARY', role: 'Leadership' },
    { name: 'Dr. M. Sekar', title: 'PRINCIPAL', role: 'Academic Lead' },
    { name: 'Dr. P. Ganesan', title: 'CORRESPONDENT', role: 'Governance' },
    { name: 'Mrs. S. Seethalakshmi', title: 'AP & HOD (IT)', role: 'Department Head' },
    { name: 'Dr. K. Vignesh Kumar', title: 'JOINT SECRETARY', role: 'Administration' },
  ];

  return (
    <section className="relative py-20 bg-[#030712] border-t border-cyan-500/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Founder Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-300">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>WITH THE BLESSINGS OF</span>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-amber-500/40 bg-amber-500/5 shadow-2xl space-y-2 relative max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 p-[1px] mx-auto mb-3 shadow-lg shadow-amber-500/30 flex items-center justify-center">
              <div className="w-full h-full bg-[#0B0F19] rounded-full flex items-center justify-center text-amber-400 font-orbitron font-extrabold text-xl">
                PP
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-orbitron font-extrabold text-amber-300 glow-text-gold">
              Shri. P. Panjurajan
            </h3>

            <p className="text-xs sm:text-sm font-mono text-slate-300">
              FOUNDER, AAA GROUP OF INSTITUTIONS
            </p>
          </div>
        </div>

        {/* Institutional Dignitaries */}
        <div className="space-y-6">
          <div className="text-center">
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">IN THE PRESENCE OF</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {leaders.map((leader) => (
              <div
                key={leader.name}
                className="glass-panel p-5 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/40 hover:scale-[1.02] transition-all duration-300 text-center flex flex-col items-center justify-between"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-orbitron font-bold text-sm mb-3">
                  {leader.name.split(' ').map(n => n[0]).join('')}
                </div>

                <div className="space-y-1">
                  <h4 className="font-orbitron font-bold text-sm text-white">
                    {leader.name}
                  </h4>
                  <p className="text-[11px] font-mono font-semibold text-cyan-400">
                    {leader.title}
                  </p>
                </div>

                <span className="mt-3 text-[9px] font-mono px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
                  {leader.role}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Leadership;
