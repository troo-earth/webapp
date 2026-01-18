import type { Project } from "@/entities/projects/types/projectTypes";

  export type FactCardType = {
    id: string;
    type: 'fact';
    title: string;
    fact: string;
    color: string;
  };
  
  export type DisplayItem = Project | FactCardType;