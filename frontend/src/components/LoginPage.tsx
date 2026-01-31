
import React, { useState } from 'react';
import { UserRole } from '../types';
import { ShieldCheck, Building2, GraduationCap, ArrowRight, Sparkles, ChevronLeft, Lock, Mail, User, Store } from 'lucide-react';

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    pass: '',
    shopName: '',
    email: '',
  });

  const roles = [
    {
      id: UserRole.AUTHORITY,
      title: 'Campus Authority',
      description: 'Strategic oversight, budget allocation, and AI-driven campus analysis.',
      icon: <ShieldCheck size={32} />,
      color: 'indigo',
      gradient: 'from-indigo-600 to-blue-700',
      bgLight: 'bg-indigo-50'
    },
    {
      id: UserRole.PARTNER,
      title: 'Campus Partner',
      description: 'External collaboration, service provision, and institutional growth.',
      icon: <Building2 size={32} />,
      color: 'emerald',
      gradient: 'from-emerald-600 to-teal-700',
      bgLight: 'bg-emerald-50'
    },
    {
      id: UserRole.STUDENT,
      title: 'Student Representative',
      description: 'Community advocacy, demand submission, and student voice management.',
      icon: <GraduationCap size={32} />,
      color: 'slate',
      gradient: 'from-slate-700 to-slate-900',
      bgLight: 'bg-slate-50'
    }
  ];

  const currentRoleConfig = roles.find(r => r.id === selectedRole);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
      onLogin(selectedRole);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background blobs for depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-100/50 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10 w-full max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm mb-6 animate-bounce">
            <Sparkles className="text-indigo-600" size={16} />
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Next-Gen Campus Strategy</span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-4">
            {selectedRole ? 'Secure Authentication' : 'Welcome to '}
            {!selectedRole && <span className="text-indigo-600">CampusPulse</span>}
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            {selectedRole 
              ? `Please enter your ${currentRoleConfig?.title} credentials to access the secure portal.`
              : 'A unified intelligence platform connecting authorities, partners, and students to build the future of campus life.'}
          </p>
        </div>

        {!selectedRole ? (
          <div className="grid md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className="group bg-white border border-slate-200 p-8 rounded-3xl text-left transition-all duration-300 hover:border-transparent hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden"
              >
                {/* Hover Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 ${role.bgLight} rounded-2xl flex items-center justify-center mb-6 text-slate-900 group-hover:bg-white/20 group-hover:text-white transition-colors`}>
                    {role.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-white transition-colors">
                    {role.title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-8 leading-relaxed group-hover:text-white/80 transition-colors">
                    {role.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold text-indigo-600 group-hover:text-white transition-colors">
                    Select Role <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            <div className={`p-8 bg-gradient-to-r ${currentRoleConfig?.gradient} text-white flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  {currentRoleConfig?.icon}
                </div>
                <div>
                  <h3 className="font-bold">{currentRoleConfig?.title}</h3>
                  <p className="text-[10px] uppercase tracking-widest opacity-80">Portal Access</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedRole(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              {/* Authority Fields */}
              {selectedRole === UserRole.AUTHORITY && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Unique Authority ID</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        required
                        type="text" 
                        name="id"
                        value={formData.id}
                        onChange={handleInputChange}
                        placeholder="AUTH-XXXX-2025" 
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Partner Fields */}
              {selectedRole === UserRole.PARTNER && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Shop/Organization Name</label>
                    <div className="relative">
                      <Store className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        required
                        type="text" 
                        name="shopName"
                        value={formData.shopName}
                        onChange={handleInputChange}
                        placeholder="Campus Coffee Co." 
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Partner Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        required
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="admin@partner.com" 
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Student Fields */}
              {selectedRole === UserRole.STUDENT && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Registration ID</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        required
                        type="text" 
                        name="id"
                        value={formData.id}
                        onChange={handleInputChange}
                        placeholder="STUD-2025-XXXX" 
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Common Password Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Access Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    required
                    type="password" 
                    name="pass"
                    value={formData.pass}
                    onChange={handleInputChange}
                    placeholder="••••••••" 
                    className={`w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                      selectedRole === UserRole.AUTHORITY ? 'focus:ring-indigo-500/20 focus:border-indigo-500' :
                      selectedRole === UserRole.PARTNER ? 'focus:ring-emerald-500/20 focus:border-emerald-500' :
                      'focus:ring-slate-500/20 focus:border-slate-500'
                    }`}
                  />
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className={`w-full py-4 rounded-xl text-white font-bold shadow-lg transition-all active:scale-[0.98] bg-gradient-to-r ${currentRoleConfig?.gradient} hover:shadow-xl hover:brightness-110`}
                >
                  Confirm Identity & Enter
                </button>
              </div>

              <p className="text-center text-[11px] text-slate-400 leading-relaxed px-4">
                By entering, you agree to comply with the CampusPulse data handling and privacy frameworks.
              </p>
            </form>
          </div>
        )}

        <div className="mt-16 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Secured by Institutional SSO & CampusPulse Core
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
