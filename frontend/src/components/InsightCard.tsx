
import React from 'react';
import { AIInsight } from '../types';
import { Sparkles, TrendingUp, Target } from 'lucide-react';

interface InsightCardProps {
  insight: AIInsight | null;
  isLoading: boolean;
  onGenerate: () => void;
}

const InsightCard: React.FC<InsightCardProps> = ({ insight, isLoading, onGenerate }) => {
  if (isLoading) {
    return (
      <div className="bg-indigo-900 rounded-2xl p-8 text-white relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Sparkles size={200} />
        </div>
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mb-4"></div>
        <h3 className="text-xl font-bold mb-2">Analyzing Campus Pulse...</h3>
        <p className="text-indigo-200 text-center max-w-sm">Gemini is processing student demands and synthesizing strategic recommendations.</p>
      </div>
    );
  }

  if (!insight) {
    return (
      <div className="bg-gradient-to-br from-indigo-600 to-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Sparkles size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4 text-indigo-300">
            <Sparkles size={20} />
            <span className="text-sm font-bold uppercase tracking-widest">Authority AI Insights</span>
          </div>
          <h2 className="text-2xl font-bold mb-4">Generate Strategic Intelligence</h2>
          <p className="text-indigo-50 mb-8 max-w-lg leading-relaxed">
            Use our proprietary AI engine to analyze all current student demands. Gemini will identify trends, sentiment bottlenecks, and provide a prioritized strategic roadmap.
          </p>
          <button 
            onClick={onGenerate}
            className="px-6 py-3 bg-white text-indigo-900 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-lg shadow-indigo-500/20"
          >
            Generate AI Strategic Report
          </button>
        </div>
      </div>
    );
  }

  const priorityColors = {
    LOW: 'bg-green-100 text-green-700',
    MEDIUM: 'bg-blue-100 text-blue-700',
    HIGH: 'bg-amber-100 text-amber-700',
    CRITICAL: 'bg-rose-100 text-rose-700'
  };

  return (
    <div className="bg-white border border-indigo-200 rounded-2xl shadow-xl shadow-indigo-500/5 overflow-hidden">
      <div className="bg-indigo-600 px-6 py-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <Sparkles size={18} />
          <h3 className="font-bold">Strategic Insight Report</h3>
        </div>
        <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border border-white/20 ${priorityColors[insight.priorityLevel]}`}>
          {insight.priorityLevel} PRIORITY
        </span>
      </div>
      
      <div className="p-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3 text-indigo-600">
            <TrendingUp size={18} />
            <h4 className="text-sm font-bold uppercase tracking-wider">Sentiment Analysis</h4>
          </div>
          <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
            {insight.sentimentSummary}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3 text-indigo-600">
              <Sparkles size={18} />
              <h4 className="text-sm font-bold uppercase tracking-wider">Key Trends</h4>
            </div>
            <ul className="space-y-2">
              {insight.keyTrends.map((trend, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0" />
                  {trend}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-3 text-rose-600">
              <Target size={18} />
              <h4 className="text-sm font-bold uppercase tracking-wider">Strategic Recommendation</h4>
            </div>
            <p className="text-sm text-slate-700 font-medium leading-relaxed italic border-l-4 border-rose-500 pl-4 py-1">
              {insight.strategicRecommendation}
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
          <p className="text-[11px] text-slate-400">Analysis performed by Gemini-3 Flash Preview engine.</p>
          <button 
            onClick={onGenerate}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            Re-run Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsightCard;
