import { Calendar, CheckCircle2 } from "lucide-react";
import type { Holding } from "../types/holdingTypes";

export const RetirementTimelineItem = ({ holding, isLast }: { holding: Holding, isLast: boolean }) => {
  return (
    <div className="relative pl-8 pb-8">
        {/* Timeline Line */}
        {!isLast && (
            <div className="absolute left-[11px] top-3 bottom-0 w-[2px] bg-gray-100" />
        )}
        
        {/* Timeline Dot */}
        <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-green-100 border-2 border-white shadow-sm flex items-center justify-center z-10">
            <CheckCircle2 size={12} className="text-green-600" />
        </div>

        {/* Content Card */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group cursor-default">
            <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                    <Calendar size={10} /> {new Date(holding.retirementDate!).toLocaleDateString()}
                </span>
                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px] font-bold">
                    -{holding.quantity} tCO2
                </span>
            </div>
            <h4 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-[#007473] transition-colors">{holding.projectName}</h4>
            <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-mono text-gray-400 border border-gray-100 px-1.5 rounded bg-gray-50">
                    Cert #{holding.serialPrefix.split('-')[1]}
                </span>
                <button className="text-[10px] font-bold text-[#007473] hover:underline ml-auto">
                    Download Cert
                </button>
            </div>
        </div>
    </div>
  );
}