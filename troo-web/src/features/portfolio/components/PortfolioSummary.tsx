import { Leaf, Award, Wallet } from "lucide-react";

export const PortfolioSummary = ({ total, activeCount, retiredCount }: { total: number, activeCount: number, retiredCount: number }) => {
  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Net Carbon Position */}
        <div className="md:col-span-1 flex items-center gap-4 pb-6 md:pb-0 border-b md:border-b-0 md:border-r border-gray-100">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Wallet size={28} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Net Carbon Position</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-black text-secondary leading-none">{total.toLocaleString()}</p>
              <span className="text-sm font-medium text-gray-400">tonnes</span>
            </div>
          </div>
        </div>

        {/* Active Credits */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Leaf size={20} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Credits</p>
            <div className="flex items-baseline gap-1.5">
              <p className="text-xl font-black text-secondary leading-none mt-0.5">{activeCount.toLocaleString()}</p>
              <span className="text-xs font-medium text-gray-400">tonnes</span>
            </div>
          </div>
        </div>

        {/* Retired Credits */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Award size={20} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Retired Credits</p>
            <div className="flex items-baseline gap-1.5">
              <p className="text-xl font-black text-secondary leading-none mt-0.5">{retiredCount.toLocaleString()}</p>
              <span className="text-xs font-medium text-gray-400">tonnes</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};