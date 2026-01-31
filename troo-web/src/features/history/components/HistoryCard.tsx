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
    <div className="group relative w-full bg-white rounded-[2.5rem] p-7 border border-gray-100 hover:border-primary/30 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden hover:-translate-y-2">
      {/* Visual Status Indicator */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1.5 ${config.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-8">
        {/* Project Image Section - Larger and more prominent */}
        <div className="relative w-full lg:w-56 h-36 rounded-3xl overflow-hidden shrink-0 shadow-inner">
          <img
            src={item.image}
            alt={item.projectName}
            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=600&auto=format&fit=crop";
            }}
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0 w-full lg:border-r border-gray-100 lg:pr-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div
              className={`px-3 py-1.5 rounded-xl flex items-center gap-2 ${config.bgColor} ${config.color}`}
            >
              {config.icon}
              <span className="text-xs font-black uppercase tracking-widest leading-none">
                {config.label}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400 text-xs font-bold">
              <Calendar size={14} className="opacity-60" />
              {item.date}
            </div>
          </div>

          <h3 className="text-xl font-black text-secondary truncate mb-4 tracking-tight leading-tight">
            {item.projectName}
          </h3>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-xl border border-gray-200/50">
              <ShieldCheck size={14} className="text-gray-400" />
              <span className="text-xs font-mono font-bold text-gray-500">
                {item.serialPrefix}
              </span>
            </div>

            {/* Show event description for sell type */}
            {type === "sell" && item.eventDescription && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50/30 rounded-xl border border-blue-100/50 text-xs text-gray-600 font-bold">
                <span>{item.eventDescription}</span>
              </div>
            )}

            {type === "retirement" && item.beneficiary && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50/30 rounded-xl border border-green-100/50 text-xs text-gray-500 font-bold uppercase tracking-tight">
                <User size={14} className="opacity-40 text-green-600" />
                <span>
                  Beneficiary:{" "}
                  <span className="text-gray-700">{item.beneficiary}</span>
                </span>
              </div>
            )}

            {type === "transfer" && item.recipientOrg && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-200/50 text-xs text-gray-500 font-bold uppercase tracking-tight">
                <ArrowLeftRight size={14} className="opacity-40" />
                <span>
                  Recipient:{" "}
                  <span className="text-gray-700">{item.recipientOrg}</span>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Stats & Actions Section */}
        <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-6 lg:min-w-[240px]">
          <div className="flex flex-col items-start lg:items-end">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-secondary leading-none tracking-tighter">
                {type === "retirement" ? "-" : ""}
                {Number(item.quantity).toLocaleString()}
              </span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                tCO2e
              </span>
            </div>
            {/* Only show price if pricePerUnit exists and is greater than 0 */}
            {item.pricePerUnit > 0 && (
              <div className="flex items-center gap-2 mt-2 bg-primary/5 px-2 py-1 rounded-lg">
                <p className="text-xs font-black text-primary">
                  $
                  {(
                    item.totalValue || item.quantity * item.pricePerUnit
                  ).toLocaleString()}
                </p>
                <span className="w-1 h-1 rounded-full bg-primary/30" />
                <span className="text-[10px] text-primary/60 font-bold uppercase">
                  ${item.pricePerUnit}/t
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {type === "retirement" && (
              <button
                onClick={handleDownloadCertificate}
                disabled={isDownloading}
                className="flex items-center gap-3 px-7 py-4 rounded-2xl bg-[#002B2B] text-white hover:bg-secondary font-black text-[11px] uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-secondary/20 disabled:opacity-50 disabled:cursor-not-allowed group/btn"
              >
                {isDownloading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                ) : (
                  <Download
                    size={16}
                    className="group-hover/btn:translate-y-0.5 transition-transform"
                  />
                )}
                <span>
                  {isDownloading ? "Processing..." : "Download Certificate"}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
