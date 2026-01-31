
import React from 'react';
import { Demand, UserRole } from '../types';
import { ArrowBigUp, ArrowBigDown, MessageSquare, Tag, Star } from 'lucide-react';

interface DemandCardProps {
  demand: Demand;
  role: UserRole;
  onUpvote?: (id: string) => void;
  onDownvote?: (id: string) => void;
  onAction?: (id: string) => void;
  onReview?: (demand: Demand) => void;
}

const DemandCard: React.FC<DemandCardProps> = ({ demand, role, onUpvote, onDownvote, onAction, onReview }) => {
  const isPartner = role === UserRole.PARTNER;
  const isStudent = role === UserRole.STUDENT;

  const score = demand.upvotes - demand.downvotes;
  
  const averageRating = demand.reviews && demand.reviews.length > 0
    ? (demand.reviews.reduce((acc, r) => acc + r.rating, 0) / demand.reviews.length).toFixed(1)
    : null;

  const getStatusStyles = (status: Demand['status']) => {
    switch (status) {
      case 'PENDING': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'IN_REVIEW': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'PARTNER_ASSIGNED': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      case 'COMPLETED': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-all group">
      <div className="p-5 flex gap-4">
        {/* Voting Section with Vibrant Blue/Red Arrows */}
        <div className="flex flex-col items-center gap-1 bg-slate-50/80 rounded-xl p-1 px-2 border border-slate-100">
          <button 
            disabled={!isStudent || demand.status === 'COMPLETED'}
            onClick={() => onUpvote?.(demand.id)}
            className={`transition-all p-1 rounded-lg ${
              isStudent && demand.status !== 'COMPLETED'
                ? 'hover:bg-blue-100 text-blue-400' 
                : 'text-slate-200 cursor-not-allowed'
            }`}
            title="Upvote"
          >
            <ArrowBigUp 
              size={28} 
              className={`${demand.upvotes > 0 ? "fill-blue-500 text-blue-600" : "text-slate-300"}`} 
            />
          </button>
          
          <span className={`text-xs font-black tabular-nums ${
            score > 0 ? 'text-blue-600' : score < 0 ? 'text-red-600' : 'text-slate-500'
          }`}>
            {score > 0 ? `+${score}` : score}
          </span>

          <button 
            disabled={!isStudent || demand.status === 'COMPLETED'}
            onClick={() => onDownvote?.(demand.id)}
            className={`transition-all p-1 rounded-lg ${
              isStudent && demand.status !== 'COMPLETED'
                ? 'hover:bg-red-100 text-red-400' 
                : 'text-slate-200 cursor-not-allowed'
            }`}
            title="Downvote"
          >
            <ArrowBigDown 
              size={28} 
              className={`${demand.downvotes > 0 ? "fill-red-500 text-red-600" : "text-slate-300"}`} 
            />
          </button>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Tag size={10} /> {demand.category}
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusStyles(demand.status)}`}>
              {demand.status.replace('_', ' ')}
            </span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <h3 className="text-lg font-bold text-slate-900 leading-tight mb-1">{demand.title}</h3>
            {averageRating && (
              <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 border border-amber-100 rounded-lg">
                <Star size={12} className="fill-amber-400 text-amber-400" />
                <span className="text-xs font-black text-amber-700">{averageRating}</span>
              </div>
            )}
          </div>
          <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">{demand.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-slate-400 text-[11px]">
              <span className="flex items-center gap-1">
                <MessageSquare size={13} /> 
                {demand.reviews ? `${demand.reviews.length} Reviews` : 'No reviews yet'}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline text-slate-400 font-medium">
                {demand.status === 'COMPLETED' ? 'Fulfillment Verified' : `${demand.upvotes} Supporters`}
              </span>
            </div>

            <div className="flex gap-2">
              {isStudent && demand.status === 'PENDING' && (
                <button 
                  onClick={() => onAction?.(demand.id)}
                  className="text-[11px] font-bold px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Verify Interest
                </button>
              )}

              {/* Review Service: Strictly for Students and only if Completed */}
              {isStudent && demand.status === 'COMPLETED' && (
                <button 
                  onClick={() => onReview?.(demand)}
                  className="flex items-center gap-2 text-[11px] font-bold px-4 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  <Star size={12} className="fill-white" /> Review Service
                </button>
              )}

              {isPartner && demand.status === 'IN_REVIEW' && (
                <button 
                  onClick={() => onAction?.(demand.id)}
                  className="text-[11px] font-bold px-4 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Propose Partnership
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemandCard;
