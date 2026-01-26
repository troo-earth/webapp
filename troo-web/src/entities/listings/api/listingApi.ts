import { api } from "@/lib/axiosConfig";
import { handleError } from "@/utils/utils";
import type { ListingDetail, ListingDetailResponse ,ListingResponse, ListingsApiResponse, PaymentIntentResponse } from "../types/listingTypes";


export const getAllListingsApi = async (): Promise<ListingResponse[]> => {
  try {
    const response = await api.get<ListingsApiResponse>('/listings/get-all-listings');
    
    return response.data.data.map((listing) => ({
      id: listing.listing_id, 
      projectid: listing.project_id,
      imageUrl: listing.thumbnail_url,
      country: listing.location_country,
      state: listing.location_state,
      type: listing.category,
      name: listing.project_name,
      year: listing.project_start_year,
      price: parseFloat(listing.price_per_credit),
      sdgGoals: listing.sdg_numbers || [],
      registry: listing.registry || 'Unknown',
    }));
  } catch (error: unknown) {
    throw new Error(handleError(error, "Failed to fetch listings."));
  }
};


export const getListingByIdApi = async (id:string): Promise<ListingDetail> =>{
  try{
    const response = await api.get<ListingDetailResponse>(`/listings/get-listing/${id}`);
    return response.data.data;
  } catch (error: unknown) {
    throw new Error(handleError(error, "Failed to fetch listing details."));
  }
}


export const buyCreditsApi = async (projectId: string, orgId: string, amount: number): Promise<string> => {
  try {
    const response = await api.post<PaymentIntentResponse>('/trading/buy-credits', { 
      listing_id: projectId,
      buyer_org_id: orgId, 
      amount 
    });
    return response.data.data.client_secret;
  } catch (error: unknown) {
    throw new Error(handleError(error, "Failed to purchase."));
  }
};