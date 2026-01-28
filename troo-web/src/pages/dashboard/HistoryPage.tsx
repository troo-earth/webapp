import { useMemo, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { 
  Award, 
  Tag, 
  ArrowLeftRight, 
  History as HistoryIcon,
} from "lucide-react";
 
import type { HistoryType } from "@/features/history/types/historyTypes";
import { SearchInput } from "@/components/ui/input/SearchInputfield";
import { FilterButton } from "@/components/ui/buttons/FilterButton";
import { HistoryCard } from "@/features/history/components/HistoryCard";
import { getHistoryApi } from '@/features/history/api/historyApi';
import { useAuth } from "@/features/auth/hooks/useAuth";
import LoadingScreen from '@/components/global/Loading';

export const HistoryPage = () => {
  const [activeTab, setActiveTab] = useState<HistoryType>('retirement');
  const [searchQuery, setSearchQuery] = useState("");

  // Get org_id from auth hook
  const { user } = useAuth();
  const orgId = user?.org_id;

  const tabs = [
    { id: 'retirement', label: 'Retirements', icon: <Award size={16} /> },
    { id: 'sell', label: 'Listings', icon: <Tag size={16} /> },
    { id: 'transfer', label: 'Transfers', icon: <ArrowLeftRight size={16} /> },
  ];

  // Fetch history data based on active tab
  const { data: historyItems = [], isLoading, error } = useQuery({
    queryKey: ['history', activeTab, orgId],
    queryFn: () => getHistoryApi(activeTab, orgId!),
    enabled: !!orgId, // Only run query if orgId exists
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });

  // Logic for filtering based on search query
  const displayItems = useMemo(() => {
    if (!searchQuery.trim()) return historyItems;

    const query = searchQuery.toLowerCase();
    return historyItems.filter((item: any) => 
      item.projectName.toLowerCase().includes(query) || 
      item.serialPrefix.toLowerCase().includes(query) ||
      item.id.toLowerCase().includes(query)
    );
  }, [historyItems, searchQuery]);

  // Loading state
  if (isLoading) {
    return (
      <div className='h-screen overflow-y'>
      <LoadingScreen />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen font-nunito pb-20 bg-gray-50/30">
        <div className="mx-auto px-4 py-4 max-w-[1600px]">
          <div className="p-8 bg-red-50 border border-red-200 rounded-3xl">
            <p className="text-red-600 text-sm font-medium">
              {error instanceof Error ? error.message : "Failed to load history"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // No orgId error
  if (!orgId) {
    return (
      <div className="min-h-screen font-nunito pb-20 bg-gray-50/30">
        <div className="mx-auto px-4 py-4 max-w-[1600px]">
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
    <div className="min-h-screen font-nunito pb-20 bg-gray-50/30">
      <div className="mx-auto px-4 py-4 max-w-[1600px]">
        
        {/* Filters and Tabs */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 mb-10">
          <div className="flex p-1.5 bg-white border border-gray-100 rounded-[2rem] shadow-sm w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as HistoryType)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                  activeTab === tab.id 
                    ? "bg-[#002B2B] text-white shadow-lg shadow-[#002B2B]/20" 
                    : "text-gray-400 hover:text-[#5BA49F] hover:bg-gray-50"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex gap-4 w-full sm:w-auto">
            <SearchInput 
              placeholder="Search project or serial..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-80"
            />
            <FilterButton onClick={() => {}} />
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 gap-4">
          {displayItems.length > 0 ? (
            displayItems.map((item) => (
              <HistoryCard key={item.id} item={item} type={activeTab} />
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200">
              <HistoryIcon className="mx-auto text-gray-200 mb-4" size={48} />
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                {searchQuery 
                  ? "No records found for this query" 
                  : `No ${activeTab} history found`
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};