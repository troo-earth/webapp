import { useMemo, useState } from 'react';
import { Tag, ArrowLeft } from "lucide-react";
import { Link } from '@tanstack/react-router';
import { useListings } from "@/features/listings/hooks/useListings";
import { ListingCard } from "@/features/listings/components/ListingCard";
import { SearchInput } from "@/components/ui/input/SearchInputfield";
import { FilterButton } from "@/components/ui/buttons/FilterButton";
import LoadingScreen from '@/components/global/Loading';

export const ActiveListingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Fetch listings
  const { data: allListings = [], isLoading, error } = useListings();

  // Filter listings based on search
  const filteredListings = useMemo(() => {
    if (!searchQuery.trim()) return allListings;

    const query = searchQuery.toLowerCase();
    return allListings.filter(listing => 
      listing.projectName.toLowerCase().includes(query) || 
      listing.serialPrefix.toLowerCase().includes(query) ||
      listing.location?.toLowerCase().includes(query)
    );
  }, [allListings, searchQuery]);

 

  if (isLoading) return <LoadingScreen />;

  if (error) {
    return (
      <div className="min-h-screen font-nunito pb-20 bg-gray-50/30 px-4 pt-10">
        <div className="mx-auto max-w-400 p-8 bg-red-50 border border-red-200 rounded-3xl text-red-600 font-medium">
          {error instanceof Error ? error.message : "Failed to load listings"}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-nunito pb-20 bg-[#F8FAFA]">
      <div className="mx-auto px-4 py-6 max-w-400">
        
        {/* Navigation & Breadcrumb */}
        <div className="mb-6">
          <Link to="/portfolio">
            <button className="flex items-center gap-2 text-gray-400 hover:text-[#5BA49F] transition-all font-black text-[10px] uppercase tracking-widest cursor-pointer group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Portfolio</span>
            </button>
          </Link>
        </div>

        {/* Header Section */}
        <div className="bg-white rounded-4xl border border-gray-100 shadow-sm p-8 mb-10">
          <div className="flex gap-8 items-start justify-between">
            <div className="max-w-3xl">
              <p className="text-base text-gray-500 font-medium leading-relaxed">
                Monitor your assets currently live on the troo.earth marketplace. 
                Track real-time pricing, volume distribution, and public verification status for each listing.
              </p>
            </div>

            {/* Primary Search Bar - Right side */}
            <div className="flex gap-4 shrink-0 w-full max-w-md justify-end">
              <SearchInput 
                placeholder="Filter your active listings by project, batch serial, or region..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <FilterButton onClick={() => {}} />
            </div>
          </div>
        </div>

        {/* Listings Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6 md:gap-8">
          {filteredListings.length > 0 ? (
            filteredListings.map((listing) => (
              <ListingCard 
                key={listing.id} 
                listing={listing}
                
              />
            ))
          ) : (
            <div className="col-span-full text-center py-32 bg-white rounded-[3rem] border border-dashed border-gray-200">
              <Tag className="mx-auto text-gray-200 mb-4" size={56} />
              <h3 className="text-lg font-black text-gray-400 uppercase tracking-widest">
                No active listings
              </h3>
              <p className="text-gray-300 text-sm mt-1 italic">
                {searchQuery ? "Try a different search term" : "Your active marketplace items will appear here"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActiveListingPage;