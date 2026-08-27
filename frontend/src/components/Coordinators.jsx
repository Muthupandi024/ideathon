import React from 'react';
import { Phone, Mail, UserCheck, Shield, GraduationCap } from 'lucide-react';

const Coordinators = () => {
  const faculty = [
    { name: 'Mr. N. Muniselvam', designation: 'AP / IT', phone: '96263 32111' },
    { name: 'Mrs. R. Soundharya', designation: 'AP / IT', phone: '91593 22553' }
  ];

  const students = [
    { name: 'C. Muthupandi', yearDept: 'IV / IT', phone: '80158 99931' },
    { name: 'P. Ponramprabha', yearDept: 'IV / IT', phone: '63746 78576' },
    { name: 'A. Kathir', yearDept: 'III / IT', phone: null },
    { name: 'M. Mithra Vigneshwari', yearDept: 'III / IT', phone: null }
  ];

  return (
    <section id="coordinators" className="relative py-24 bg-[#050A15] border-t border-cyan-500/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">ORGANIZING COMMITTEE</span>
          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-white">
            MEET THE <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">COORDINATORS</span>
          </h2>
        </div>

        {/* FACULTY COORDINATORS */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3 text-cyan-400 font-orbitron font-bold text-lg border-b border-cyan-500/20 pb-3">
            <Shield className="w-5 h-5" />
            <span>FACULTY COORDINATORS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {faculty.map((f) => (
              <div
                key={f.name}
                className="glass-panel p-6 rounded-2xl border border-cyan-500/30 hover:border-cyan-400/60 hover:shadow-neon-cyan transition-all duration-300 flex items-center space-x-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-orbitron font-bold text-xl flex-shrink-0">
                  {f.name.split(' ').pop()?.[0] || 'F'}
                </div>

                <div className="space-y-1.5 flex-1">
                  <h3 className="font-orbitron font-bold text-base text-white">
                    {f.name}
                  </h3>
                  <p className="text-xs font-mono text-cyan-400">
                    {f.designation}
                  </p>
                  <a
                    href={`tel:${f.phone}`}
                    className="inline-flex items-center space-x-2 text-xs font-mono text-slate-300 hover:text-emerald-400 transition"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>+91 {f.phone}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* STUDENT COORDINATORS */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3 text-purple-400 font-orbitron font-bold text-lg border-b border-purple-500/20 pb-3">
            <GraduationCap className="w-5 h-5" />
            <span>STUDENT COORDINATORS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {students.map((s) => (
              <div
                key={s.name}
                className="glass-panel p-5 rounded-2xl border border-purple-500/20 hover:border-purple-400/50 hover:shadow-neon-purple transition-all duration-300 space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300 font-orbitron font-bold text-base">
                  {s.name[0]}
                </div>

                <div>
                  <h4 className="font-orbitron font-bold text-sm text-white">
                    {s.name}
                  </h4>
                  <p className="text-xs font-mono text-purple-300 mt-0.5">
                    {s.yearDept}
                  </p>
                </div>

                {s.phone ? (
                  <a
                    href={`tel:${s.phone}`}
                    className="inline-flex items-center space-x-2 text-xs font-mono text-slate-300 hover:text-emerald-400 transition pt-2 border-t border-slate-800 w-full"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>+91 {s.phone}</span>
                  </a>
                ) : (
                  <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-800">
                    STUDENT CO-LEAD
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Coordinators;
