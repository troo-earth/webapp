import { ArrowLeftRight } from "lucide-react";
// New Internal Sub-component for Transfer Sidebar
export const TransferSidebarItem = ({ transfer, isLast }: { transfer: any, isLast: boolean }) => (
  <div className="relative pl-8 pb-8">
      {!isLast && <div className="absolute left-[11px] top-3 bottom-0 w-[2px] bg-gray-50" />}
      <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary/10 border-2 border-white shadow-sm flex items-center justify-center z-10">
          <ArrowLeftRight size={12} className="text-primary" />
      </div>
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-default">
          <div className="flex justify-between items-start mb-2">
              <span className="text-[9px] font-black text-primary uppercase tracking-widest">In Transit</span>
              <span className="text-[9px] font-bold text-gray-400">ID: {transfer.id.split('-')[1]}</span>
          </div>
          <h4 className="font-bold text-gray-900 text-sm mb-1 truncate">{transfer.project}</h4>
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter italic">To: {transfer.recipientOrg}</p>
      </div>
  </div>
);
