import React from 'react';
import { RegisterModal } from "./RegisterModal";
import { TrendingUp, Leaf, CheckCircle2, FileCheck, Lock, Zap, Hash, Globe } from "lucide-react";
import  logo  from "../../../../../src/assets/svg/logo/logo.svg"

// Logo Component
export const Logo = () => (
  <img 
    src={logo} 
    alt="Troo.earth" 
    className="h-8 w-auto object-contain" 
  />
);

export const RegisterPage = () => {
  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#FDFDFD] font-nunito">
      
      {/* --- HEADER --- */}
      {/* Aligned exactly with main content using max-w-[1400px] and px-6 md:px-12 */}
      <header className="absolute top-0 left-0 w-full py-10 z-50 flex justify-center">
        <div className="w-full max-w-[1400px] px-6 md:px-12 flex justify-between items-center">
          <Logo />
        </div>
      </header>

      {/* --- ATMOSPHERIC LAYER --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#007473]/5 rounded-full blur-[140px]" />
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-[#A3E635]/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[5%] left-[10%] w-[500px] h-[500px] bg-[#007473]/5 rounded-full blur-[130px]" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* --- MAIN CONTENT GRID --- */}
      {/* Increased gap to gap-16 lg:gap-24 for better separation */}
      <div className="relative z-10 w-full max-w-[1400px] px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center flex-grow pt-20 pb-16">
        
        {/* LEFT COLUMN: Visual Dashboard */}
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-center h-full max-h-[800px] pl-2">
          
          <div className="relative w-full max-w-[480px] flex-grow max-h-[400px] select-none flex flex-col gap-4">
             
             {/* 1. IMPACT CARD */}
             <div className="relative z-20 w-[95%] bg-white/70 backdrop-blur-xl border border-white/80 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,116,115,0.1)] p-6 transition-all hover:scale-[1.02] duration-500">
                <div className="flex justify-between items-start mb-2">
                    <div className="relative">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#007473]/60 mb-1">Net Zero Progress</p>
                        <h4 className="text-3xl font-black text-[#0F1F1F] mb-5">1,240 <span className="text-lg font-bold text-gray-400">tCO₂e</span></h4>
                        
                        {/* BANK-GRADE BADGE */}
                        <div className="inline-flex items-center gap-3 bg-[#0F1F1F] py-2 px-3.5 rounded-xl shadow-xl border border-[#A3E635]/20">
                           <div className="bg-[#A3E635]/10 p-1.5 rounded-lg">
                                <Lock size={14} className="text-[#A3E635]" />
                           </div>
                           <div>
                               <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider leading-none">Security</p>
                               <p className="text-xs font-bold text-white leading-none mt-0.5">Bank-Grade</p>
                           </div>
                        </div>
                    </div>
                    <div className="p-2 bg-[#E0F0F0] rounded-lg text-[#007473]">
                        <Leaf size={20} />
                    </div>
                </div>

                {/* Graph */}
                <div className="flex items-end gap-2 h-16 mb-4 mt-1">
                    <div className="w-full bg-[#007473]/10 rounded-t-sm h-[40%]"></div>
                    <div className="w-full bg-[#007473]/10 rounded-t-sm h-[60%]"></div>
                    <div className="w-full bg-[#007473]/20 rounded-t-sm h-[50%]"></div>
                    <div className="w-full bg-[#007473]/30 rounded-t-sm h-[75%]"></div>
                    <div className="w-full bg-[#007473] rounded-t-sm h-[90%] relative group">
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#0F1F1F] text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            +12%
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center gap-2 text-xs font-bold text-[#007473]">
                    <TrendingUp size={14} />
                    <span>+12.5% vs last month</span>
                </div>
             </div>

             {/* 2. COMPLIANCE LEDGER */}
             <div className="relative z-10 w-[90%] self-end -mt-6 bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl p-5 pt-8 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <FileCheck size={16} className="text-[#007473]" />
                        <span className="text-xs font-black uppercase tracking-widest text-[#0F1F1F]/70">Audit Log</span>
                    </div>
                    <div className="flex items-center gap-1 opacity-50">
                        <Hash size={12} className="text-[#007473]" />
                        <span className="text-[9px] font-mono text-[#007473]">0x82...9A</span>
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-white/50 rounded-lg">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                            <span className="text-[10px] font-bold text-[#0F1F1F]">Vintage 2024 Verified</span>
                        </div>
                        <span className="text-[10px] font-mono text-gray-400">Just now</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-white/50 rounded-lg">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                            <span className="text-[10px] font-bold text-[#0F1F1F]">2023 Eden Wind Farm</span>
                        </div>
                        <span className="text-[10px] font-mono text-gray-400">2h ago</span>
                    </div>
                </div>
             </div>

             {/* 3. STATUS BADGE */}
             <div className="absolute -right-16 -top-16 bg-white shadow-xl border border-white/50 p-3 rounded-xl flex items-center gap-3 animate-bounce-slow z-30">
                 <div className="bg-green-100 p-1.5 rounded-full text-green-600">
                     <CheckCircle2 size={16} />
                 </div>
                 <div>
                     <p className="text-[10px] font-bold text-gray-400 uppercase">Status</p>
                     <p className="text-xs font-black text-[#0F1F1F]">Audit Verified</p>
                 </div>
             </div>

             {/* 4. EXPERIENCE BADGE */}
             <div className="absolute -right-8 top-65 bg-white/80 backdrop-blur-md p-3 pr-5 rounded-2xl shadow-lg border border-white/60 animate-bounce-delayed z-30">
                 <div className="flex items-center gap-3">
                     <div className="bg-amber-100 text-amber-600 p-2 rounded-lg">
                         <Zap size={16} fill="currentColor" />
                     </div>
                     <div>
                         <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Experience</p>
                         <p className="text-xs font-black text-[#0F1F1F]">Zero Friction</p>
                     </div>
                 </div>
             </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Registration Form */}
        <div className="col-span-1 lg:col-span-7 flex justify-center lg:justify-end h-full items-center">
          <RegisterModal />
        </div>
      </div>

      {/* --- FOOTER --- */}
      {/* Aligned exactly with main content using max-w-[1400px] and px-6 md:px-12 */}
      <footer className="absolute bottom-0 left-0 w-full py-8 z-50 flex justify-center">
        <div className="w-full max-w-[1400px] px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-gray-400 tracking-widest uppercase">
            
            {/* Left Side: Origin */}
            <div className="flex items-center gap-2 mb-2 md:mb-0">
                <span>Made in Singapore</span>
            </div>

            {/* Right Side: Legal Links */}
            <div className="flex items-center gap-6">
                <a href="#" className="hover:text-[#007473] transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-[#007473] transition-colors">Terms & Conditions</a>
            </div>
        </div>
      </footer>

      {/* Animation Styles */}
      <style>{`
        .animate-bounce-slow {
            animation: bounce-slow 4s infinite;
        }
        .animate-bounce-delayed {
            animation: bounce-slow 4.5s infinite;
            animation-delay: 1s;
        }
        @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
};