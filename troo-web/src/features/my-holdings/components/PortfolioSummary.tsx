import BgGradient from "@/components/ui/global/BgGradient";
import { Leaf, Trophy } from "lucide-react";

export const PortfolioSummary = ({ total, activeCount, retiredCount }: { total: number, activeCount: number, retiredCount: number }) => {
  return (
    <div className="relative w-full overflow-hidden bg-primary-gradient rounded-4xl text-white p-4 md:p-4 ">
      <BgGradient/>
      <div className="absolute top-0 right-0 w-125 h-125 bg-primary/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10 items-end">
        <div className="md:col-span-1 p-4">
          <p className="text-[#80b9b9] text-xs font-bold tracking-widest mb-3">Net Carbon Position</p>
          <div className="flex items-baseline gap-2">
            <h1 className="text-4xl font-extrabold tracking-tight">{total.toLocaleString()}</h1>
            <span className="text-xl text-[#80b9b9] font-medium">tonnes</span>
          </div>
        </div>

        <div className="md:col-span-2 flex flex-row gap-4 md:justify-end">
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md flex-1 md:max-w-50 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                    <Leaf size={16} className="text-green-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-300">Active</span>
                </div>
                <p className="text-3xl font-bold">{activeCount} <span className="text-base text-[#80b9b9] font-medium">tonnes</span></p>
            </div>
            
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md flex-1 md:max-w-50 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                    <Trophy size={16} className="text-yellow-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-300">Retired</span>
                </div>
                <p className="text-3xl font-bold">{retiredCount} <span className="text-base text-[#80b9b9] font-medium">tonnes</span></p>
            </div>
        </div>
      </div>
    </div>
  );
};