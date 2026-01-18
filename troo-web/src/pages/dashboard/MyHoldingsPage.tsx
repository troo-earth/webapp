import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { 
  Leaf, 
  ArrowUpRight, 
  Medal
} from "lucide-react";

import { PortfolioSummary } from "@/features/my-holdings/components/PortfolioSummary";
import { AssetCard } from "@/features/my-holdings/components/AssetCard";
import { RetirementTimelineItem } from "@/features/my-holdings/components/RetirementTimelineItem";
import type { Holding } from "@/features/my-holdings/types/holdingTypes";
// import { getMyHoldingsApi } from "@/features/my-holdings/api/myHoldingsApi";



const getMyHoldingsApi = async (): Promise<Holding[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return [
    {
      id: "h1",
      projectId: "p123",
      projectName: "Amazonian Rainforest Protection",
      location: "Pará, Brazil",
      image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=600&auto=format&fit=crop",
      quantity: 150,
      vintage: "2023",
      serialPrefix: "VCU-192-BRA",
      status: "active",
      pricePaid: 15.50,
      impactFact: "Equivalent to 30 passenger vehicles taken off the road for a year."
    },
    {
      id: "h2",
      projectId: "p456",
      projectName: "Gujarat Wind Power Project",
      location: "Gujarat, India",
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=600&auto=format&fit=crop",
      quantity: 50,
      vintage: "2022",
      serialPrefix: "GS-402-IND",
      status: "active",
      pricePaid: 12.00,
      impactFact: "Provides clean energy for 12 rural households for a month."
    },
    {
      id: "h3",
      projectId: "p789",
      projectName: "Sumatra Blue Carbon",
      location: "Sumatra, Indonesia",
      image: "https://images.unsplash.com/photo-1583373834259-46cc92173cb7?q=80&w=600&auto=format&fit=crop",
      quantity: 1000,
      vintage: "2021",
      serialPrefix: "VCS-991-IDN",
      status: "retired",
      retirementDate: "2024-02-10",
      pricePaid: 22.00,
      impactFact: "Restored 2 hectares of critical mangrove ecosystem."
    },
    {
        id: "h4",
        projectId: "p999",
        projectName: "Clean Cookstoves Africa",
        location: "Kenya",
        image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?q=80&w=600&auto=format&fit=crop",
        quantity: 250,
        vintage: "2022",
        serialPrefix: "GS-101-KEN",
        status: "retired",
        retirementDate: "2023-11-05",
        pricePaid: 9.50,
        impactFact: "Improved air quality for 50 families."
      },
  ];
};


export const MyHoldingsPage = () => {
  const queryClient = useQueryClient();

//   const { data: holdings, isLoading } = useQuery({
//     queryKey: ['my-holdings'],
//     queryFn: () => getMyHoldingsApi("9114a32f-5b48-4832-9472-c6cda2aeff6c"),
//   });

  const { data: holdings } = useQuery({
    queryKey: ['my-holdings'],
    queryFn: getMyHoldingsApi,
  });

  const retireMutation = useMutation({
    mutationFn: async (id: string) => {
      console.log("Retiring:", id);
      await new Promise(r => setTimeout(r, 500));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-holdings'] });
      alert("Credits retired! Certificate generated.");
    }
  });

  const activeHoldings = useMemo(() => holdings?.filter(h => h.status === 'active') || [], [holdings]);
  const retiredHoldings = useMemo(() => holdings?.filter(h => h.status === 'retired') || [], [holdings]);
  
  const stats = useMemo(() => ({
    total: holdings?.reduce((acc, curr) => acc + curr.quantity, 0) || 0,
    active: activeHoldings.reduce((acc, curr) => acc + curr.quantity, 0),
    retired: retiredHoldings.reduce((acc, curr) => acc + curr.quantity, 0),
  }), [holdings, activeHoldings, retiredHoldings]);


  return (
    <div className="min-h-screen font-nunito pb-24">
      <div className="mx-auto px-4 pt-6 ">
        
        <div className="mb-10">
            <PortfolioSummary total={stats.total} activeCount={stats.active} retiredCount={stats.retired} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            <div className="lg:col-span-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
                        Active Assets
                        <span className="bg-gray-200 text-gray-600 text-xs py-0.5 px-2 rounded-full">{activeHoldings.length}</span>
                    </h2>
                    <Link to="/explore" className="text-sm font-bold text-primary hover:text-secondary flex items-center gap-1">
                        Buy Credits <ArrowUpRight size={16} />
                    </Link>
                </div>
                
                <div className="space-y-6">
                    {activeHoldings.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-4xl border border-dashed border-gray-200">
                            <Leaf className="mx-auto text-gray-300 mb-3" size={48} />
                            <p className="text-gray-400 font-medium">Your active portfolio is empty.</p>
                        </div>
                    ) : (
                        activeHoldings.map(h => (
                            <AssetCard key={h.id} holding={h} onRetire={(id) => retireMutation.mutate(id)} />
                        ))
                    )}
                </div>
            </div>

            <div className="lg:col-span-4">
                <div className="bg-white rounded-4xl p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100 sticky top-6">
                    <div className="flex items-center gap-2 mb-6 border-b border-gray-50 pb-4">
                        <div className="bg-yellow-50 p-2 rounded-lg">
                            <Medal size={20} className="text-accent" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Impact Legacy</h2>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Verified Retirements</p>
                        </div>
                    </div>

                    <div className="max-h-150 overflow-y-auto pr-2 custom-scrollbar">
                        {retiredHoldings.length === 0 ? (
                             <p className="text-sm text-gray-400 text-center py-8">No retirements recorded yet.</p>
                        ) : (
                            retiredHoldings.map((h, index) => (
                                <RetirementTimelineItem 
                                    key={h.id} 
                                    holding={h} 
                                    isLast={index === retiredHoldings.length - 1} 
                                />
                            ))
                        )}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-50 text-center">
                        <Link to="/my-holdings/retirements" className="text-xs font-bold text-gray-400 hover:text-primary transition-colors">
                            View All Retirements
                        </Link>
                    </div>
                </div>
            </div>

        </div>

      </div>
    </div>
  );
};