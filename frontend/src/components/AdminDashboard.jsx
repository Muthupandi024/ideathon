import React, { useState, useEffect } from 'react';
import { Shield, Lock, Search, Download, CheckCircle, XCircle, Clock, RefreshCw, LogOut, Eye, X, Filter, Trash2, Mail } from 'lucide-react';
import api from '../utils/api';

const AdminDashboard = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  // Database State
  const [stats, setStats] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [selectedReg, setSelectedReg] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [fetchingData, setFetchingData] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('ideathon_admin_token');
    if (token) {
      setIsAuthenticated(true);
      fetchDashboardData();
    }
  }, [isOpen]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');

    const cleanUser = username.trim();
    const cleanPass = password.trim();

    try {
      const response = await api.post('/api/admin/login', { username: cleanUser, password: cleanPass });
      if (response && response.data && response.data.access_token) {
        localStorage.setItem('ideathon_admin_token', response.data.access_token);
        setIsAuthenticated(true);
        setLoading(false);
        fetchDashboardData();
        return;
      }
    } catch (err) {
      setLoading(false);
      setLoginError(err.response?.data?.detail || 'Unable to reach the authentication server.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ideathon_admin_token');
    setIsAuthenticated(false);
    setRegistrations([]);
    setStats(null);
  };

  const fetchDashboardData = async () => {
    setFetchingData(true);

    try {
      const params = {};
      if (statusFilter !== 'ALL') params.status = statusFilter;
      if (search.trim()) params.search = search.trim();

      const regRes = await api.get('/api/admin/registrations', { params });
      setRegistrations(regRes.data || []);
      const statsRes = await api.get('/api/admin/stats');
      setStats(statsRes.data);
    } catch (err) {
      if (err.response?.status === 401) handleLogout();
      setLoginError(err.response?.data?.detail || 'Could not load records from the server.');
    } finally {
      setFetchingData(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [statusFilter, search]);

  const handleUpdateStatus = async (targetItem, newStatus) => {
    const targetRegId = typeof targetItem === 'object' ? targetItem.registration_id : targetItem;
    const targetNumericId = typeof targetItem === 'object' ? targetItem.id : targetItem;

    try {
      const response = await api.patch(`/api/admin/registrations/${targetNumericId}`, { payment_status: newStatus });
      setRegistrations((prev) => prev.map((registration) => registration.id === targetNumericId ? response.data : registration));
      setSelectedReg((prev) => prev?.id === targetNumericId ? response.data : prev);
      await fetchDashboardData();
    } catch (err) {
      setLoginError(err.response?.data?.detail || 'Could not update payment status.');
    }
  };

  const handleDeleteRegistration = async (targetItem) => {
    const targetRegId = typeof targetItem === 'object' ? targetItem.registration_id : targetItem;
    const targetNumericId = typeof targetItem === 'object' ? targetItem.id : targetItem;

    if (!window.confirm(`Are you sure you want to delete registration '${targetRegId}'?`)) {
      return;
    }

    try {
      await api.delete(`/api/admin/registrations/${targetNumericId}`);
      setSelectedReg(null);
      await fetchDashboardData();
    } catch (err) {
      setLoginError(err.response?.data?.detail || 'Could not delete registration.');
    }
  };

  const handleSendEmailNotification = async (reg) => {
    try {
      await api.post(`/api/admin/registrations/${reg.id}/notify`);
      setLoginError('Status notification sent to the team leader.');
    } catch (err) {
      setLoginError(err.response?.data?.detail || 'Could not send the status notification.');
    }
  };

  const handleExportCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Registration ID,Team Name,Team Size,College Name,Department,Year,Leader Name,Leader Email,Leader Phone,Problem Statement,Proposed Solution,Tech Stack,Payment Reference,Payment Status,Created Date\n';

    registrations.forEach((reg) => {
      const leader = reg.members?.find((m) => m.role === 'LEADER');
      const row = [
        `"${reg.registration_id}"`,
        `"${reg.team_name}"`,
        `"${reg.team_size}"`,
        `"${reg.college_name}"`,
        `"${reg.department}"`,
        `"${reg.year}"`,
        `"${leader?.full_name || 'N/A'}"`,
        `"${leader?.email || 'N/A'}"`,
        `"${leader?.mobile || 'N/A'}"`,
        `"${(reg.problem_statement || '').replace(/"/g, '""')}"`,
        `"${(reg.proposed_solution || '').replace(/"/g, '""')}"`,
        `"${reg.technology_stack}"`,
        `"${reg.payment_reference}"`,
        `"${reg.payment_status}"`,
        `"${reg.created_at || ''}"`,
      ].join(',');
      csvContent += row + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'ideathon26_registrations.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030712]/90 backdrop-blur-2xl overflow-y-auto">
      <div className="relative w-full max-w-6xl glass-panel-glow p-6 sm:p-8 rounded-3xl border border-cyan-400/50 shadow-2xl space-y-6 max-h-[92vh] flex flex-col">
        
        {/* Top Bar Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-orbitron font-extrabold text-lg sm:text-xl text-white tracking-wider">
                IDEATHON ’26 ADMIN DASHBOARD
              </h2>
              <p className="text-xs font-mono text-cyan-400">RESTRICTED FACULTY MANAGEMENT CONSOLE</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono hover:bg-rose-500/20 flex items-center space-x-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>LOGOUT</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* LOGIN FORM */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto my-12 w-full p-8 glass-panel rounded-3xl border border-cyan-500/30 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 mx-auto flex items-center justify-center text-cyan-400 border border-cyan-500/30">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-orbitron font-bold text-lg text-white">ADMIN AUTHENTICATION</h3>
              <p className="text-xs font-mono text-slate-400">Enter credentials to access registration records</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">USERNAME</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#070C18] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-cyan-400 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">PASSWORD</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#070C18] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-cyan-400 outline-none font-mono"
                />
              </div>

              {loginError && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-xs font-orbitron font-bold tracking-widest text-black bg-gradient-to-r from-cyan-400 via-sky-400 to-pink-500 rounded-xl shadow-lg shadow-cyan-500/20"
              >
                {loading ? 'AUTHENTICATING...' : 'LOGIN TO ADMIN CONSOLE'}
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED DASHBOARD */
          <div className="space-y-6 overflow-y-auto pr-1 flex-1">
            
            {/* STATS ANALYTICS GRID */}
            {stats && (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="glass-panel p-4 rounded-xl border border-cyan-500/20 text-center">
                  <span className="text-[10px] font-mono text-slate-400 block">TOTAL REGISTRATIONS</span>
                  <span className="text-2xl font-orbitron font-bold text-cyan-400">{stats.total_registrations}</span>
                </div>
                <div className="glass-panel p-4 rounded-xl border border-purple-500/20 text-center">
                  <span className="text-[10px] font-mono text-slate-400 block">2-MEMBER TEAMS</span>
                  <span className="text-2xl font-orbitron font-bold text-purple-400">{stats.team_2_count}</span>
                </div>
                <div className="glass-panel p-4 rounded-xl border border-pink-500/20 text-center">
                  <span className="text-[10px] font-mono text-slate-400 block">4-MEMBER TEAMS</span>
                  <span className="text-2xl font-orbitron font-bold text-pink-400">{stats.team_4_count}</span>
                </div>
                <div className="glass-panel p-4 rounded-xl border border-yellow-500/20 text-center">
                  <span className="text-[10px] font-mono text-slate-400 block">PENDING PAYMENTS</span>
                  <span className="text-2xl font-orbitron font-bold text-yellow-400">{stats.pending_payments}</span>
                </div>
                <div className="glass-panel p-4 rounded-xl border border-emerald-500/20 text-center col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-mono text-slate-400 block">VERIFIED PAYMENTS</span>
                  <span className="text-2xl font-orbitron font-bold text-emerald-400">{stats.verified_payments}</span>
                </div>
              </div>
            )}

            {/* CONTROLS BAR */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-slate-800">
              
              {/* Filter Tabs */}
              <div className="flex items-center space-x-1.5 w-full md:w-auto overflow-x-auto">
                {['ALL', 'PENDING', 'VERIFIED', 'REJECTED'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                      statusFilter === st
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              {/* Search & Actions */}
              <div className="flex items-center space-x-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search Reg ID, Team, Leader..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-[#070C18] border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:border-cyan-400 outline-none font-mono"
                  />
                </div>

                <button
                  onClick={fetchDashboardData}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400"
                  title="Refresh Database Records"
                >
                  <RefreshCw className={`w-4 h-4 ${fetchingData ? 'animate-spin' : ''}`} />
                </button>

                <button
                  onClick={handleExportCSV}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-black text-xs font-orbitron font-bold flex items-center space-x-1.5 shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>EXPORT CSV</span>
                </button>
              </div>

            </div>

            {/* DATABASE TABLE */}
            <div className="glass-panel rounded-2xl border border-slate-800 overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="bg-slate-900/80 border-b border-slate-800 text-slate-400">
                    <th className="p-3">REG ID</th>
                    <th className="p-3">TEAM NAME</th>
                    <th className="p-3">SIZE</th>
                    <th className="p-3">COLLEGE</th>
                    <th className="p-3">LEADER</th>
                    <th className="p-3">UTR REF</th>
                    <th className="p-3">STATUS</th>
                    <th className="p-3 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {registrations.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-12 text-center text-slate-400 font-mono">
                        <div className="space-y-1">
                          <p className="font-bold text-sm text-white">No registrations found in database.</p>
                          <p className="text-xs text-slate-500">Submit a team registration on the form to see live records here!</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    registrations.map((reg) => {
                      const leader = reg.members?.find((m) => m.role === 'LEADER');
                      return (
                        <tr key={reg.id || reg.registration_id} className="hover:bg-slate-900/40 transition">
                          <td className="p-3 font-bold text-cyan-400">{reg.registration_id}</td>
                          <td className="p-3 font-semibold text-white">{reg.team_name}</td>
                          <td className="p-3">{reg.team_size} M</td>
                          <td className="p-3 truncate max-w-[150px]">{reg.college_name}</td>
                          <td className="p-3">
                            <span className="block font-bold text-white">{leader?.full_name || 'N/A'}</span>
                            <span className="text-[10px] text-slate-400">{leader?.mobile}</span>
                          </td>
                          <td className="p-3 text-yellow-300 font-mono">{reg.payment_reference}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                reg.payment_status === 'VERIFIED'
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                  : reg.payment_status === 'REJECTED'
                                  ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                                  : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                              }`}
                            >
                              {reg.payment_status}
                            </span>
                          </td>
                          <td className="p-3 text-right space-x-1">
                            <button
                              onClick={() => setSelectedReg(reg)}
                              className="p-1.5 text-cyan-400 hover:bg-cyan-500/10 rounded-lg"
                              title="View Full Submission Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(reg, 'VERIFIED')}
                              className="p-1.5 text-emerald-400 hover:bg-emerald-500/10 rounded-lg"
                              title="Mark Payment VERIFIED"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleSendEmailNotification(reg)}
                              className="p-1.5 text-purple-400 hover:bg-purple-500/10 rounded-lg"
                              title="Send Email Notification"
                            >
                              <Mail className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(reg, 'REJECTED')}
                              className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg"
                              title="Mark Payment REJECTED"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteRegistration(reg)}
                              className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg"
                              title="Delete Record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* SUBMISSION DETAIL MODAL */}
            {selectedReg && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                <div className="glass-panel-glow p-6 rounded-3xl max-w-2xl w-full border border-cyan-400/50 space-y-4 font-mono text-xs max-h-[85vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="font-orbitron font-bold text-base text-cyan-400 flex items-center space-x-2">
                      <span>SUBMISSION DETAILS :: {selectedReg.registration_id}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full ${
                          selectedReg.payment_status === 'VERIFIED'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : selectedReg.payment_status === 'REJECTED'
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                            : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40'
                        }`}
                      >
                        {selectedReg.payment_status}
                      </span>
                    </h3>
                    <button onClick={() => setSelectedReg(null)} className="text-slate-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-3 text-slate-300">
                    <p><strong className="text-white">Team Name:</strong> {selectedReg.team_name}</p>
                    <p><strong className="text-white">College:</strong> {selectedReg.college_name}</p>
                    <p><strong className="text-white">Department & Year:</strong> {selectedReg.department} ({selectedReg.year})</p>
                    <p><strong className="text-white">Tech Stack:</strong> {selectedReg.technology_stack}</p>
                    <p><strong className="text-white">Problem Statement:</strong> {selectedReg.problem_statement}</p>
                    <p><strong className="text-white">Proposed Solution:</strong> {selectedReg.proposed_solution}</p>
                    <p><strong className="text-white">Payment UTR Ref:</strong> <span className="text-yellow-300 font-bold">{selectedReg.payment_reference}</span></p>

                    <div className="pt-2 border-t border-slate-800">
                      <strong className="text-cyan-400 block mb-2">TEAM MEMBERS ROSTER ({selectedReg.team_size} Members):</strong>
                      {selectedReg.members?.map((m) => (
                        <div key={m.id || m.full_name} className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 mb-1.5 flex flex-col sm:flex-row justify-between gap-1">
                          <span>{m.role}: <strong className="text-white">{m.full_name}</strong></span>
                          <span className="text-slate-400">{m.email} | Ph: {m.mobile}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-end gap-2 pt-4 border-t border-slate-800">
                    <button
                      onClick={() => handleSendEmailNotification(selectedReg)}
                      className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold flex items-center space-x-1.5 hover:bg-purple-500/30 transition"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>EMAIL NOTIFICATION</span>
                    </button>

                    <button
                      onClick={() => handleUpdateStatus(selectedReg, 'VERIFIED')}
                      className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold hover:bg-emerald-500/30 transition flex items-center space-x-1.5"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>MARK VERIFIED</span>
                    </button>

                    <button
                      onClick={() => handleUpdateStatus(selectedReg, 'REJECTED')}
                      className="px-4 py-2 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold hover:bg-rose-500/30 transition flex items-center space-x-1.5"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>MARK REJECTED</span>
                    </button>

                    <button
                      onClick={() => handleDeleteRegistration(selectedReg)}
                      className="px-4 py-2 rounded-lg bg-slate-800 text-rose-400 border border-rose-500/30 text-xs font-bold hover:bg-rose-500/20 transition flex items-center space-x-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>DELETE RECORD</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
