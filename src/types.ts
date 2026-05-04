export type Niche = 'Food Reviewer' | 'Cafe Hunter' | 'Street Food' | 'Dessert' | 'Healthy Food';
export type Platform = 'TikTok' | 'Instagram';

export interface Influencer {
  id: string;
  name: string;
  photo: string;
  niche: Niche;
  location: string;
  followers: number;
  engagementRate: number;
  avgViews: number;
  priceRange: string;
  platform: Platform;
  bio: string;
  portfolio: string[];
}

export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  limitations: string[];
  bestFor: string;
  recommended?: boolean;
}
