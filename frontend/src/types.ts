
export enum UserRole {
  AUTHORITY = 'AUTHORITY',
  PARTNER = 'PARTNER',
  STUDENT = 'STUDENT'
}

export interface Review {
  id: string;
  studentName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Demand {
  id: string;
  title: string;
  description: string;
  upvotes: number;
  downvotes: number;
  category: string;
  status: 'PENDING' | 'IN_REVIEW' | 'PARTNER_ASSIGNED' | 'COMPLETED';
  reviews?: Review[];
}

export interface AIInsight {
  sentimentSummary: string;
  keyTrends: string[];
  strategicRecommendation: string;
  priorityLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}
