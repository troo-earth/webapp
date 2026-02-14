import { Globe, Leaf, ShieldCheck } from "lucide-react";
import { ListingCard } from "../../shared/listings/components/ListingCard";
import { useMemo, useState } from "react";
import { FilterButton } from "@/components/ui/buttons/FilterButton";
import { SearchInput } from "@/components/ui/input/SearchInputfield";
import { useQuery } from "@tanstack/react-query";
import LoadingScreen from "@/components/global/Loading";
import { FACT_CARDS } from "../../features/explore/constants/data";
import { Link } from "@tanstack/react-router";
import { transformListing } from "@/shared/listings/utils/helpers";
import type { Listing } from "@/shared/listings/types/listingTypes";
import type { DisplayItem, FactCardType } from "@/features/explore/types/exploreTypes";
import { StatItem } from "@/features/explore/components/StatItem";
import { FactCard } from "@/features/explore/components/FactCard";
import { listingQueries } from "@/shared/listings/queries/listingQueries";


export const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: listingsData, isLoading, isError } = useQuery(listingQueries.list());

  const handleFilterClick = () => {
    console.log("Open filter modal");
  };

  const displayItems = useMemo(() => {
    if (!listingsData) return [];
    
    let listings: Listing[] = listingsData.map(transformListing);
    

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      listings = listings.filter((listing) => {
        return (
          listing.name.toLowerCase().includes(query) ||
          listing.type.toLowerCase().includes(query) ||
          listing.country.toLowerCase().includes(query) ||
          listing.state.toLowerCase().includes(query)
        );
      });
    }
    

    const listingCount = listings.length;
    if (listingCount === 0) return [];
    
    const factsToInject = Math.min(FACT_CARDS.length, Math.max(1, Math.floor(listingCount / 3)));
    
    const factsToUse = FACT_CARDS.slice(0, factsToInject);

    const positions: number[] = [];
    const step = Math.floor(listingCount / (factsToInject + 1));
    
    for (let i = 0; i < factsToInject; i++) {
      const basePosition = step * (i + 1);
      const variation = (listingCount % (i + 2)) % 3;
      const position = Math.min(basePosition + variation, listingCount - 1);
      positions.push(Math.max(2, position)); 
    }
    
    positions.sort((a, b) => b - a);
    
    const items: DisplayItem[] = [...listings];
    
    positions.forEach((position, index) => {
      items.splice(position, 0, factsToUse[index]);
    });
    
    return items;
  }, [listingsData, searchQuery]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-bold mb-2">Failed to load listings</p>
          <p className="text-gray-500 text-sm">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-nunito pb-20">
      
      <div className="mx-auto px-4 py-4">
        
        <div className="w-full bg-white rounded-3xl border border-gray-100 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)] p-6 mb-8 flex flex-col md:flex-row justify-between md:items-center gap-6 md:gap-0">
            <div className="flex flex-wrap gap-8 lg:gap-16">
                <StatItem icon={Leaf} label="Total CO2 Offset" value="2.4M Tons" />
                <div className="hidden md:block w-px h-10 bg-gray-100" />
                <StatItem icon={Globe} label="Active listings" value="142" />
                <div className="hidden md:block w-px h-10 bg-gray-100" />
                <StatItem icon={ShieldCheck} label="Verified Registries" value="Carbon Registry" />
            </div>
            
            <div className="text-right hidden xl:block">
                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase tracking-wider">
                    Live Market Data
                </span>
            </div>
        </div>

        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 mb-10">
            
            <div className="max-w-2xl pl-6 border-l-4 border-primary/20">
            <p className="text-base text-gray-500 font-medium leading-relaxed">
              Browse our <span className="text-gray-900 font-bold">curated selection</span> of high-integrity carbon credits. 
              Each listing is verified by leading standards to ensure <span className="text-primary font-bold">real, measurable impact.</span>
            </p>
          </div>

            <div className="flex gap-4 w-full sm:w-auto">
                <SearchInput 
                    placeholder="Search listings..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-auto"
                />
                <FilterButton onClick={handleFilterClick} />
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6 md:gap-8">
            {displayItems.map((item) => {
                if (item.type === 'fact') {
                    const factCard = item as FactCardType;
                    return (
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        <FactCard key={factCard.id} title={factCard.title} fact={factCard.fact} color={factCard.color} />
                    );
                } else {
                    const listing = item as Listing;
                    return (
                        <Link to="/$source/listing/$listingId" params={{ source: 'explore', listingId: listing.id }}>
                          <div key={listing.id} className="h-full" >
                              <ListingCard key={listing.id} listing={listing} />
                          </div>
                        </Link>
                    );
                }
            })}
        </div>

      </div>
    </div>
  );
};