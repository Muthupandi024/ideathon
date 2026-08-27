import React, { useState } from 'react';
import { Users, User, Mail, Phone, Code, Github, Linkedin, QrCode, AlertCircle, Loader2, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import api from '../utils/api';

const Registration = ({ onSuccess }) => {
  const [teamSize, setTeamSize] = useState(2); // 2 or 4
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    team_name: '',
    college_name: '',
    department: '',
    year: 'IV Year',
    problem_statement: '',
    proposed_solution: '',
    technology_stack: '',
    github_url: '',
    linkedin_url: '',
    payment_reference: '',
    
    // Leader
    leader_name: '',
    leader_email: '',
    leader_mobile: '',

    // Member 2
    m2_name: '',
    m2_email: '',
    m2_mobile: '',

    // Member 3
    m3_name: '',
    m3_email: '',
    m3_mobile: '',

    // Member 4
    m4_name: '',
    m4_email: '',
    m4_mobile: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    // Build dynamic members list
    const members = [
      {
        role: 'LEADER',
        full_name: formData.leader_name,
        email: formData.leader_email,
        mobile: formData.leader_mobile,
      },
      {
        role: 'MEMBER_2',
        full_name: formData.m2_name,
        email: formData.m2_email,
        mobile: formData.m2_mobile,
      },
    ];

    if (teamSize === 4) {
      members.push({
        role: 'MEMBER_3',
        full_name: formData.m3_name,
        email: formData.m3_email,
        mobile: formData.m3_mobile,
      });
      members.push({
        role: 'MEMBER_4',
        full_name: formData.m4_name,
        email: formData.m4_email,
        mobile: formData.m4_mobile,
      });
    }

    const payload = {
      team_name: formData.team_name,
      team_size: teamSize,
      college_name: formData.college_name,
      department: formData.department,
      year: formData.year,
      problem_statement: formData.problem_statement,
      proposed_solution: formData.proposed_solution,
      technology_stack: formData.technology_stack,
      github_url: formData.github_url || null,
      linkedin_url: formData.linkedin_url || null,
      payment_reference: formData.payment_reference,
      members: members,
    };

    try {
      const response = await api.post('/api/registrations', payload);
      setLoading(false);
      if (onSuccess) onSuccess(response.data);
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.response?.data?.detail || 'Registration could not be submitted. Please try again.');
    }
  };

  return (
    <section id="register" className="relative py-24 bg-[#050A15] border-t border-cyan-500/20 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>IDEATHON ’26 REGISTRATION PORTAL</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-orbitron font-black text-white tracking-tight">
            ENTER THE <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">IDEATHON</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-inter max-w-xl mx-auto">
            Build your team. Bring your idea. Create the future.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="glass-panel-glow p-6 sm:p-10 rounded-3xl border border-cyan-500/30 space-y-10 shadow-2xl">
          
          {/* TEAM SIZE TOGGLE */}
          <div className="space-y-3">
            <label className="block text-xs font-orbitron font-bold tracking-wider text-cyan-300 uppercase">
              SELECT TEAM SIZE *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setTeamSize(2)}
                className={`py-4 px-6 rounded-2xl border font-orbitron font-bold text-sm tracking-wider flex items-center justify-center space-x-3 transition-all duration-300 ${
                  teamSize === 2
                    ? 'bg-gradient-to-r from-cyan-500/30 to-blue-600/30 border-cyan-400 text-white shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Users className="w-5 h-5 text-cyan-400" />
                <span>2 MEMBERS (₹400 TOTAL)</span>
              </button>

              <button
                type="button"
                onClick={() => setTeamSize(4)}
                className={`py-4 px-6 rounded-2xl border font-orbitron font-bold text-sm tracking-wider flex items-center justify-center space-x-3 transition-all duration-300 ${
                  teamSize === 4
                    ? 'bg-gradient-to-r from-purple-500/30 to-pink-600/30 border-pink-400 text-white shadow-lg shadow-pink-500/20'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Users className="w-5 h-5 text-pink-400" />
                <span>4 MEMBERS (₹800 TOTAL)</span>
              </button>
            </div>
          </div>

          {/* 1. ACADEMIC & TEAM INFO */}
          <div className="space-y-5">
            <h3 className="text-lg font-orbitron font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">1</span>
              <span>TEAM & ACADEMIC INFORMATION</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">TEAM NAME *</label>
                <input
                  type="text"
                  name="team_name"
                  required
                  placeholder="e.g. CyberNexus AI"
                  value={formData.team_name}
                  onChange={handleInputChange}
                  className="w-full bg-[#070C18] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">COLLEGE NAME *</label>
                <input
                  type="text"
                  name="college_name"
                  required
                  placeholder="e.g. AAA College of Engg & Tech"
                  value={formData.college_name}
                  onChange={handleInputChange}
                  className="w-full bg-[#070C18] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">DEPARTMENT *</label>
                <input
                  type="text"
                  name="department"
                  required
                  placeholder="e.g. Information Technology"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full bg-[#070C18] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">YEAR OF STUDY *</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full bg-[#070C18] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400 transition"
                >
                  <option value="I Year">I Year</option>
                  <option value="II Year">II Year</option>
                  <option value="III Year">III Year</option>
                  <option value="IV Year">IV Year</option>
                </select>
              </div>
            </div>
          </div>

          {/* 2. TEAM MEMBERS ROSTER */}
          <div className="space-y-6">
            <h3 className="text-lg font-orbitron font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <span className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs">2</span>
              <span>TEAM MEMBERS ROSTER ({teamSize} PARTICIPANTS)</span>
            </h3>

            {/* LEADER */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-cyan-500/30 space-y-4">
              <div className="flex items-center space-x-2 text-xs font-orbitron font-bold text-cyan-400">
                <User className="w-4 h-4" />
                <span>TEAM LEADER DETAILS *</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="leader_name"
                  required
                  placeholder="Full Name *"
                  value={formData.leader_name}
                  onChange={handleInputChange}
                  className="bg-[#070C18] border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 outline-none"
                />
                <input
                  type="email"
                  name="leader_email"
                  required
                  placeholder="Email Address *"
                  value={formData.leader_email}
                  onChange={handleInputChange}
                  className="bg-[#070C18] border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 outline-none"
                />
                <input
                  type="tel"
                  name="leader_mobile"
                  required
                  placeholder="Mobile Number (10 digits) *"
                  value={formData.leader_mobile}
                  onChange={handleInputChange}
                  className="bg-[#070C18] border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 outline-none"
                />
              </div>
            </div>

            {/* MEMBER 2 */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center space-x-2 text-xs font-orbitron font-bold text-slate-300">
                <User className="w-4 h-4 text-purple-400" />
                <span>MEMBER 2 DETAILS *</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="m2_name"
                  required
                  placeholder="Full Name *"
                  value={formData.m2_name}
                  onChange={handleInputChange}
                  className="bg-[#070C18] border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 outline-none"
                />
                <input
                  type="email"
                  name="m2_email"
                  required
                  placeholder="Email Address *"
                  value={formData.m2_email}
                  onChange={handleInputChange}
                  className="bg-[#070C18] border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 outline-none"
                />
                <input
                  type="tel"
                  name="m2_mobile"
                  required
                  placeholder="Mobile Number *"
                  value={formData.m2_mobile}
                  onChange={handleInputChange}
                  className="bg-[#070C18] border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 outline-none"
                />
              </div>
            </div>

            {/* MEMBER 3 & 4 (IF TEAM SIZE === 4) */}
            {teamSize === 4 && (
              <>
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                  <div className="flex items-center space-x-2 text-xs font-orbitron font-bold text-pink-400">
                    <User className="w-4 h-4" />
                    <span>MEMBER 3 DETAILS *</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="m3_name"
                      required
                      placeholder="Full Name *"
                      value={formData.m3_name}
                      onChange={handleInputChange}
                      className="bg-[#070C18] border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 outline-none"
                    />
                    <input
                      type="email"
                      name="m3_email"
                      required
                      placeholder="Email Address *"
                      value={formData.m3_email}
                      onChange={handleInputChange}
                      className="bg-[#070C18] border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 outline-none"
                    />
                    <input
                      type="tel"
                      name="m3_mobile"
                      required
                      placeholder="Mobile Number *"
                      value={formData.m3_mobile}
                      onChange={handleInputChange}
                      className="bg-[#070C18] border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 outline-none"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                  <div className="flex items-center space-x-2 text-xs font-orbitron font-bold text-pink-400">
                    <User className="w-4 h-4" />
                    <span>MEMBER 4 DETAILS *</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="m4_name"
                      required
                      placeholder="Full Name *"
                      value={formData.m4_name}
                      onChange={handleInputChange}
                      className="bg-[#070C18] border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 outline-none"
                    />
                    <input
                      type="email"
                      name="m4_email"
                      required
                      placeholder="Email Address *"
                      value={formData.m4_email}
                      onChange={handleInputChange}
                      className="bg-[#070C18] border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 outline-none"
                    />
                    <input
                      type="tel"
                      name="m4_mobile"
                      required
                      placeholder="Mobile Number *"
                      value={formData.m4_mobile}
                      onChange={handleInputChange}
                      className="bg-[#070C18] border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 outline-none"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* 3. IDEA INFORMATION */}
          <div className="space-y-5">
            <h3 className="text-lg font-orbitron font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <span className="w-7 h-7 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center text-xs">3</span>
              <span>PROJECT IDEA SUBMISSION</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">TECHNOLOGY / AI STACK *</label>
                <input
                  type="text"
                  name="technology_stack"
                  required
                  placeholder="e.g. Python, TensorFlow, React, OpenCV, FastAPI"
                  value={formData.technology_stack}
                  onChange={handleInputChange}
                  className="w-full bg-[#070C18] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">PROBLEM STATEMENT *</label>
                <textarea
                  name="problem_statement"
                  required
                  rows={3}
                  placeholder="Describe the real-world problem your team is addressing..."
                  value={formData.problem_statement}
                  onChange={handleInputChange}
                  className="w-full bg-[#070C18] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">PROPOSED AI SOLUTION *</label>
                <textarea
                  name="proposed_solution"
                  required
                  rows={3}
                  placeholder="Explain your innovative AI/Tech solution approach..."
                  value={formData.proposed_solution}
                  onChange={handleInputChange}
                  className="w-full bg-[#070C18] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-400 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">GITHUB REPO URL (OPTIONAL)</label>
                  <input
                    type="url"
                    name="github_url"
                    placeholder="https://github.com/username/repo"
                    value={formData.github_url}
                    onChange={handleInputChange}
                    className="w-full bg-[#070C18] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">LINKEDIN URL (OPTIONAL)</label>
                  <input
                    type="url"
                    name="linkedin_url"
                    placeholder="https://linkedin.com/in/username"
                    value={formData.linkedin_url}
                    onChange={handleInputChange}
                    className="w-full bg-[#070C18] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-400 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 4. PAYMENT SECTION (QR CODE + UTR) */}
          <div className="space-y-5 pt-4 border-t border-slate-800">
            <h3 className="text-lg font-orbitron font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <span className="w-7 h-7 rounded-lg bg-yellow-500/20 text-yellow-400 flex items-center justify-center text-xs">4</span>
              <span>REGISTRATION PAYMENT (₹200 / HEAD)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center glass-panel p-6 rounded-2xl border border-yellow-500/30 bg-yellow-500/5">
              
              {/* QR Code Container */}
              <div className="md:col-span-5 flex flex-col items-center justify-center space-y-3">
                <div className="p-3 bg-white rounded-2xl shadow-xl border-2 border-cyan-400">
                  <img
                    src="/official_qr_code.jpg"
                    alt="IDEATHON '26 Scan to Register QR Code"
                    className="w-44 h-44 object-contain rounded-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/official_poster.jpg';
                    }}
                  />
                </div>
                <span className="text-xs font-orbitron font-bold text-cyan-300 tracking-wider">
                  SCAN TO REGISTER / PAY
                </span>
              </div>

              {/* Payment Details & UTR input */}
              <div className="md:col-span-7 space-y-4">
                <div className="space-y-1">
                  <div className="text-sm font-mono text-slate-300">
                    Registration Fee: <strong className="text-yellow-400 text-base">₹200 / HEAD</strong>
                  </div>
                  <div className="text-xs font-mono text-cyan-400">
                    Total Amount Payable for {teamSize} Members: <strong className="text-white font-bold text-sm">₹{teamSize * 200} INR</strong>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pt-1">
                    Scan the official poster QR code to complete payment via UPI. Enter your 12-digit UPI UTR / Bank Reference Number below for admin validation.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-yellow-300 mb-1.5">
                    UPI TRANSACTION ID / UTR REFERENCE NUMBER *
                  </label>
                  <input
                    type="text"
                    name="payment_reference"
                    required
                    placeholder="e.g. 423819203948 or UPI/123456789"
                    value={formData.payment_reference}
                    onChange={handleInputChange}
                    className="w-full bg-[#070C18] border border-yellow-500/40 rounded-xl px-4 py-3 text-sm text-yellow-200 focus:border-yellow-400 outline-none font-mono"
                  />
                </div>

                <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Payment status will be verified by the admin team (Status: PENDING)</span>
                </div>
              </div>

            </div>
          </div>

          {/* ERROR ALERT */}
          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 text-sm font-orbitron font-extrabold tracking-widest text-black bg-gradient-to-r from-cyan-400 via-sky-400 to-pink-500 rounded-2xl shadow-xl shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>PROCESSING REGISTRATION...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>SUBMIT IDEATHON ’26 REGISTRATION</span>
              </>
            )}
          </button>

        </form>

      </div>
    </section>
  );
};

export default Registration;
