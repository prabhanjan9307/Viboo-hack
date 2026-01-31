
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { UserRole, User } from './types';
import StudentDashboard from './components/StudentDashboard';
import AuthorityDashboard from './components/AuthorityDashboard';
import PartnerDashboard from './components/PartnerDashboard';
import Login from './components/Login';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  // Persistence simulation
  useEffect(() => {
    const savedUser = localStorage.getItem('cc_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('cc_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('cc_user');
  };

  const getRoleLabel = (role: UserRole) => {
    switch(role) {
      case UserRole.AUTHORITY: return 'Campus Authority';
      case UserRole.PARTNER: return 'Campus Partner';
      default: return 'Student';
    }
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navigation Bar */}
        <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">CampusConnect</span>
          </Link>

          <div className="flex items-center gap-6">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{getRoleLabel(user.role)}</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm transition-all">
                Login
              </Link>
            )}
          </div>
        </nav>

        {/* Role Switcher Demo Tool */}
        {!user && (
          <div className="bg-indigo-50 border-b border-indigo-100 px-6 py-2 flex justify-center gap-4 text-xs font-medium text-indigo-700">
            <span>Demo Roles:</span>
            <button onClick={() => handleLogin({id: 'st1', name: 'Demo Student', role: UserRole.STUDENT, email: 'st@edu.com', collegeId: 'c1'})} className="hover:underline">Login as Student</button>
            <button onClick={() => handleLogin({id: 'ad1', name: 'Official Dean', role: UserRole.AUTHORITY, email: 'authority@edu.com', collegeId: 'c1'})} className="hover:underline">Login as Campus Authority</button>
            <button onClick={() => handleLogin({id: 'vn1', name: 'Brand Rep', role: UserRole.PARTNER, email: 'rep@brand.com', collegeId: 'c1', brandName: 'KFC'})} className="hover:underline">Login as Campus Partner</button>
          </div>
        )}

        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
            <Route 
              path="/" 
              element={
                !user ? <Navigate to="/login" /> : 
                user.role === UserRole.STUDENT ? <StudentDashboard user={user} /> :
                user.role === UserRole.AUTHORITY ? <AuthorityDashboard user={user} /> :
                <PartnerDashboard user={user} />
              } 
            />
          </Routes>
        </main>

        <footer className="bg-white border-t border-gray-200 py-8 px-6">
          <div className="container mx-auto text-center text-gray-500 text-sm">
            <p>&copy; 2024 CampusConnect. Supporting Verified Campus Growth.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
