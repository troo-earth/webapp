import type { Project } from "@/entities/listings/types/listingTypes";

  export type FactCardType = {
    id: string;
    type: 'fact';
    title: string;
    fact: string;
    color: string;
  };
  
  export type DisplayItem = Project | FactCardType;