import { api } from "@/lib/axiosConfig";
import { handleError } from "@/utils/utils";
import type { Portfolio, HoldingDTO } from "@/features/portfolio/types/portfolioTypes";
import { getAllListingsApi } from "@/shared/listings/api/listingApi";
import type { HoldingProject, HoldingProjectResponse } from "@/features/portfolio/types/portfolioTypes";

export const getMyHoldingsApi = async (): Promise<Portfolio[]> => {
  try {
    // Fetch holdings
    const holdingsResponse = await api.get<{ 
      status: string;
      message: string;
      data: HoldingDTO[] 
    }>(`/holdings/view-holdings/`);
    
    const holdings = holdingsResponse.data.data;

    // If no holdings, return empty array
    if (!holdings || holdings.length === 0) {
      return [];
    }

    // Fetch all projects to map details
    const allProjects = await getAllListingsApi();
    
    // Create a map of project details by project_id
    const projectMap = new Map(
      allProjects.map(project => [project.projectid, project])
    );

    // Transform holdings with project data
    return holdings.map((holding: HoldingDTO): Portfolio => {
      const creditBalance = parseFloat(holding.credit_balance || '0');
      const lockedForSale = parseFloat(holding.locked_for_sale || '0');
      const availableCredits = creditBalance - lockedForSale;

      // ✅ Use project_id to look up project details
      const project = projectMap.get(holding.project_id);

      // Build location string
      const location = project 
        ? [project.state, project.country].filter(Boolean).join(', ')
        : 'Location Unknown';

      return {
        id: holding.holding_id,
        listingId: holding.listing_id, // ✅ Use listing_id for URLs
        projectId: holding.project_id, // ✅ Keep project_id for reference
        projectName: project?.name || `Project ${holding.project_id.slice(0, 8)}...`,
        location,
        image: project?.imageUrl || "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=600&auto=format&fit=crop",
        quantity: availableCredits,
        vintage: holding.vintage_year ? holding.vintage_year.toString() : (project?.year?.toString() || 'N/A'),
        serialPrefix: project?.registry || `HOLD-${holding.holding_id.slice(0, 8)}`,
        status: 'active',
        pricePaid: project?.price || 0,
        impactFact: project?.type || "Carbon offset project",
      };
    });
  } catch (error: unknown) { 
    throw new Error(handleError(error, "Failed to fetch holdings."));
  }
};

export const getHoldingProjectApi = async (holdingId: string): Promise<HoldingProject> => {
  try {
    const response = await api.post<HoldingProjectResponse>('/holdings/view-project', {
      holding_id: holdingId
    });
    const { project, holding_id: hId, project_id } = response.data.data;
    return { ...project, holding_id: hId, project_id };
  } catch (error: unknown) {
    throw new Error(handleError(error, "Failed to fetch holding project details."));
  }
};