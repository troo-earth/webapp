// API Response types
export interface ListingDTO {
  listing_id: string;
  project_id: string;
  seller_id: string;
  credits_available: string;
  price_per_credit: string;
  external_trade_id: string | null;
  project_name: string;
  project_start_year: number;
  registry: string;
  category: string;
  location_city: string;
  location_state: string;
  location_country: string;
  thumbnail_url: string;
  status: 'open' | 'closed' ;
  sdg_numbers: number[];
  methodology: string;
  vintage_year: number;
  createdAt: string;
  updatedAt: string;
}

// Transformed Listing for UI
export interface Listing {
  id: string;
  projectId: string;
  projectName: string;
  quantity: number;
  date: string;
  serialPrefix: string;
  image: string;
  pricePerUnit: number;
  totalValue: number;
  status: 'open' | 'closed' ;
  vintage: number;
  location: string;
  registry: string;
  category: string;
  methodology: string;
}

// Filter options
export interface ListingsFilter {
  status?: 'open' | 'closed';
  vintage?: number;
}