import { Leaf, Wallet } from "lucide-react";

export const PortfolioSummary = ({ 
  total = 0, 
  activeCount = 0
}: { 
  total?: number; 
  activeCount?: number;
}) => {
  return (
    <div className="bg-white rounded-[2.5rem] p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Net Carbon Position */}
        <div className="flex items-center gap-4 pb-6 md:pb-0 border-b md:border-b-0 md:border-r border-gray-100">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Wallet size={24} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Net Carbon Position</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-black text-gray-900 leading-none">{(total || 0).toLocaleString()}</p>
              <span className="text-sm font-medium text-gray-400">tonnes</span>
            </div>
          </div>
        </div>

        {/* Active Credits */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Leaf size={24} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Active Credits</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-black text-gray-900 leading-none">{(activeCount || 0).toLocaleString()}</p>
              <span className="text-sm font-medium text-gray-400">tonnes</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};