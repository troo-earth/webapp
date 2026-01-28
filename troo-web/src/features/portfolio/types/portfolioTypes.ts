// API Response DTO
export interface HoldingDTO {
  holding_id: string;
  org_id: string;
  project_id: string;
  vintage_year: number | null;
  credit_balance: string;
  locked_for_sale: string;
}

// UI Model
export interface Portfolio {
  id: string;
  projectId: string;
  projectName: string;
  location: string;
  image: string;
  quantity: number;
  vintage: string; 
  serialPrefix: string;
  status: 'active' | 'retired';
  retirementDate?: string;
  pricePaid: number;
  impactFact: string;
}