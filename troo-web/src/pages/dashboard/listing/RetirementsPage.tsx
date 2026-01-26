import { ExternalLink, FileText, Calendar, Leaf, CheckCircle2, Lock, ArrowLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';

const RetirementHistory = () => {
  // Mock data for the organization's history
  const retirements = [
    {
      id: "RET-88291",
      project: "Amazonian Rainforest Protection",
      date: "Oct 24, 2025",
      amount: 1250,
      unit: "tCO2e",
      status: "Verified",
      beneficiary: "Acme Corp ESG Fund"
    },
    {
      id: "RET-88240",
      project: "Renewable Wind Farm - Gujarat",
      date: "Aug 12, 2025",
      amount: 450,
      unit: "tCO2e",
      status: "Verified",
      beneficiary: "Acme Corp Operations"
    },
    // Add more items...
  ];

  return (
    <div className="w-full ">
        <header className="p-4 pt-6">
        <div className=" mx-auto flex items-center justify-between">
          <Link to="/my-listings">
            <button className="flex items-center gap-2 text-gray-400 hover:text-primary transition-all font-bold text-sm cursor-pointer group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1" />
              <span>Back to Holdings</span>
            </button>
          </Link>
          <div className="flex items-center gap-1.5 px-4 py-1.5 bg-gray-50 rounded-full border border-gray-100">
            <Lock className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">SSL Secure</span>
          </div>
        </div>
      </header>
      <div className='px-6 py-4'>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-[#0F1F1F] tracking-tight">Impact Ledger</h2>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Registry of retired environmental assets</p>
            </div>
            <button className="text-[10px] font-black uppercase tracking-widest text-primary border-b-2 border-primary/20 hover:border-primary transition-all pb-1">
              Export Report (CSV)
            </button>
          </div>
          <div className="space-y-4">
            {retirements.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white/50 backdrop-blur-md border border-white hover:border-primary/20 hover:bg-white/80 transition-all rounded-4xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                {/* Status Icon */}
                <div className="hidden md:flex w-12 h-12 rounded-2xl bg-primary/5 items-center justify-center text-primary">
                  <Leaf size={20} />
                </div>
                {/* Project Info */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                    <span className="text-[10px] font-black text-primary/50 uppercase tracking-tighter">{item.id}</span>
                    <div className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 uppercase">
                      <CheckCircle2 size={10} /> {item.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0F1F1F] group-hover:text-primary transition-colors">
                    {item.project}
                  </h3>
                  <div className="flex items-center justify-center md:justify-start gap-4 mt-2 text-gray-400">
                     <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span className="text-xs font-medium">{item.date}</span>
                     </div>
                     <div className="flex items-center gap-1">
                        <FileText size={12} />
                        <span className="text-xs font-medium truncate max-w-30">{item.beneficiary}</span>
                     </div>
                  </div>
                </div>
                {/* Amount & Action */}
                <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-1 pl-6 border-l border-gray-100">
                  <p className="text-2xl font-black text-[#0F1F1F]">
                    {item.amount.toLocaleString()}
                    <span className="ml-1 text-[10px] font-medium text-gray-400 uppercase">{item.unit}</span>
                  </p>
          
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition-all group/btn">
                    Certificate
                    <ExternalLink size={12} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
               
              </div>
            ))}
          </div>
      </div>
    </div>
  );
};

export default RetirementHistory;