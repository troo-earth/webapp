export interface Project {
    id: string;
    projectid: string;
    imageUrl: string; 
    country: string; 
    state: string;
    type: string; 
    name: string; 
    year: number;
    price: number; 
    sdgGoals: number[];
    registry: string; 
  }

  export interface ListingApiResponse {
    listing_id: string;
    project_id: string;
    seller_id: string | null;
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
    status: string;
    sdg_numbers: number[];
    methodology: string;
    vintage_year: number;
  }
  
  export interface ListingsApiResponse {
    success: boolean;
    message: string;
    data: ListingApiResponse[];
  }
  
  export interface ProjectResponse {
    id: string;
    projectid: string;
    imageUrl: string;
    country: string;
    state: string;
    type: string;
    name: string;
    year: number;
    price: number;
    sdgGoals: number[];
    registry: string;
  }

  export interface ProjectDetailResponse {
  success: boolean;
  data: ProjectDetail;
}

export interface ProjectDetail {
  id: string;
  num: number;
  fullName: string;
  shortDescription: string;
  description: string;
  status: string;
  registry: string;
  city: string;
  state: string;
  countryCode: string;
  startDate: string;
  creditingPeriodStartDate: string;
  thumbnail: string | null;
  publicUrl: string;
  sector: { id: string; title: string };
  methodology: { id: string; title: string };
  type: { id: string; title: string; description: string };
  location: { lat: number; lng: number };
  additionalities: Array<{ title: string; description: string }>;
  otherBenefits: Array<{ title: string; description: string }>;
  estimatedAnnualMitigations: Array<{ vintage: string; estimatedMitigation: number }>;
  documentation: Array<{ 
    id: string; 
    uri: string; 
    name: string; 
    type: string; 
    isPublic: boolean 
  }>;
  proponents: Array<{ id: string; fullName: string; logo: string; publicUrl: string }>;
  validators: Array<{ id: string; fullName: string; logo: string; publicUrl: string }>;
}

export interface PaymentIntentResponse {
  success: boolean;
  data: {
    clientSecret: string;
  };
}