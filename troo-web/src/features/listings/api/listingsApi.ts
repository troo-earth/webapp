import { api } from "@/lib/axiosConfig";
import { handleError } from "@/utils/utils";
import type { ListingDTO, Listing, ListingsFilter } from "../types/listingTypes";

export const getListingsApi = async (
    filters?: ListingsFilter
): Promise<Listing[]> => {
    try {
        const response = await api.get<{
            status: string;
            message: string;
            data: ListingDTO[];
        }>(`/listings/get-org-active-listings`);

        // Transform DTO to UI-friendly format
        let listings = response.data.data.map((item: ListingDTO): Listing => {
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
                status: item.status === 'open' ? 'active' : 'closed',
                vintage: item.vintage_year,
                location: `${item.location_city || ''}, ${item.location_state || ''}, ${item.location_country || ''}`.replace(/^,\s*|,\s*,/g, '').trim(),
                registry: item.registry,
                category: item.category,
                methodology: item.methodology,
            };
        });

        // Apply filters
        if (filters?.status) {
            listings = listings.filter(listing => listing.status === filters.status);
        }

        if (filters?.vintage) {
            listings = listings.filter(listing => listing.vintage === filters.vintage);
        }

        return listings;
    } catch (error: unknown) {
        throw new Error(handleError(error, "Failed to fetch listings."));
    }
};

export const editListingApi = async (data: {
    listing_id: string;
    price: number;
    quantity: number;
}): Promise<void> => {
    try {
        await api.put('/listings/edit-listing/', {
            listing_id: data.listing_id,
            price: data.price,
            quantity: data.quantity,
        });
    } catch (error: unknown) {
        throw new Error(handleError(error, "Failed to edit listing."));
    }
};

export const cancelListingApi = async (listingId: string): Promise<void> => {
    try {
        await api.post('/listings/cancel-listing', {
            listing_id: listingId,
        });
    } catch (error: unknown) {
        throw new Error(handleError(error, "Failed to cancel listing."));
    }
};