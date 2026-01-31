
import React, { useState, useCallback, useMemo } from 'react';
import Header from './components/Header';
import DemandCard from './components/DemandCard';
import InsightCard from './components/InsightCard';
import ReviewModal from './components/ReviewModal';
import LoginPage from './components/LoginPage';
import { UserRole, Demand, AIInsight, Review } from './types';
import { INITIAL_DEMANDS } from './constants';
import { generateStrategicReport } from './geminiService';
import { ListFilter, PlusCircle, Search, Handshake, Sparkles, ShieldCheck, ShoppingBag, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<UserRole | null>(null);
  const [demands, setDemands] = useState<Demand[]>(INITIAL_DEMANDS);
  const [insight, setInsight] = useState<AIInsight | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Review State
  const [reviewingDemand, setReviewingDemand] = useState<Demand | null>(null);

  const activePipeline = useMemo(() => {
    return demands.filter(d => 
      d.status !== 'COMPLETED' &&
      (d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       d.category.toLowerCase().includes(searchQuery.toLowerCase()))
    ).sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
  }, [demands, searchQuery]);

  const completedShops = useMemo(() => {
    return demands.filter(d => 
      d.status === 'COMPLETED' &&
      (d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       d.category.toLowerCase().includes(searchQuery.toLowerCase()))
    ).sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
  }, [demands, searchQuery]);

  const handleLogin = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole(null);
    setInsight(null);
  };

  const handleUpvote = useCallback((id: string) => {
    setDemands(prev => prev.map(d => 
      d.id === id ? { ...d, upvotes: d.upvotes + 1 } : d
    ));
  }, []);

  const handleDownvote = useCallback((id: string) => {
    setDemands(prev => prev.map(d => 
      d.id === id ? { ...d, downvotes: d.downvotes + 1 } : d
    ));
  }, []);

  const handleAction = useCallback((id: string) => {
    setDemands(prev => prev.map(d => {
      if (d.id === id) {
        if (role === UserRole.STUDENT && d.status === 'PENDING') {
          return { ...d, status: 'IN_REVIEW' as const };
        }
        if (role === UserRole.PARTNER && d.status === 'IN_REVIEW') {
          return { ...d, status: 'PARTNER_ASSIGNED' as const };
        }
      }
      return d;
    }));
  }, [role]);

  const handleAddReview = (demandId: string, rating: number, comment: string) => {
    const newReview: Review = {
      id: Math.random().toString(36).substr(2, 9),
      studentName: "Student Representative",
      rating,
      comment,
      date: new Date().toISOString()
    };

    setDemands(prev => prev.map(d => 
      d.id === demandId 
        ? { ...d, reviews: [...(d.reviews || []), newReview] }
        : d
    ));
    setReviewingDemand(null);
  };

  const runAIAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const result = await generateStrategicReport(demands);
      setInsight(result);
    } catch (error) {
      alert("Error generating report. Please check your API key environment configuration.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!isLoggedIn || !role) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header role={role} onLogout={handleLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
              {role === UserRole.AUTHORITY ? 'Authority Strategic Dashboard' : 
               role === UserRole.PARTNER ? 'Campus Partnership Network' : 
               'Student Experience Hub'}
            </h2>
            <p className="text-slate-500 font-medium">Real-time institutional alignment and community feedback.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text"
                placeholder="Search campus..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64"
              />
            </div>
            {role === UserRole.STUDENT && (
              <button className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-md active:scale-95">
                <PlusCircle size={18} /> Raise Demand
              </button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-12">
            {/* AI Strategic Section */}
            {role === UserRole.AUTHORITY && (
              <section className="animate-in fade-in slide-in-from-top-4 duration-500">
                <InsightCard insight={insight} isLoading={isAnalyzing} onGenerate={runAIAnalysis} />
              </section>
            )}

            {/* Strategic Pipeline Section */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  <Zap size={20} />
                </div>
                <h3 className="text-xl font-black text-slate-900">Strategic Pipeline</h3>
              </div>
              <div className="grid gap-4">
                {activePipeline.length > 0 ? (
                  activePipeline.map(demand => (
                    <DemandCard 
                      key={demand.id} 
                      demand={demand} 
                      role={role} 
                      onUpvote={handleUpvote}
                      onDownvote={handleDownvote}
                      onAction={handleAction}
                    />
                  ))
                ) : (
                  <div className="text-center py-12 bg-white border-2 border-dashed border-slate-100 rounded-2xl">
                    <p className="text-slate-400 font-medium">No active demands in the pipeline.</p>
                  </div>
                )}
              </div>
            </section>

            {/* Operational Shops Section */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                  <ShoppingBag size={20} />
                </div>
                <h3 className="text-xl font-black text-slate-900">Operational Campus Shops</h3>
              </div>
              <div className="grid gap-4">
                {completedShops.length > 0 ? (
                  completedShops.map(demand => (
                    <DemandCard 
                      key={demand.id} 
                      demand={demand} 
                      role={role} 
                      onUpvote={handleUpvote}
                      onDownvote={handleDownvote}
                      onAction={handleAction}
                      onReview={(d) => setReviewingDemand(d)}
                    />
                  ))
                ) : (
                  <div className="text-center py-12 bg-white border-2 border-dashed border-slate-100 rounded-2xl">
                    <p className="text-slate-400 font-medium">No operational shops listed yet.</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar Components */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <ShieldCheck size={100} />
              </div>
              <div className="relative z-10">
                <h4 className="font-black text-xl mb-3 tracking-tight">Institutional Policy</h4>
                <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                  Strategic decisions are synchronized with the 2025 Institutional Growth Plan. Budget allocation follows a weighted demand-priority matrix.
                </p>
                <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                  Governance Handbook
                </button>
              </div>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-[2rem] shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-3 rounded-2xl text-amber-700">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 mb-1">Quality Assurance</h5>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Student reviews for completed shops directly impact the **Partner Trust Score**, influencing future contract renewals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Review Modal Overlay */}
      {reviewingDemand && (
        <ReviewModal 
          demand={reviewingDemand} 
          onClose={() => setReviewingDemand(null)} 
          onSubmit={handleAddReview}
        />
      )}

      <footer className="bg-white border-t border-slate-200 py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white shadow-md"><ShieldCheck size={18} /></div>
            <span className="font-black text-xl text-slate-900 tracking-tight">CampusPulse</span>
          </div>
          <p className="text-sm font-medium text-slate-400">Next-Generation Institutional Intelligence & Community Collaboration</p>
          <p className="text-[10px] text-slate-300 uppercase tracking-widest mt-6">© 2025 Institutional Strategy & Collaboration Office</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
