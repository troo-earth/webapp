import { Link } from "@tanstack/react-router";
import { 
  ArrowUpRight, 
  MapPin, 
  TreePine, 
  ArrowLeftRight, 
  Tag 
} from "lucide-react";
import type { Portfolio } from "../types/portfolioTypes";
import { Button } from "@/components/ui/buttons/Button";

interface AssetCardProps {
  holding: Portfolio;
  onRetire?: (id: string) => void;
  onTransfer?: (id: string) => void;
  onList?: (id: string) => void;
  isRetiring?: boolean;
  isListing?: boolean;
  isTransferring?: boolean;
}

export const AssetCard = ({ 
  holding, 
  onRetire, 
  onTransfer, 
  onList,
  isRetiring = false,
  isListing = false,
  isTransferring = false
}: AssetCardProps) => {
  return (
    <div className="group w-full bg-white rounded-4xl p-4 shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image Section */}
        <div className="w-full md:w-52 h-44 rounded-3xl overflow-hidden relative shrink-0">
          <img src={holding.image} alt={holding.projectName} className="w-full h-full object-cover" />
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-[#002B2B] shadow-sm">
            Vintage {holding.vintage}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col justify-between py-1">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1 mb-1.5">
                <MapPin size={12} /> {holding.location}
              </p>
              <h3 className="text-xl font-black text-[#002B2B] leading-tight group-hover:text-[#5BA49F] transition-colors">
                {holding.projectName}
              </h3>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-[#5BA49F] leading-none">
                {holding.quantity.toLocaleString()}
              </p>
              <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">Available tCO2e</p>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-4 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link 
              to="/$source/project/$projectId" 
              params={{source: 'portfolio', projectId: holding.projectId}}
              className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 hover:text-[#002B2B] transition-colors flex items-center gap-2"
            >
              Project Details <ArrowUpRight size={14} />
            </Link>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* Transfer - Use projectId instead of id */}
              <Link 
                to="/portfolio/transfer/$projectId" 
                params={{ projectId: holding.projectId }}
                className="flex-1 sm:flex-none"
              >
                <Button
                  variant="outline"
                  onClick={() => onTransfer?.(holding.id)}
                  isLoading={isTransferring}
                  className="w-full !px-5 !py-2"
                >
                  <ArrowLeftRight size={14} />
                  Transfer
                </Button>
              </Link>

              {/* List - Use projectId instead of id */}
              <Link 
                to="/portfolio/list/$projectId" 
                params={{ projectId: holding.projectId }}
                className="flex-1 sm:flex-none"
              >
                <Button
                  variant="secondary"
                  onClick={() => onList?.(holding.id)}
                  isLoading={isListing}
                  className="w-full !px-5 !py-2"
                >
                  <Tag size={14} />
                  List for sale
                </Button>
              </Link>

              {/* Retire - Use projectId instead of id */}
              <Link 
                to="/portfolio/retire/$projectId" 
                params={{ projectId: holding.projectId }}
                className="flex-1 sm:flex-none"
              >
                <Button
                  variant="primary"
                  onClick={() => onRetire?.(holding.id)}
                  isLoading={isRetiring}
                  className="w-full !px-6 !py-2"
                >
                  <TreePine size={14} />
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