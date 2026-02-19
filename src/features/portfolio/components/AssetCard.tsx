import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  MapPin,
  TreePine,
  ArrowLeftRight,
  Tag,
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
  isTransferring = false,
}: AssetCardProps) => {
  return (
    <div className="group w-full bg-white rounded-[2rem] md:rounded-[2.5rem] p-4 md:p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Image Section - Fixed aspect ratio helps stability */}
        <div className="w-full lg:w-64 h-48 md:h-52 lg:h-44 rounded-2xl md:rounded-3xl overflow-hidden relative shrink-0">
          <img
            src={holding.image}
            alt={holding.projectName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-[#002B2B] shadow-sm">
            Vintage {holding.vintage}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1 mb-1.5">
                <MapPin size={12} className="shrink-0" /> 
                <span className="truncate">{holding.location}</span>
              </p>
              <h3 className="text-xl md:text-2xl font-black text-[#002B2B] leading-tight group-hover:text-[#5BA49F] transition-colors break-words">
                {holding.projectName}
              </h3>
            </div>
            
            <div className="sm:text-right shrink-0">
              <p className="text-2xl md:text-3xl font-black text-[#5BA49F] leading-none">
                {holding.quantity.toLocaleString()}
              </p>
              <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">
                Available tCO2e
              </p>
            </div>
          </div>

          {/* Action Row - Improved for Tablet/Desktop */}
          <div className="mt-6 pt-4 border-t border-gray-50 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
            <Link 
              to="/portfolio/project/$holdingId" 
              params={{ holdingId: holding.id }}
              className="text-[8px] font-black uppercase tracking-[0.15em] text-gray-400 hover:text-[#002B2B] transition-colors flex items-center gap-2 shrink-0"
            >
              Project Details <ArrowUpRight size={14} />
            </Link>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full xl:w-auto">
              <Link
                to="/portfolio/transfer/$projectId"
                params={{ projectId: holding.projectId }}
                className="w-full"
              >
                <Button
                  variant="outline"
                  onClick={() => onTransfer?.(holding.id)}
                  isLoading={isTransferring}
                  className="w-full !px-4 !py-2 text-xs"
                >
                  <ArrowLeftRight size={14} />
                  <span>Transfer</span>
                </Button>
              </Link>

              <Link
                to="/portfolio/list/$projectId"
                params={{ projectId: holding.projectId }}
                className="w-full"
              >
                <Button
                  variant="secondary"
                  onClick={() => onList?.(holding.id)}
                  isLoading={isListing}
                  className="w-full !px-4 !py-2 text-xs"
                >
                  <Tag size={14} />
                  <span>List </span>
                </Button>
              </Link>

              <Link
                to="/portfolio/retire/$projectId"
                params={{ projectId: holding.projectId }}
                className="w-full"
              >
                <Button
                  variant="primary"
                  onClick={() => onRetire?.(holding.id)}
                  isLoading={isRetiring}
                  className="w-full !px-4 !py-2 text-xs"
                >
                  <TreePine size={14} />
                  <span>Retire</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};