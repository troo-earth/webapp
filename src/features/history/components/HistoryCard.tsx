import {
  Calendar,
  Award,
  Tag,
  ArrowLeftRight,
  Download,
  ShieldCheck,
  User,
} from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { HistoryType } from "../types/historyTypes";
import { getCertificateApi } from "../api/getCertificateApi";
import { generateCertificatePdf } from "../utils/generateCertificatePdf";
import logoSvg from "@/assets/svg/logo/logo.svg";

interface HistoryCardProps {
  item: any;
  type: HistoryType;
}

export const HistoryCard = ({ item, type }: HistoryCardProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadCertificateMutation = useMutation({
    mutationFn: getCertificateApi,
    onSuccess: async (data) => {
      try {
        await generateCertificatePdf(
          {
            certificate_number: data.certificate_number,
            beneficiary: data.beneficiary,
            amount: data.amount,
            project_name: item.projectName,
            retired_at: data.retired_at,
            purpose: data.purpose || "",
          },
          logoSvg,
        );
        toast.success("Certificate downloaded successfully!");
      } catch (error) {
        toast.error("Failed to generate certificate PDF");
      } finally {
        setIsDownloading(false);
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to download certificate");
      setIsDownloading(false);
    },
  });

  const handleDownloadCertificate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDownloading(true);
    downloadCertificateMutation.mutate(item.id);
  };

  const config = {
    retirement: {
      icon: <Award size={18} />,
      color: "text-green-900/80",
      bgColor: "bg-green-50/50",
      label: "Retired Asset",
      accent: "bg-green-900/70",
    },
    sell: {
      icon: <Tag size={18} />,
      color: "text-[#5BA49F]",
      bgColor: "bg-[#5BA49F]/10",
      label: item.eventType
        ? item.eventType === "CREATED"
          ? "Listing Created"
          : item.eventType === "CANCELLED"
            ? "Listing Cancelled"
            : item.eventType === "UPDATED"
              ? "Listing Updated"
              : item.eventType === "PARTIALLY_FILLED"
                ? "Partially Sold"
                : "Market Listing"
        : item.status === "closed"
          ? "Finalized Sale"
          : "Market Listing",
      accent: "bg-[#5BA49F]",
    },
    transfer: {
      icon: <ArrowLeftRight size={18} />,
      color: "text-[#002B2B]",
      bgColor: "bg-slate-100",
      label: "Transferred",
      accent: "bg-[#002B2B]",
    },
  }[type];

  return (
    <div className="group relative w-full bg-white rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-7 border border-gray-100 hover:border-primary/30 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden hover:-translate-y-1 
      /* FIXED HEIGHT FOR DESKTOP/TABLET */
      xl:h-64 xl:min-h-[256px]">
      
      {/* Visual Status Indicator */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${config.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-6 xl:gap-8 h-full">
        
        {/* Project Image Section - Fixed size on Desktop */}
        <div className="relative w-full xl:w-56 xl:h-full rounded-2xl md:rounded-3xl overflow-hidden shrink-0 shadow-inner h-40">
          <img
            src={item.image}
            alt={item.projectName}
            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=600&auto=format&fit=crop";
            }}
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        {/* Content Section - Flex grow to fill space */}
        <div className="flex-1 min-w-0 flex flex-col justify-center xl:border-r border-gray-100 xl:pr-8 py-2">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <div className={`px-3 py-1.5 rounded-xl flex items-center gap-2 ${config.bgColor} ${config.color} shrink-0`}>
              {config.icon}
              <span className="text-[10px] font-black uppercase tracking-widest leading-none">
                {config.label}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-bold">
              <Calendar size={12} className="opacity-60" />
              {item.date}
            </div>
          </div>

          <h3 className="text-lg md:text-xl font-black text-secondary mb-3 tracking-tight leading-tight line-clamp-2 xl:line-clamp-1">
            {item.projectName}
          </h3>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 px-2.5 py-1 bg-gray-50 rounded-lg border border-gray-200/50">
              <ShieldCheck size={12} className="text-gray-400" />
              <span className="text-[10px] font-mono font-bold text-gray-500 truncate max-w-[120px]">
                {item.serialPrefix}
              </span>
            </div>

            {type === "sell" && item.eventDescription && (
              <div className="flex items-center gap-2 px-2.5 py-1 bg-blue-50/30 rounded-lg border border-blue-100/50 text-[10px] text-gray-600 font-bold">
                <span className="truncate max-w-[150px]">{item.eventDescription}</span>
              </div>
            )}

            {type === "retirement" && item.beneficiary && (
              <div className="flex items-center gap-2 px-2.5 py-1 bg-green-50/30 rounded-lg border border-green-100/50 text-[10px] text-gray-500 font-bold uppercase tracking-tight">
                <User size={12} className="opacity-40 text-green-600 shrink-0" />
                <span className="truncate max-w-[150px]">
                  Beneficiary: <span className="text-gray-700">{item.beneficiary}</span>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Stats & Actions Section - Fixed width to prevent jumping */}
        <div className="flex flex-row xl:flex-col items-center xl:items-end justify-between xl:justify-center gap-4 xl:min-w-[220px] shrink-0">
          <div className="flex flex-col items-start xl:items-end">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl md:text-3xl font-black text-secondary leading-none tracking-tighter">
                {type === "retirement" ? "-" : ""}
                {Number(item.quantity).toLocaleString()}
              </span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                tCO2e
              </span>
            </div>
            
            {item.pricePerUnit > 0 && (
              <div className="flex items-center gap-2 mt-1.5 bg-primary/5 px-2 py-1 rounded-lg">
                <p className="text-[11px] font-black text-[#5BA49F]">
                  ${(item.totalValue || item.quantity * item.pricePerUnit).toLocaleString()}
                </p>
                <span className="text-[9px] text-[#5BA49F]/60 font-bold uppercase">
                  ${item.pricePerUnit}/t
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto xl:w-full">
            {type === "retirement" && (
              <button
                onClick={handleDownloadCertificate}
                disabled={isDownloading}
                className="w-full xl:w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl bg-[#002B2B] text-white hover:bg-secondary font-black text-[10px] uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-secondary/20 disabled:opacity-50 group/btn shrink-0"
              >
                {isDownloading ? (
                  <div className="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent" />
                ) : (
                  <Download size={14} className="group-hover/btn:translate-y-0.5 transition-transform" />
                )}
                <span className="whitespace-nowrap">
                  {isDownloading ? "..." : "Certificate"}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};