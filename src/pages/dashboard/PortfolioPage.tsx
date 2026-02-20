import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { 
  Leaf, 
  ArrowUpRight, 
  BarChart3,
} from "lucide-react";

// Feature Components
import { PortfolioSummary } from "@/features/portfolio/components/PortfolioSummary";
import { AssetCard } from "@/features/portfolio/components/AssetCard";
import { ListingSidebarItem } from "@/features/portfolio/components/ListingSidebarItem";
import { useListings } from "@/features/listings/hooks/useListings";
import { getMyHoldingsApi } from "@/features/portfolio/api/myHoldingsApi";
import { useAuth } from "@/features/auth/hooks/useAuth";
import LoadingScreen from "@/components/global/Loading";

export const PortfolioPage = () => {
  const queryClient = useQueryClient();
  const [activeActionId, setActiveActionId] = useState<string | null>(null);

  // Get org_id from auth
  const { user } = useAuth();
  const orgId = user?.org_id;

  // Fetch holdings from API
  const { data: holdings, isLoading, error } = useQuery({
    queryKey: ['my-holdings', orgId],
    queryFn: () => getMyHoldingsApi(),
    enabled: !!orgId,
    staleTime: 5 * 60 * 1000,
  });

  // Fetch ALL listings (no status filter)
  const { data: allListings = [], isLoading: listingsLoading } = useListings();

  // Filter for active listings on the client side
  const activeListings = allListings;

  // Action Mutations
  const retireMutation = useMutation({
    mutationFn: async (id: string) => {
      setActiveActionId(id);
      await new Promise(r => setTimeout(r, 1200));
      // TODO: Add actual retire API call
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-holdings'] });
      setActiveActionId(null);
    }
  });

  const listMutation = useMutation({
    mutationFn: async (id: string) => {
      setActiveActionId(id);
      await new Promise(r => setTimeout(r, 1200));
      // TODO: Add actual list API call
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-holdings'] });
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      setActiveActionId(null);
    }
  });

  const activeHoldings = useMemo(() => holdings?.filter(h => h.status === 'active') || [], [holdings]);
  const retiredHoldings = useMemo(() => holdings?.filter(h => h.status === 'retired') || [], [holdings]);

 
  const stats = useMemo(() => ({
    total: holdings?.reduce((acc, curr) => acc + curr.quantity, 0) || 0,
    active: activeHoldings.reduce((acc, curr) => acc + curr.quantity, 0),
  }), [holdings, activeHoldings, retiredHoldings]);

  // Loading state
  if (isLoading) {
    return (
      <LoadingScreen />
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen font-nunito pb-24 bg-gray-50/30">
        <div className="mx-auto px-4 pt-6 max-w-[1600px]">
          <div className="p-8 bg-red-50 border border-red-200 rounded-3xl">
            <p className="text-red-600 text-sm font-medium">
              {error instanceof Error ? error.message : "Failed to load portfolio"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // No orgId state
  if (!orgId) {
    return (
      <div className="min-h-screen font-nunito pb-24 bg-gray-50/30">
        <div className="mx-auto px-4 pt-6 max-w-[1600px]">
          <div className="p-8 bg-yellow-50 border border-yellow-200 rounded-3xl">
            <p className="text-yellow-600 text-sm font-medium">
              Organization ID not found. Please complete onboarding or log in again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-nunito pb-24 bg-gray-50/30">
      <div className="mx-auto px-4 pt-6 max-w-[1600px]">
        
        <div className="mb-10">
            <PortfolioSummary total={stats.total} activeCount={stats.active}  />
        </div>

        {/* CHANGE: Changed grid to stack by default and lg. 
            Used xl:grid-cols-12 to trigger the side-by-side layout only on desktop.
        */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-12">
            
            {/* LEFT: MAIN ASSETS */}
            {/* CHANGE: xl:col-span-8 for desktop, full width for tablet/ipad */}
            <div className="xl:col-span-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-extrabold text-[#002B2B] flex items-center gap-2">
                        Active Assets
                        <span className="bg-[#5BA49F]/10 text-[#5BA49F] text-xs py-0.5 px-2 rounded-full">{activeHoldings.length}</span>
                    </h2>
                    <Link to="/explore" className="text-sm font-bold text-[#5BA49F] hover:text-[#002B2B] flex items-center gap-1 transition-colors">
                        Explore Market <ArrowUpRight size={16} />
                    </Link>
                </div>
                
                <div className="space-y-6">
                    {activeHoldings.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200">
                            <Leaf className="mx-auto text-gray-200 mb-4" size={48} />
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Portfolio Empty</p>
                        </div>
                    ) : (
                        activeHoldings.map(h => (
                            <AssetCard 
                              key={h.id} 
                              holding={h} 
                              onRetire={(id) => retireMutation.mutate(id)}
                              onList={(id) => listMutation.mutate(id)}
                              onTransfer={(id) => console.log("Transferring:", id)}
                              isRetiring={retireMutation.isPending && activeActionId === h.id}
                              isListing={listMutation.isPending && activeActionId === h.id}
                            />
                        ))
                    )}
                </div>
            </div>

            {/* RIGHT: ACTIVITY SIDEBARS */}
            {/* CHANGE: xl:col-span-4 for desktop, full width for iPad */}
            <div className="xl:col-span-4 space-y-8">
               <div className="bg-white rounded-[2.5rem] p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100">
                  <div className="flex items-center gap-3 mb-6 border-b border-gray-50 pb-5">
                      <div className="bg-[#5BA49F]/10 p-2.5 rounded-xl">
                          <BarChart3 size={20} className="text-[#5BA49F]" />
                      </div>
                      <div>
                          <h2 className="text-lg font-black text-[#002B2B] tracking-tight">Active Listings</h2>
                          <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                            {activeListings.length} active • {allListings.length} total
                          </p>
                      </div>
                  </div>

                  <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                      {listingsLoading ? (
                          <p className="text-sm text-gray-400 text-center py-10 font-medium italic">Loading...</p>
                      ) : allListings.length === 0 ? (
                           <p className="text-sm text-gray-400 text-center py-10 font-medium italic">No listings yet.</p>
                      ) : (
                          activeListings.slice(-4).map((listing, index, arr) => (
                              <ListingSidebarItem 
                                key={listing.id} 
                                listing={listing} 
                                isLast={index === arr.length - 1} 
                              />
                          ))
                      )}
                  </div>
                  
                  <div className="mt-6 pt-5 border-t border-gray-50">
                      <Link to="/listings" className="w-full flex items-center justify-center gap-2 py-3 bg-gray-50 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:bg-[#002B2B] hover:text-white transition-all">
                          View All {activeListings.length} Active Listings
                      </Link>
                  </div>
              </div>
            </div>

        </div>
      </div>
    </div>
  );
};