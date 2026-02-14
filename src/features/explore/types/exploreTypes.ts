import type { ListingResponse } from "@/shared/listings/types/listingTypes";

export type FactCardType = {
    id: string;
    type: 'fact';
    title: string;
    fact: string;
    color: string;
  };
  
  export type DisplayItem = ListingResponse | FactCardType;