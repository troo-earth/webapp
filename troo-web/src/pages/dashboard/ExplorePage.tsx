import { Globe, Leaf, ShieldCheck } from "lucide-react";
import { ProjectCard } from "../../entities/projects/components/ProjectCard";
import { useMemo, useState } from "react";
import { FilterButton } from "@/components/ui/buttons/FilterButton";
import { SearchInput } from "@/components/ui/input/SearchInputfield";
import { useQuery } from "@tanstack/react-query";
import { getAllProjectsApi } from "../../entities/projects/api/projectApi";
import LoadingScreen from "@/components/global/Loading";
import { FACT_CARDS } from "../../features/explore/constants/data";
import { Link } from "@tanstack/react-router";
import { transformProject } from "@/entities/projects/utils/helpers";
import type { Project } from "@/entities/projects/types/projectTypes";
import type { DisplayItem, FactCardType } from "@/features/explore/types/exploreTypes";
import { StatItem } from "@/features/explore/components/StatItem";
import { FactCard } from "@/features/explore/components/FactCard";


export const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: projectsData, isLoading, isError } = useQuery({
    queryKey: ['projects'],
    queryFn: getAllProjectsApi,
    staleTime: 30 * 60 * 1000,
  });

  const handleFilterClick = () => {
    console.log("Open filter modal");
  };

  const displayItems = useMemo(() => {
    if (!projectsData) return [];
    
    let projects: Project[] = projectsData.map(transformProject);
    

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      projects = projects.filter((project) => {
        return (
          project.name.toLowerCase().includes(query) ||
          project.type.toLowerCase().includes(query) ||
          project.country.toLowerCase().includes(query) ||
          project.state.toLowerCase().includes(query)
        );
      });
    }
    

    const projectCount = projects.length;
    if (projectCount === 0) return [];
    
    const factsToInject = Math.min(FACT_CARDS.length, Math.max(1, Math.floor(projectCount / 3)));
    
    const factsToUse = FACT_CARDS.slice(0, factsToInject);

    const positions: number[] = [];
    const step = Math.floor(projectCount / (factsToInject + 1));
    
    for (let i = 0; i < factsToInject; i++) {
      const basePosition = step * (i + 1);
      const variation = (projectCount % (i + 2)) % 3;
      const position = Math.min(basePosition + variation, projectCount - 1);
      positions.push(Math.max(2, position)); 
    }
    
    positions.sort((a, b) => b - a);
    
    const items: DisplayItem[] = [...projects];
    
    positions.forEach((position, index) => {
      items.splice(position, 0, factsToUse[index]);
    });
    
    return items;
  }, [projectsData, searchQuery]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-bold mb-2">Failed to load projects</p>
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
                <StatItem icon={Globe} label="Active Projects" value="142" />
                <div className="hidden md:block w-px h-10 bg-gray-100" />
                <StatItem icon={ShieldCheck} label="Verified Registries" value="Verra, Gold Std" />
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
              Each project is verified by leading standards to ensure <span className="text-primary font-bold">real, measurable impact.</span>
            </p>
          </div>

            <div className="flex gap-4 w-full sm:w-auto">
                <SearchInput 
                    placeholder="Search projects..." 
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
                    const project = item as Project;
                    return (
                        <Link to="/$source/project/$projectId" params={{ source: 'explore', projectId: project.projectid }} search={{price: project.price}}>
                          <div key={project.id} className="h-full" >
                              <ProjectCard project={project} />
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