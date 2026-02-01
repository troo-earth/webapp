import { api } from "@/lib/axiosConfig";
import { handleError } from "@/utils/utils";

export interface RetireCreditsPayload {
  org_id: string;
  project_id: string;
  amount: number;
  purpose: string;
  beneficiary: string;
}

export interface RetireCreditsResponse {
  status: string;
  message: string;
  data: any; // Update with actual response structure if known
}

export const retireCreditsApi = async (payload: RetireCreditsPayload): Promise<RetireCreditsResponse> => {
  try {
    const response = await api.post<RetireCreditsResponse>('/trading/retire-credits', payload);
    return response.data;
  } catch (error: unknown) {
    throw new Error(handleError(error, "Failed to retire credits."));
  }
};