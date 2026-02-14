import { api } from "@/lib/axiosConfig";
import { handleError } from "@/utils/utils";
import type {
  HistoryType,
  ListingEventDTO,
  RetirementDTO,
} from "../types/historyTypes";
import { getAllListingsApi } from "@/shared/listings/api/listingApi";
import {
  transformListingEvent,
  transformRetirement,
  transformTransfer,
  detectCurrentOrgCode,
} from "../utils/historyTransformers";

export const getHistoryApi = async (type: HistoryType): Promise<any[]> => {
  try {
    // 1. If type is 'sell', fetch from listing events API
    if (type === 'sell') {
      const response = await api.get<{
        status: string;
        message: string;
        data: {
          events: ListingEventDTO[];
        };
      }>(`/listing-events/get-org-listing-events`);

      // Fetch all projects to get project details for images
      const allProjects = await getAllListingsApi();
      const projectMap = new Map(
        allProjects.map(project => [project.id, project])
      );

      return response.data.data.events.map((item) =>
        transformListingEvent(item, projectMap)
      );
    }

    // 2. If type is 'retirement', fetch from retirement API
    if (type === 'retirement') {
      const response = await api.get<{
        status: string;
        message: string;
        data: RetirementDTO[];
      }>(`/retirements/view-org/`);

      // Fetch all projects to get project details
      const allProjects = await getAllListingsApi();
      const projectMap = new Map(
        allProjects.map(project => [project.projectid, project])
      );

      return response.data.data.map((item) =>
        transformRetirement(item, projectMap)
      );
    }

    // 3. If type is 'transfer', fetch from transactions API and filter
    if (type === 'transfer') {
      const response = await api.get<{
        status: string;
        message: string;
        data: any[];
      }>(`/transactions/get-transactions`);

      // Filter for transfers only
      const transfers = response.data.data.filter(
        (item: any) => item.type === 'transfer'
      );

      // Detect current organization code
      const currentOrgCode = detectCurrentOrgCode(transfers);

      return transfers.map((item) =>
        transformTransfer(item, currentOrgCode)
      );
    }

    return [];

  } catch (error: unknown) {
    console.error(`Error fetching ${type} history:`, error);
    throw new Error(handleError(error, `Failed to fetch ${type} history.`));
  }
};