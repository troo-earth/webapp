import { ShieldCheck, Globe, Lock, Sparkles, FileText } from "lucide-react";

export const LoginDecorative: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:col-span-5 flex-col justify-center h-full max-h-200 pl-2">
      <div className="relative w-full max-w-120 grow max-h-100 select-none flex flex-col gap-6">
        
        <div className="relative z-20 w-[95%] bg-[#0F1F1F] border border-white/10 rounded-3xl shadow-2xl p-7 transition-all hover:scale-[1.02] duration-500">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-[#A3E635] animate-ping" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Active Session</p>
              </div>
              <h4 className="text-2xl font-black text-white tracking-tight">Portfolio Alpha</h4>
            </div>

            <div className="flex flex-col items-end">
              <div className="flex -space-x-2 mb-1">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    className="w-7 h-7 rounded-full border-2 border-[#0F1F1F] grayscale hover:grayscale-0 transition-all cursor-pointer"
                    alt="user"
                  />
                ))}
              </div>
              <p className="text-[9px] font-bold text-white/30 uppercase tracking-tighter">4 Contributors Online</p>
            </div>
          </div>

          <div className="space-y-4 mb-4">
            <div className="flex justify-between items-end border-b border-white/5 pb-3">
              <span className="text-xs text-white/60 font-medium">Verified Offsets</span>
              <span className="text-lg font-black text-white">12,402 <span className="text-[10px] text-[#A3E635]">tCO₂e</span></span>
            </div>
            <div className="flex justify-between items-end border-b border-white/5 pb-3">
              <span className="text-xs text-white/60 font-medium">Compliance Score</span>
              <span className="text-lg font-black text-white">98%</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-bold text-[#A3E635] uppercase tracking-wider">
            <ShieldCheck size={14} />
            <span>Bank-Grade Verification</span>
          </div>
        </div>

        <div className="relative z-10 w-[85%] self-end -mt-10 bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-6 shadow-[0_20px_40px_rgba(0,116,115,0.1)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-primary to-[#0F1F1F] flex items-center justify-center text-white shadow-lg">
              <Sparkles size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs font-black text-[#0F1F1F]">ESG Reporting Engine</p>
                <span className="bg-[#A3E635] text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter">BETA</span>
              </div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Launching Q1 2026</p>
            </div>
          </div>

          <div className="space-y-2 mb-2">
            <div className="flex items-center justify-between text-[10px] font-bold text-[#0F1F1F]/60">
              <span>Automated BRSR & CSRD Filing</span>
              <FileText size={12} />
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="w-[75%] h-full bg-primary rounded-full" />
            </div>
          </div>
        </div>

        <div className="absolute -right-12 -top-12 bg-white shadow-xl border border-white/50 p-4 rounded-2xl flex items-center gap-3 animate-bounce-slow z-30">
          <div className="bg-blue-50 p-2 rounded-xl text-blue-600">
            <Lock size={18} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase leading-tight">Identity</p>
            <p className="text-xs font-black text-[#0F1F1F]">Protected</p>
          </div>
        </div>

        <div className="absolute -right-8 bottom-16 bg-white/80 backdrop-blur-md p-3 pr-6 rounded-2xl shadow-lg border border-white/60 animate-bounce-delayed z-30">
          <div className="flex items-center gap-3">
            <div className="bg-teal-50 text-teal-600 p-2 rounded-lg">
              <Globe size={18} />
            </div>
            <div>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Nodes</p>
              <p className="text-xs font-black text-[#0F1F1F]">Global Edge</p>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .animate-bounce-slow {
            animation: bounce-slow 4s infinite;
        }
        .animate-bounce-delayed {
            animation: bounce-slow 4.5s infinite;
            animation-delay: 1.2s;
        }
        @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};