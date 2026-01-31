// features/portfolio/components/ListingSidebarItem.tsx
import type { Listing } from "@/features/listings/types/listingTypes";

interface ListingSidebarItemProps {
  listing: Listing;  // Changed from 'holding: HoldingDTO'
  isLast: boolean;
}

export const ListingSidebarItem = ({ listing, isLast }: ListingSidebarItemProps) => {
  return (
    <div className={`py-3 ${!isLast ? "border-b border-gray-50" : ""}`}>
      <div className="flex items-start gap-3">
        <img 
          src={listing.image} 
          alt={listing.projectName}
          className="w-12 h-12 rounded-lg object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=600&auto=format&fit=crop";
          }}
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-[#002B2B] truncate">
            {listing.projectName}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-500">{listing.quantity} tCO2e</span>
            <span className="text-gray-300">•</span>
            <span className="text-xs font-bold text-[#5BA49F]">
              ${listing.pricePerUnit}/credit
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};