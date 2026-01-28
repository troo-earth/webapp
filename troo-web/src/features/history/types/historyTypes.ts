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
}

export interface TransferHistory extends BaseHistoryItem {
  senderOrg: string;
  recipientOrg: string;
  direction: 'inbound' | 'outbound';
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
  type: 'transfer' | 'retire' | 'sell';
  project_id: string;
  from_org_id: string;
  to_org_id: string | null;
  amount: string;
  related_listing_id: string | null;
  createdAt: string;
  updatedAt: string;
}