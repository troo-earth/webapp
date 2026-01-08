import React from 'react';
import { LoginModal } from "./LoginModal";
import { ShieldCheck, Activity, Globe, Lock, BarChart3, Users, Sparkles, FileText } from "lucide-react";
import { Logo } from '../../../../components/global/Logo';

export const LoginPage = () => {
  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#FDFDFD] font-nunito">
      
      {/* --- HEADER --- */}
      <header className="absolute top-0 left-0 w-full py-10 z-50 flex justify-center">
        <div className="w-full max-w-[1400px] px-6 md:px-12 flex justify-between items-center">
          <Logo />
        </div>
      </header>

      {/* --- ATMOSPHERIC LAYER --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#007473]/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-[#FFB71B]/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center flex-grow pt-20 pb-16">
        
        {/* LEFT COLUMN: Technical Dashboard with Human Element */}
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-center h-full max-h-[800px] pl-2">
          
          <div className="relative w-full max-w-[480px] flex-grow max-h-[400px] select-none flex flex-col gap-6">
             
             {/* 1. PORTFOLIO CARD (The "Old" Base but with Users) */}
             <div className="relative z-20 w-[95%] bg-[#0F1F1F] border border-white/10 rounded-3xl shadow-2xl p-7 transition-all hover:scale-[1.02] duration-500">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 rounded-full bg-[#A3E635] animate-ping" />
                            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Active Session</p>
                        </div>
                        <h4 className="text-2xl font-black text-white tracking-tight">Portfolio Alpha</h4>
                    </div>
                    
                    {/* NEW: Human Element (The Team) */}
                    <div className="flex flex-col items-end">
                        <div className="flex -space-x-2 mb-1">
                            {[1,2,3,4].map((i) => (
                                <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-7 h-7 rounded-full border-2 border-[#0F1F1F] grayscale hover:grayscale-0 transition-all cursor-pointer" alt="user" />
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

             {/* 2. UPCOMING TOOLING CARD (ESG Reporting Preview) */}
             <div className="relative z-10 w-[85%] self-end -mt-10 bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-6 shadow-[0_20px_40px_rgba(0,116,115,0.1)]">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#007473] to-[#0F1F1F] flex items-center justify-center text-white shadow-lg">
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
                      <div className="w-[75%] h-full bg-[#007473] rounded-full" />
                   </div>
                </div>
             </div>

             {/* 3. SECURITY TAG */}
             <div className="absolute -right-12 -top-12 bg-white shadow-xl border border-white/50 p-4 rounded-2xl flex items-center gap-3 animate-bounce-slow z-30">
                 <div className="bg-blue-50 p-2 rounded-xl text-blue-600">
                     <Lock size={18} />
                 </div>
                 <div>
                     <p className="text-[10px] font-bold text-gray-400 uppercase leading-tight">Identity</p>
                     <p className="text-xs font-black text-[#0F1F1F]">Protected</p>
                 </div>
             </div>

             {/* 4. GLOBAL ACCESS */}
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
        </div>

        {/* RIGHT COLUMN: Login Form */}
        <div className="col-span-1 lg:col-span-7 flex justify-center lg:justify-end h-full items-center">
          <LoginModal />
        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="absolute bottom-0 left-0 w-full py-8 z-50 flex justify-center">
        <div className="w-full max-w-[1400px] px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-gray-400 tracking-widest uppercase">
            <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-green-500" />
                <span>Impact Intelligence v2.0</span>
            </div>
            <div className="flex items-center gap-6 mt-4 md:md-0">
                <a href="#" className="hover:text-[#007473] transition-colors">Documentation</a>
                <a href="#" className="hover:text-[#007473] transition-colors">Safety Hub</a>
                <a href="#" className="hover:text-[#007473] transition-colors">Terms</a>
            </div>
        </div>
      </footer>

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