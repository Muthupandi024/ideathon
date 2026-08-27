import React from 'react';
import { CheckCircle, Download, Calendar, MapPin, ShieldCheck, X, Sparkles } from 'lucide-react';
import { generateRegistrationPDF } from '../utils/pdfGenerator';

const SuccessModal = ({ registrationData, onClose }) => {
  if (!registrationData) return null;

  const handleDownloadPDF = () => {
    generateRegistrationPDF(registrationData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030712]/90 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl glass-panel-glow p-6 sm:p-8 rounded-3xl border border-cyan-400/50 shadow-[0_0_60px_rgba(0,240,255,0.3)] space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900/60 border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 p-[1px] mx-auto shadow-lg shadow-emerald-500/30 flex items-center justify-center">
            <div className="w-full h-full bg-[#0B0F19] rounded-[15px] flex items-center justify-center">
              <CheckCircle className="w-9 h-9 text-emerald-400 animate-bounce" />
            </div>
          </div>

          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>REGISTRATION SUBMITTED SUCCESSFULLY</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-orbitron font-extrabold text-white">
            WELCOME TO <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500">IDEATHON ’26</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 font-inter">
            Your team registration has been recorded into the official event system.
          </p>
        </div>

        {/* Details Card */}
        <div className="p-5 rounded-2xl bg-[#070C18] border border-cyan-500/30 space-y-4 font-mono text-xs">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
            <span className="text-slate-400">REGISTRATION ID:</span>
            <span className="text-base font-orbitron font-bold text-cyan-400 tracking-wider">
              {registrationData.registration_id}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-slate-300">
            <div>
              <span className="text-slate-500 block text-[10px]">TEAM NAME</span>
              <span className="font-bold text-white text-sm">{registrationData.team_name}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">TEAM SIZE</span>
              <span className="font-bold text-white text-sm">{registrationData.team_size} Members</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">COLLEGE</span>
              <span className="font-semibold text-slate-200">{registrationData.college_name}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">DEPARTMENT / YEAR</span>
              <span className="font-semibold text-slate-200">{registrationData.department} ({registrationData.year})</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800 text-slate-300">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>15.09.2026 (Tuesday)</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-pink-400" />
              <span>SIR CV RAMAN HALL</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <span className="text-slate-400">PAYMENT STATUS:</span>
            <span className="px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 font-bold text-[11px]">
              {registrationData.payment_status || 'PENDING VERIFICATION'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={handleDownloadPDF}
            className="w-full sm:flex-1 py-3.5 px-5 text-xs font-orbitron font-extrabold tracking-widest text-black bg-gradient-to-r from-cyan-400 via-sky-400 to-pink-500 rounded-xl shadow-lg shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD REGISTRATION DETAILS (PDF)</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3.5 px-6 text-xs font-orbitron font-bold text-slate-300 bg-slate-900 border border-slate-700 hover:border-slate-500 rounded-xl transition"
          >
            CLOSE
          </button>
        </div>

      </div>
    </div>
  );
};

export default SuccessModal;
