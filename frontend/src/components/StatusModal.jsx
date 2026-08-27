import React, { useState } from 'react';
import { Search, CheckCircle, Clock, AlertCircle, X, Download, ShieldCheck, Sparkles } from 'lucide-react';
import api from '../utils/api';
import { generateRegistrationPDF } from '../utils/pdfGenerator';

const StatusModal = ({ isOpen, onClose }) => {
  const [regId, setRegId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!regId.trim()) return;

    setLoading(true);
    setErrorMsg('');
    setResult(null);

    const queryId = regId.trim().toUpperCase();

    try {
      const response = await api.get(`/api/registrations/${queryId}`);
      setResult(response.data);
      setLoading(false);
      return;
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.response?.data?.detail || 'Could not check the registration server. Please try again.');
      return;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030712]/90 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-xl glass-panel-glow p-6 sm:p-8 rounded-3xl border border-cyan-400/50 shadow-2xl space-y-6">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 mx-auto flex items-center justify-center text-cyan-400 border border-cyan-500/30">
            <Search className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-orbitron font-extrabold text-white">
            CHECK REGISTRATION STATUS
          </h2>
          <p className="text-xs font-mono text-slate-400">
            Enter your Registration ID (e.g. IDE26-92455) to check your payment status
          </p>
        </div>

        {/* Search Input Form */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            required
            placeholder="e.g. IDE26-92455"
            value={regId}
            onChange={(e) => setRegId(e.target.value)}
            className="flex-1 bg-[#070C18] border border-cyan-500/30 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-400 outline-none font-mono tracking-wider uppercase"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-orbitron font-bold text-xs rounded-xl shadow-lg hover:scale-105 transition"
          >
            {loading ? 'SEARCHING...' : 'SEARCH'}
          </button>
        </form>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* RESULT CARD */}
        {result && (
          <div className="p-6 rounded-2xl bg-[#070C18] border border-cyan-500/30 space-y-4 font-mono text-xs animate-fade-in">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-slate-400">REGISTRATION ID:</span>
              <span className="text-base font-orbitron font-bold text-cyan-400 tracking-wider">
                {result.registration_id}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-slate-300">
              <div>
                <span className="text-slate-500 block text-[10px]">TEAM NAME</span>
                <span className="font-bold text-white">{result.team_name}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">TEAM SIZE</span>
                <span className="font-bold text-white">{result.team_size} Members</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">COLLEGE</span>
                <span className="font-semibold text-slate-200">{result.college_name}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">DEPARTMENT</span>
                <span className="font-semibold text-slate-200">{result.department} ({result.year})</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">PAYMENT STATUS:</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold font-orbitron ${
                  result.payment_status === 'VERIFIED'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : result.payment_status === 'REJECTED'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                    : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40'
                }`}
              >
                {result.payment_status === 'VERIFIED' ? '✓ VERIFIED' : result.payment_status}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2">
              <button
                onClick={() => generateRegistrationPDF(result)}
                className="w-full py-3 text-xs font-orbitron font-bold text-black bg-gradient-to-r from-cyan-400 to-pink-500 rounded-xl shadow-lg flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD REGISTRATION SLIP (PDF)</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default StatusModal;
