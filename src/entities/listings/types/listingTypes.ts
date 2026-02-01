export interface Listing {
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
  
  export interface ListingResponse {
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

export interface ListingDetailResponse {
  status: string;        
  message: string;       
  data: ListingData;     
  metadata: Record<string, unknown>; 
}

export interface ListingData {
  listing_id: string;
  price_per_credit: string;  
  credits_available: string;  
  seller: {
    type: string;
    name: string;
  };
  project: ListingDetail;     
}

export interface ListingPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  listingId: string;
  pricePerCredit: number;
  projectTitle: string;
  registry: string;
}

export interface ListingDetail {
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
  kmlFile: string | null;     // Added based on JSON
  
  // Date stamps added by JSON
  syncedAt?: string;
  createdAt?: string;
  updatedAt?: string;

  sector: { 
    id: string; 
    title: string 
  };
  
  methodology: { 
    id: string; 
    title: string 
  };
  
  type: { 
    id: string; 
    title: string; 
    description: string 
  };
  
  location: { 
    lat: number; 
    lng: number 
  };
  
  additionalities: Array<{ 
    title: string; 
    description: string 
  }>;
  
  otherBenefits: Array<{ 
    title: string; 
    description: string 
  }>;
  
  estimatedAnnualMitigations: Array<{ 
    date: string;            // Added based on JSON
    vintage: string; 
    estimatedMitigation: number 
  }>;
  
  documentation: Array<{ 
    id: string; 
    uri: string; 
    name: string | null;     // Changed to allow null based on JSON
    type: string; 
    isPublic: boolean 
  }>;
  
  proponents: Array<{ 
    id: string; 
    fullName: string; 
    logo: string; 
    publicUrl: string 
  }>;
  
  validators: Array<{ 
    id: string; 
    fullName: string; 
    logo: string; 
    publicUrl: string;
    type?: string;           // Added optional field based on JSON
  }>;
}

export interface PaymentIntentResponse {
  success: boolean;
  data: {
    payment_intent_id: string;
    client_secret: string;
  };
}