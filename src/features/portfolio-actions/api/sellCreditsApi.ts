import { api } from "@/lib/axiosConfig";
import { handleError } from "@/utils/utils";

export interface SellCreditsPayload {
  org_id: string;
  project_id: string;
  amount: number;
  price: number;
}

export interface SellCreditsResponse {
  status: string;
  message: string;
  data: any;
}

export const sellCreditsApi = async (payload: SellCreditsPayload): Promise<SellCreditsResponse> => {
  try {
    console.log('Sending sell/list request:', payload);
    
    // Validate payload before sending
    if (!payload.org_id || !payload.project_id || payload.amount <= 0 || payload.price <= 0) {
      throw new Error('Invalid listing payload: missing required fields or invalid values');
    }

    const response = await api.post<SellCreditsResponse>('/trading/sell-credits', payload);
    return response.data;
  } catch (error: any) {
    console.error('Sell Credits API error:', error.response?.data || error);
    throw new Error(handleError(error, "Failed to create listing."));
  }
};