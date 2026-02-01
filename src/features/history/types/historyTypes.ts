export type HistoryType = 'retirement' | 'sell' | 'transfer';

export interface BaseHistoryItem {
  id: string;
  projectId: string;
  projectName: string;
  quantity: number;
  date: string;
  serialPrefix: string;
  image: string;
}

export interface RetirementHistory extends BaseHistoryItem {
  certificateUrl: string;
  beneficiary: string;
  purpose?: string;
  certificateNumber?: string;
  status?: string;
}

export interface SellHistory extends BaseHistoryItem {
  pricePerUnit: number;
  totalValue: number;
  status: 'active' | 'closed' | 'pending';
  vintage: number;
  location: string;
  registry: string;
  eventType?: 'CREATED' | 'UPDATED' | 'CANCELLED' | 'PARTIALLY_FILLED';
  eventData?: any;
  eventDescription?: string; // ✅ Add this
}

export interface TransferHistory extends BaseHistoryItem {
  senderOrg: string;
  recipientOrg: string;
  direction: 'inbound' | 'outbound';
  status: 'completed';
}

// API Response types - Listing Events
export interface ListingEventDTO {
  event_id: string;
  listing_id: string;
  event_type: 'CREATED' | 'UPDATED' | 'CANCELLED' | 'PARTIALLY_FILLED';
  event_data: {
    credits_available?: string;
    price_per_credit?: string;
    remaining_credits?: string;
    quantity_delta?: number;
    new_price_per_credit?: number;
    new_credits_available?: number;
    bought_quantity?: number;
    remaining_quantity?: number;
  };
  actor_org_code: string;
  createdAt: string;
}

// API Response types - Listings
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
  status: 'active' | 'closed';
  sdg_numbers: number[];
  methodology: string;
  vintage_year: number;
  createdAt: string;
  updatedAt: string;
}

// API Response types - Retirements
export interface RetirementDTO {
  certificate_id: string;
  org_id: string;
  project_id: string;
  amount: string;
  retired_at: string;
  purpose: string;
  beneficiary: string;
  transaction_id: string;
  certificate_number: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionDTO {
  tx_id: string;
  type: 'transfer' | 'retire' | 'sell' | 'buy';
  project_id: string;
  from_org_id: string | null;
  to_org_id: string | null;
  amount: string;
  related_listing_id: string | null;
  createdAt: string;
  updatedAt: string;
}