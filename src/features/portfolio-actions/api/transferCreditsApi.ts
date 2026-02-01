import { api } from "@/lib/axiosConfig";
import { handleError } from "@/utils/utils";

export interface TransferCreditsPayload {
  to_org_code: string;  // Changed from to_org_id
  project_id: string;
  amount: number;
}

export interface TransferCreditsResponse {
  status: string;
  message: string;
  data: any;
}

export const transferCreditsApi = async (payload: TransferCreditsPayload): Promise<TransferCreditsResponse> => {
  try {
    console.log('Sending transfer request:', payload);
    
    // Validate payload before sending
    if (!payload.to_org_code || !payload.project_id || payload.amount <= 0) {
      throw new Error('Invalid transfer payload: missing required fields');
    }

    const response = await api.post<TransferCreditsResponse>('/trading/transfer-credits', payload);
    return response.data;
  } catch (error: any) {
    console.error('Transfer API error:', error.response?.data || error);
    throw new Error(handleError(error, "Failed to transfer credits."));
  }
};