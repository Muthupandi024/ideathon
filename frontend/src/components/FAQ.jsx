import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'What is the team size requirement for IDEATHON ’26?',
      a: 'Teams can consist of either 2 members or 4 members. You can select your preferred team size directly on the registration form.'
    },
    {
      q: 'What is the registration fee per participant?',
      a: 'The registration fee is ₹200 / head (₹400 total for a 2-member team, ₹800 total for a 4-member team).'
    },
    {
      q: 'What is the total cash prize amount?',
      a: 'The event features a Cash Prize of ₹10,000 worth of glory!'
    },
    {
      q: 'When and where will IDEATHON ’26 take place?',
      a: 'The event will be conducted on 15.09.2026 (Tuesday) at SIR CV RAMAN SEMINAR HALL, AAA College of Engineering and Technology.'
    },
    {
      q: 'What is the official theme of the event?',
      a: 'The official theme is "AI & EMERGING INTELLIGENT TECH. FOR A SMARTER FUTURE" organized by the Department of Information Technology.'
    },
    {
      q: 'How do I complete the registration payment?',
      a: 'Scan the official poster QR code displayed on the registration form to pay via UPI. Enter your 12-digit UPI transaction UTR reference number on the form and submit. Your registration status will be saved as PENDING until verified by the admin team.'
    },
    {
      q: 'Who can I contact for registration assistance?',
      a: 'You can reach out to Faculty Coordinators Mr. N. Muniselvam (96263 32111), Mrs. R. Soundharya (91593 22553), or Student Coordinator C. Muthupandi (80158 99931).'
    }
  ];

  return (
    <section id="faq" className="relative py-24 bg-[#050A15] border-t border-cyan-500/20 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-white">
            NEED <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">CLARIFICATION?</span>
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="glass-panel rounded-2xl border border-cyan-500/20 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-orbitron font-bold text-sm sm:text-base text-white hover:text-cyan-300 transition"
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-cyan-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 font-inter leading-relaxed border-t border-slate-800/80 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
