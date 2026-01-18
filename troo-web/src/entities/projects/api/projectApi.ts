import { api } from "@/lib/axiosConfig";
import { handleError } from "@/utils/utils";
import type { ListingsApiResponse, PaymentIntentResponse, ProjectDetail, ProjectDetailResponse, ProjectResponse } from "../types/projectTypes";


export const getAllProjectsApi = async (): Promise<ProjectResponse[]> => {
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
    throw new Error(handleError(error, "Failed to fetch projects."));
  }
};



export const getProjectByIdApi = async (id:string): Promise<ProjectDetail> =>{
  try{
    const response = await api.get<ProjectDetailResponse>(`/marketplace/projects/${id}`);
    return response.data.data;
  } catch (error: unknown) {
    throw new Error(handleError(error, "Failed to fetch project details."));
  }
}


export const createPaymentIntentApi = async (projectId: string, amount: number): Promise<string> => {
  try {
    const response = await api.post<PaymentIntentResponse>('/payments/create-intent', { 
      projectId, 
      amount 
    });
    return response.data.data.clientSecret;
  } catch (error: unknown) {
    throw new Error(handleError(error, "Failed to initialize payment."));
  }
};