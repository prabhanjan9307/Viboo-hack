
import { Demand } from './types';

export const INITIAL_DEMANDS: Demand[] = [
  {
    id: 'shop-1',
    title: 'KFC Campus Express',
    description: 'Quick service restaurant providing student-favorite meals and late-night snacks.',
    upvotes: 1200,
    downvotes: 20,
    category: 'Food',
    status: 'COMPLETED'
  },
  {
    id: 'shop-2',
    title: 'Varsity Sports Hub',
    description: 'Official campus dealer for sports gear, gym apparel, and high-performance equipment.',
    upvotes: 400,
    downvotes: 15,
    category: 'Sports',
    status: 'COMPLETED'
  },
  {
    id: 'shop-3',
    title: 'Brew & Bean Cafe',
    description: 'Specialty coffee, artisan pastries, and a quiet corner for casual meetings.',
    upvotes: 950,
    downvotes: 10,
    category: 'Food',
    status: 'COMPLETED'
  },
  {
    id: 'shop-4',
    title: 'Digital Tech Mart',
    description: 'Electronics shop offering student discounts on laptops, accessories, and certified repair services.',
    upvotes: 600,
    downvotes: 30,
    category: 'Shops',
    status: 'COMPLETED'
  },
  {
    id: 'shop-5',
    title: 'Guardian Pharmacy',
    description: 'On-campus health supplies, prescriptions, and essential wellness products.',
    upvotes: 300,
    downvotes: 5,
    category: 'Health',
    status: 'COMPLETED'
  },
  {
    id: '3',
    title: 'Shuttle Express Frequency',
    description: 'Demand for 10-minute interval shuttles between North and South campus gates.',
    upvotes: 310,
    downvotes: 89,
    category: 'Transport',
    status: 'PENDING'
  },
  {
    id: '5',
    title: 'Campus-Wide Mesh Wi-Fi',
    description: 'High-speed internet coverage across all outdoor quads and social areas.',
    upvotes: 560,
    downvotes: 5,
    category: 'Technology',
    status: 'IN_REVIEW'
  }
];
