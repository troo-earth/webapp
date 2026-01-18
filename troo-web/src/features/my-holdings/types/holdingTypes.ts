export interface Holding {
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
