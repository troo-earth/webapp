import { api } from "@/lib/axiosConfig";
import { handleError } from "@/utils/utils";
import type { 
  HistoryType, 
  RetirementHistory, 
  SellHistory, 
  TransferHistory,
  ListingDTO,
  RetirementDTO,
  TransactionDTO 
} from "../types/historyTypes";
import { getAllProjectsApi } from "@/entities/projects/api/projectApi";

export const getHistoryApi = async (type: HistoryType, orgId: string): Promise<any[]> => {
  try {
    // 1. If type is 'sell', fetch from the real marketplace API
    if (type === 'sell') {
      const response = await api.get<{
        status: string;
        message: string;
        data: ListingDTO[];
      }>(`/listings/get-org-listings`);
      
      // Transform marketplace DTO to SellHistory interface
      return response.data.data.map((item: ListingDTO): SellHistory => {
        const creditsAvailable = parseFloat(item.credits_available);
        const pricePerCredit = parseFloat(item.price_per_credit);
        
        return {
          id: item.listing_id,
          projectId: item.project_id,
          projectName: item.project_name,
          quantity: creditsAvailable,
          date: new Date(item.createdAt).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          }),
          serialPrefix: `${item.methodology}-${item.vintage_year}`,
          image: item.thumbnail_url || "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=600&auto=format&fit=crop",
          pricePerUnit: pricePerCredit,
          totalValue: creditsAvailable * pricePerCredit,
          status: item.status,
          vintage: item.vintage_year,
          location: `${item.location_city || ''}, ${item.location_state || ''}, ${item.location_country || ''}`.replace(/^,\s*|,\s*,/g, '').trim(),
          registry: item.registry
        };
      });
    }

    // 2. If type is 'retirement', fetch from retirement API
    if (type === 'retirement') {
      const response = await api.get<{
        status: string;
        message: string;
        data: RetirementDTO[];
      }>(`/retirements/view-org/`);
      
      console.log('Retirement API response:', response.data);

      // Fetch all projects to get project details
      const allProjects = await getAllProjectsApi();
      const projectMap = new Map(
        allProjects.map(project => [project.projectid, project])
      );
      
      // Transform retirement DTO to RetirementHistory interface
      return response.data.data.map((item: RetirementDTO): RetirementHistory => {
        const project = projectMap.get(item.project_id);
        
        return {
          id: item.certificate_id,
          projectId: item.project_id,
          projectName: project?.name || 'Unknown Project',
          quantity: parseFloat(item.amount),
          date: new Date(item.retired_at).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          }),
          serialPrefix: item.certificate_number,
          image: project?.imageUrl || "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=600&auto=format&fit=crop",
          certificateUrl: `#certificate-${item.certificate_id}`,
          beneficiary: item.beneficiary,
          purpose: item.purpose,
          certificateNumber: item.certificate_number,
          status: item.status
        };
      });
    }

    // 3. If type is 'transfer', fetch from transactions API and filter
    if (type === 'transfer') {
      const response = await api.get<{
        status: string;
        message: string;
        data: TransactionDTO[];
      }>(`/transactions/get-transactions`);
      
      console.log('Transactions API response:', response.data);

      // Filter for transfers only
      const transfers = response.data.data.filter(
        (item: TransactionDTO) => item.type === 'transfer'
      );

      // Fetch all projects to get project details
      const allProjects = await getAllProjectsApi();
      const projectMap = new Map(
        allProjects.map(project => [project.projectid, project])
      );
      
      // Transform transaction DTO to TransferHistory interface
      return transfers.map((item: TransactionDTO): TransferHistory => {
        const project = projectMap.get(item.project_id);
        const isOutbound = item.from_org_id === orgId;
        
        return {
          id: item.tx_id,
          projectId: item.project_id,
          projectName: project?.name || 'Unknown Project',
          quantity: parseFloat(item.amount),
          date: new Date(item.createdAt).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          }),
          serialPrefix: project?.registry || 'TRX-' + item.tx_id.slice(0, 8),
          image: project?.imageUrl || "https://images.unsplash.com/photo-1509391366360-fe5bb4485195?q=80&w=600&auto=format&fit=crop",
          senderOrg: isOutbound ? 'Your Organization' : item.from_org_id.slice(0, 8),
          recipientOrg: isOutbound ? (item.to_org_id?.slice(0, 8) || 'Unknown') : 'Your Organization',
          direction: isOutbound ? 'outbound' : 'inbound',
          status: 'completed' // Assuming completed since it's in history
        };
      });
    }

    return [];

  } catch (error: unknown) {
    console.error(`Error fetching ${type} history:`, error);
    throw new Error(handleError(error, `Failed to fetch ${type} history.`));
  }
};