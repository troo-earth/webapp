// API Response DTO
export interface HoldingDTO {
  holding_id: string;
  org_id: string;
  project_id: string;
  listing_id: string;
  vintage_year: number | null;
  credit_balance: string;
  locked_for_sale: string;
}

// UI Model
export interface Portfolio {
  id: string;
  listingId: string;
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

// Project types (based on your API response)
export interface ProjectType {
  id: string;
  title: string;
  description: string;
}

export interface Methodology {
  id: string;
  title: string;
}

export interface Sector {
  id: string;
  title: string;
}

export interface Additionality {
  title: string;
  description: string;
}

export interface OtherBenefit {
  title: string;
  description: string;
}

export interface EstimatedAnnualMitigation {
  vintage: string;
  estimatedMitigation: number;
}

export interface Proponent {
  id: string;
  logo?: string;
  fullName: string;
  publicUrl: string;
}

export interface Validator {
  id: string;
  logo?: string;
  type?: string;
  fullName: string;
  publicUrl: string;
}

export interface Documentation {
  id: string;
  uri: string;
  name: string;
  type: string;
  isPublic: boolean;
}

export interface KmlFile {
  id: string;
  uri: string;
  name: string;
  type: string;
  isPublic: boolean;
  createdAt: string;
}

// Main Project interface
export interface HoldingProject {
  holding_id: string;
  project_id: string;
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
  thumbnail: string;
  publicUrl: string;
  sector?: Sector;
  additionalities: Additionality[];
  otherBenefits: OtherBenefit[];
  methodology?: Methodology;
  type?: ProjectType;
  estimatedAnnualMitigations: EstimatedAnnualMitigation[];
  location: string | null;
  kmlFile?: KmlFile;
  proponents: Proponent[];
  validators: Validator[];
  documentation: Documentation[];
  syncedAt: string;
  credit_balance?: string;
  vintage_year?: string | null;
  locked_for_sale?: string;
}

// API Response type
export interface HoldingProjectResponse {
  status: string;
  message: string;
  data: {
    holding_id: string;
    project_id: string;
    project: HoldingProject;
  };
  metadata: Record<string, any>;
}