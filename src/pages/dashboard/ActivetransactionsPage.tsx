import { ArrowLeft, ArrowLeftRight, Calendar, Building2, ShieldCheck, MoreHorizontal } from 'lucide-react';
import { Link } from '@tanstack/react-router';

const ActiveTransactions = () => {
  // Mock data for internal transfers and movements
  const transactions = [
    {
      id: "TRX-88291",
      project: "Amazonian Rainforest Protection",
      dateInitiated: "Jan 18, 2026",
      amount: 2500,
      unit: "tCO2e",
      recipientOrg: "ECO-VAULT-SOUTH",
      status: "In Progress",
      protocol: "Ledger Validation",
      type: "Transfer"
    },
    {
      id: "TRX-88104",
      project: "Solar Array Expansion - Rajasthan",
      dateInitiated: "Jan 20, 2026",
      amount: 1000,
      unit: "tCO2e",
      recipientOrg: "GLOBAL-RE-PARTNERS",
      status: "Pending Approval",
      protocol: "Internal Audit",
      type: "Transfer"
    }
  ];

  return (
    <div className="w-full font-nunito min-h-screen bg-gray-50/30 pb-12">
      <header className="p-4 pt-6">
        <div className="mx-auto flex items-center justify-between">
          <Link to="/portfolio">
            <button className="flex items-center gap-2 text-gray-400 hover:text-primary transition-all font-bold text-sm cursor-pointer group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1" />
              <span>Back to Portfolio</span>
            </button>
          </Link>
        </div>
      </header>

      <div className='px-6 py-4'>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-[#0F1F1F] tracking-tight flex items-center gap-3">
              Active Transactions
              <span className="bg-primary/10 text-primary text-[10px] py-1 px-3 rounded-full uppercase tracking-widest">
                {transactions.length} Pending
              </span>
            </h2>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
              Live asset transfers requiring validation or movement
            </p>
          </div>
          
          
        </div>

        <div className="space-y-4">
          {transactions.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-[2rem] p-6 border border-gray-100 hover:border-primary/20 hover:shadow-xl transition-all flex flex-col md:flex-row items-center gap-6"
            >
              {/* Transfer Icon */}
              <div className="hidden md:flex w-14 h-14 rounded-2xl bg-primary/5 items-center justify-center text-primary shrink-0">
                <ArrowLeftRight size={24} />
              </div>

              {/* Transaction Context */}
              <div className="flex-1 text-center md:text-left min-w-0">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <span className="text-[10px] font-black text-gray-300 uppercase tracking-tighter">{item.id}</span>
                  <div className="w-1 h-1 rounded-full bg-gray-200" />
                  <span className="flex items-center gap-1 text-[10px] font-black text-[#5BA49F] uppercase">
                    <ShieldCheck size={10} /> {item.protocol}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-[#0F1F1F] truncate group-hover:text-primary transition-colors">
                  {item.project}
                </h3>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-3">
                   <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-lg text-gray-500">
                      <Building2 size={12} className="text-primary" />
                      <span className="text-[10px] font-black uppercase tracking-wider">To: {item.recipientOrg}</span>
                   </div>
                   <div className="flex items-center gap-1.5 text-gray-400">
                      <Calendar size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">{item.dateInitiated}</span>
                   </div>
                </div>
              </div>

              {/* Amount & Status Management */}
              <div className="flex flex-row md:flex-col items-center md:items-end gap-6 md:gap-4 pl-6 md:border-l border-gray-100 min-w-[220px]">
                <div className="text-right">
                    <p className="text-2xl font-black text-[#0F1F1F]">
                      -{item.amount.toLocaleString()}
                      <span className="ml-1 text-[10px] font-medium text-gray-400 uppercase">{item.unit}</span>
                    </p>
                    <p className={`text-[9px] font-black uppercase tracking-[0.2em] mt-1 ${
                      item.status === 'In Progress' ? 'text-amber-500' : 'text-primary'
                    }`}>
                        {item.status}
                    </p>
                </div>
        
                <div className="flex gap-2">
                    <button className="p-3.5 rounded-xl bg-gray-50 text-gray-400 hover:text-secondary transition-all">
                        <MoreHorizontal size={18} />
                    </button>
                    <button className="px-6 py-3.5 rounded-xl bg-[#002B2B] text-white text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-lg shadow-[#002B2B]/10">
                        View Details
                    </button>
                </div>
              </div>
            </div>
          ))}

          {transactions.length === 0 && (
            <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-gray-200">
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No active transactions</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActiveTransactions;