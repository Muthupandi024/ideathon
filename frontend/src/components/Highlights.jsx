import React from 'react';
import { Trophy, CreditCard, Users, Calendar, MapPin } from 'lucide-react';

const Highlights = () => {
  const highlights = [
    {
      value: '₹10,000',
      label: 'CASH PRIZE',
      subtext: 'WORTH OF GLORY!',
      icon: Trophy,
      color: 'from-amber-400 to-yellow-500',
      borderColor: 'border-yellow-500/40',
      shadowColor: 'shadow-yellow-500/20',
      textColor: 'text-yellow-400'
    },
    {
      value: '₹200',
      label: 'REGISTRATION / HEAD',
      subtext: 'PER PARTICIPANT',
      icon: CreditCard,
      color: 'from-cyan-400 to-blue-500',
      borderColor: 'border-cyan-500/40',
      shadowColor: 'shadow-cyan-500/20',
      textColor: 'text-cyan-400'
    },
    {
      value: '2 OR 4',
      label: 'TEAM SIZE',
      subtext: 'MEMBERS PER TEAM',
      icon: Users,
      color: 'from-purple-400 to-pink-500',
      borderColor: 'border-purple-500/40',
      shadowColor: 'shadow-purple-500/20',
      textColor: 'text-purple-400'
    },
    {
      value: '15.09.2026',
      label: 'EVENT DATE',
      subtext: 'TUESDAY',
      icon: Calendar,
      color: 'from-emerald-400 to-teal-500',
      borderColor: 'border-emerald-500/40',
      shadowColor: 'shadow-emerald-500/20',
      textColor: 'text-emerald-400'
    },
    {
      value: 'SIR CV RAMAN',
      label: 'VENUE HALL',
      subtext: 'SEMINAR HALL',
      icon: MapPin,
      color: 'from-pink-400 to-rose-500',
      borderColor: 'border-pink-500/40',
      shadowColor: 'shadow-pink-500/20',
      textColor: 'text-pink-400'
    }
  ];

  return (
    <section id="highlights" className="relative py-20 bg-[#030712] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">KEY STATISTICS</span>
          <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-white">
            EVENT HIGHLIGHTS
          </h2>
        </div>

        {/* Highlights Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={`glass-panel p-6 rounded-2xl border ${item.borderColor} shadow-lg ${item.shadowColor} hover:scale-105 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group`}
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} p-[1px] mb-4 shadow-lg`}>
                  <div className="w-full h-full bg-[#0B0F19] rounded-[15px] flex items-center justify-center">
                    <Icon className={`w-6 h-6 ${item.textColor}`} />
                  </div>
                </div>

                <div className={`text-2xl sm:text-3xl font-orbitron font-extrabold ${item.textColor} mb-1`}>
                  {item.value}
                </div>

                <span className="text-xs font-mono font-bold tracking-wider text-slate-200">
                  {item.label}
                </span>

                <span className="text-[10px] font-mono text-slate-400 mt-1">
                  {item.subtext}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Highlights;
