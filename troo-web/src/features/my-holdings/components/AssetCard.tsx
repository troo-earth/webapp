import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin, TreePine} from "lucide-react";
import type { Holding } from "../types/holdingTypes";
import { Button } from "@/components/ui/buttons/Button";

export const AssetCard = ({ holding, onRetire }: { holding: Holding, onRetire: (id: string) => void }) => {

  return (
    <div className="group w-full bg-white rounded-4xl p-3 shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-56 h-48  rounded-3xl overflow-hidden relative shrink-0">
          <img src={holding.image} alt={holding.projectName} className="w-full h-full object-cover" />
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-800 shadow-sm">
            Vintage {holding.vintage}
          </div>
        </div>

        <div className="flex-1 py-3 pr-4 flex flex-col">
            <div className="flex justify-between items-start mb-2">
                <div>
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                        <MapPin size={12} /> {holding.location}
                    </p>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors">{holding.projectName}</h3>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-extrabold text-primary">{holding.quantity}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Available</p>
                </div>
            </div>

            <div className="mt-auto pt-4 flex items-end justify-end gap-4">


                <div className="flex gap-2 w-full sm:w-auto cursor-pointer">
                    <Link 
                        to="/$source/project/$projectId" 
                        params={{source: 'holdings', projectId: holding.projectId}}
                        className="p-3 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 border-b transition-colors"
                    >
                        <ArrowUpRight size={20} />
                    </Link>
                    <Link to="/my-holdings/retire/$projectId" params={{ projectId: holding.id }}>
                        <Button
                            onClick={() => onRetire(holding.id)}
                            className="flex-1 sm:flex-none cursor-pointer bg-primary text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all"
                        >
                            <TreePine size={16} className="text-accent" />
                            Retire
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
};
