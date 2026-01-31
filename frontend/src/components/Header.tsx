
import React from 'react';
import { UserRole } from '../types';
import { ShieldCheck, GraduationCap, Building2, LogOut } from 'lucide-react';

interface HeaderProps {
  role: UserRole;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ role, onLogout }) => {
  const getRoleBadge = () => {
    switch (role) {
      case UserRole.AUTHORITY:
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-full text-sm font-semibold">
            <ShieldCheck size={16} /> Campus Authority
          </div>
        );
      case UserRole.PARTNER:
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full text-sm font-semibold">
            <Building2 size={16} /> Campus Partner
          </div>
        );
      case UserRole.STUDENT:
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-full text-sm font-semibold">
            <GraduationCap size={16} /> Student Representative
          </div>
        );
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">CampusPulse</h1>
            <p className="text-[10px] uppercase font-bold text-indigo-500 tracking-widest">Strategy & Collaboration</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {getRoleBadge()}
          <div className="h-6 w-px bg-slate-200 mx-2" />
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-500 hover:text-rose-600 transition-colors"
            title="Switch User Role"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
