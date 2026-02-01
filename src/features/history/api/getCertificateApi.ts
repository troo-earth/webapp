import { api } from "@/lib/axiosConfig";
import { handleError } from "@/utils/utils";

export interface CertificateData {
  certificate_id: string;
  org_id: string;
  project_id: string;
  amount: string;
  retired_at: string;
  purpose: string;
  beneficiary: string;
  transaction_id: string;
  certificate_number: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  // Add any additional fields from the response
}

export const getCertificateApi = async (certificateId: string): Promise<CertificateData> => {
  try {
    const response = await api.post<{
      status: string;
      message: string;
      data: CertificateData;
    }>('/retirements/view-one', {
      certificate_id: certificateId
    });
    
    return response.data.data;
  } catch (error: unknown) {
    throw new Error(handleError(error, "Failed to fetch certificate data."));
  }
};