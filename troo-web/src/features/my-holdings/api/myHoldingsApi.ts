import { api } from "@/lib/axiosConfig";
import { handleError } from "@/utils/utils";
import type { Holding } from "@/features/my-holdings/types/holdingTypes"; 

export const getMyHoldingsApi = async (orgId: string): Promise<Holding[]> => {
  try {
    const response = await api.get<{ data: Holding[] }>(`/holdings/view-holdings/${orgId}`);
    
    return response.data.data;
  } catch (error: unknown) { 
    throw new Error(handleError(error, "Failed to fetch holdings."));
  }
};