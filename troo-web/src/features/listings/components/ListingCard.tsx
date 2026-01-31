    import { 
      MapPin, 
      Tag, 
      ShieldCheck, 
      BarChart3,
      Edit3,
      X
    } from 'lucide-react';
    import { useState } from 'react';
    import type { Listing } from "../types/listingTypes";
    import { EditListingModal } from './EditListingModal';
    import { CancelListingModal } from './CancelListingModal';

    interface ListingCardProps {
      listing: Listing;
      onViewDetails?: (id: string) => void;
    }

    export const ListingCard: React.FC<ListingCardProps> = ({ listing, onViewDetails }) => {
      const [showEditModal, setShowEditModal] = useState(false);
      const [showCancelModal, setShowCancelModal] = useState(false);

      // Status configuration mapping
      const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
        active: { bg: "bg-primary", text: "text-white", label: "Live" },
        closed: { bg: "bg-gray-400", text: "text-white", label: "Sold" },
      };

      const status = statusConfig[listing.status] || statusConfig.active;

      const handleCardClick = (e: React.MouseEvent) => {
        // Don't trigger card click if clicking on buttons
        const target = e.target as HTMLElement;
        if (target.closest('button')) {
          return;
        }
        onViewDetails?.(listing.id);
      };

      return (
        <>
          <div
            onClick={handleCardClick}
            className="group relative flex flex-col w-full bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 cursor-pointer hover:-translate-y-1 h-full"
          >
            {/* Image Section */}
            <div className="relative h-40 w-full overflow-hidden shrink-0">
              <img
                src={listing.image}
                alt={listing.projectName}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=600&auto=format&fit=crop";
                }}
              />

              {/* Top Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                <div className={`flex items-center gap-1.5 ${status.bg} ${status.text} px-2.5 py-1 rounded-md shadow-sm`}>
                  <div className={`w-1.5 h-1.5 rounded-full bg-white ${(listing.status === 'active' ) ? 'animate-pulse' : ''}`} />
                  <span className="text-[10px] font-extrabold uppercase tracking-wider">{status.label}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md text-gray-600 px-2.5 py-1 rounded-md shadow-sm border border-gray-100/50">
                  <Tag className="w-3 h-3 text-secondary" />
                  <span className="text-[10px] font-black uppercase">{listing.id.split('-')[0]}</span>
                </div>
              </div>

              {/* Bottom Badge */}
              <div className="absolute bottom-3 left-3 z-10">
                <span className="inline-flex items-center bg-secondary text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-lg uppercase tracking-widest">
                  {listing.vintage ? `Vintage ${listing.vintage}` : 'Listing'}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col flex-1 gap-3">
              <div>
                <div className="h-12 mb-1">
                  <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {listing.projectName}
                  </h3>
                </div>
                <div className="flex items-center text-gray-600 text-xs">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-gray-500" />
                  <span className="truncate">{listing.location || 'Global'}</span>
                </div>
              </div>

              {/* Metrics Bar */}
              <div className="h-13 bg-gray-50 rounded-lg px-3 flex items-center justify-between border border-gray-100/50">
                <div className="flex items-center gap-2">
                  <BarChart3 size={14} className="text-primary" />
                  <span className="font-family-nunito text-[13px] font-bold text-[#002B2B]">
                    {listing.quantity.toLocaleString()} 
                    <span className="text-[10px] text-gray-400 font-medium ml-1">tCO2e</span>
                  </span>
                </div>
                <div className="h-6 w-px bg-gray-200 mx-1"></div>
                <div className="flex items-center gap-1">
                  <ShieldCheck size={14} className="text-[#5BA49F]" />
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-tighter">Verified</span>
                </div>
              </div>

              {/* Bottom Action Row */}
              <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[10px] text-gray-400 font-bold capitalize tracking-wide">
                      Ask Price / Unit
                    </span>
                  </div>
                  <div className="text-gray-900 leading-none">
                    <span className="text-lg font-black tracking-tight">
                      ${listing.pricePerUnit.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                {(listing.status === 'active' ) && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowEditModal(true)}
                      className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all"
                      title="Edit Listing"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => setShowCancelModal(true)}
                      className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                      title="Cancel Listing"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Modals */}
          <EditListingModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            listing={listing}
          />
          
          <CancelListingModal
            isOpen={showCancelModal}
            onClose={() => setShowCancelModal(false)}
            listing={listing}
          />
        </>
      );
    };