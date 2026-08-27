import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, Sparkles, User, MessageSquare } from 'lucide-react';
import api from '../utils/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      await api.post('/api/contact', formData);
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.response?.data?.detail || 'Message could not be sent. Please try again.');
      return;
    }

    setLoading(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });

    setTimeout(() => {
      setSubmitted(false);
    }, 6000);
  };

  return (
    <section id="contact" className="relative py-24 bg-[#030712] border-t border-cyan-500/20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>COMMUNICATION CHANNEL</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-orbitron font-black text-white tracking-tight">
            GET IN <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">TOUCH</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base font-inter max-w-xl mx-auto">
            Have questions about IDEATHON ’26 rules, submissions, or venue details? Contact our organizing committee.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Official Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 space-y-6">
              <h3 className="font-orbitron font-bold text-lg text-white border-b border-slate-800 pb-3">
                DEPARTMENT OF IT
              </h3>

              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-start space-x-3 text-slate-300">
                  <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-orbitron">VENUE & INSTITUTION</strong>
                    <span>SIR CV RAMAN SEMINAR HALL</span>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      AAA College of Engineering & Technology, Amathur, Sivakasi - 626005.
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-slate-300">
                  <Mail className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <div>
                    <strong className="text-white block font-orbitron">DIRECT INQUIRY EMAIL</strong>
                    <a href="mailto:23urit024@aaacet.ac.in" className="text-cyan-400 hover:underline">
                      23urit024@aaacet.ac.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-slate-300">
                  <Phone className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-orbitron">STUDENT COORDINATOR HELPLINE</strong>
                    <p className="text-cyan-300">C. MUTHUPANDI: <a href="tel:8015899931" className="hover:underline">80158 99931</a></p>
                    <p className="text-cyan-300">P. PONRAMPRABHA: <a href="tel:6374678576" className="hover:underline">63746 78576</a></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Badge */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-cyan-500/20 text-xs font-mono text-slate-300 space-y-1">
              <span className="text-cyan-400 font-orbitron font-bold block">FAST RESPONSE PROMISE</span>
              <p>All inquiries submitted here are routed directly to 23urit024@aaacet.ac.in.</p>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-cyan-400/40 space-y-5">
              
              <h3 className="font-orbitron font-bold text-lg text-white flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                <span>SEND A MESSAGE</span>
              </h3>

              {submitted && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center space-x-3 animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>Inquiry sent! A notification email has been dispatched to 23urit024@aaacet.ac.in.</span>
                </div>
              )}

              {errorMessage && (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/40 text-rose-300 text-xs font-mono">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">YOUR NAME *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-[#070C18] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-cyan-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-[#070C18] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-cyan-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">MOBILE NUMBER *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-[#070C18] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-cyan-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">YOUR MESSAGE *</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Type your inquiry message..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-[#070C18] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-cyan-400 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 text-xs font-orbitron font-bold tracking-widest text-black bg-gradient-to-r from-cyan-400 via-sky-400 to-pink-500 rounded-xl shadow-lg shadow-cyan-500/20 hover:scale-[1.01] transition flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>SUBMIT INQUIRY TO 23URIT024@AAACET.AC.IN</span>
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
