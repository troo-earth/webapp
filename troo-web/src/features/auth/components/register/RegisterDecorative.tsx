import React from 'react';
import { Leaf, Lock, TrendingUp, FileCheck, Hash, CheckCircle2, Zap } from "lucide-react";

export const RegisterDecorative: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:col-span-5 flex-col justify-center h-full max-h-200 pl-2">
      <div className="relative w-full max-w-120 grow max-h-100 select-none flex flex-col gap-4">
        
        <div className="relative z-20 w-[95%] bg-white/70 backdrop-blur-xl border border-white/80 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,116,115,0.1)] p-6 transition-all hover:scale-[1.02] duration-500">
          <div className="flex justify-between items-start mb-2">
            <div className="relative">
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-1">Net Zero Progress</p>
              <h4 className="text-3xl font-black text-[#0F1F1F] mb-5">
                1,240 <span className="text-lg font-bold text-gray-400">tCO₂e</span>
              </h4>
              
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
            <div className="p-2 bg-[#E0F0F0] rounded-lg text-primary">
              <Leaf size={20} />
            </div>
          </div>

          <div className="flex items-end gap-2 h-16 mb-4 mt-1">
            <div className="w-full bg-primary/10 rounded-t-sm h-[40%]"></div>
            <div className="w-full bg-primary/10 rounded-t-sm h-[60%]"></div>
            <div className="w-full bg-primary/20 rounded-t-sm h-[50%]"></div>
            <div className="w-full bg-primary/30 rounded-t-sm h-[75%]"></div>
            <div className="w-full bg-primary rounded-t-sm h-[90%] relative group">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#0F1F1F] text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                +12%
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-bold text-primary">
            <TrendingUp size={14} />
            <span>+12.5% vs last month</span>
          </div>
        </div>

        <div className="relative z-10 w-[90%] self-end -mt-6 bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl p-5 pt-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FileCheck size={16} className="text-primary" />
              <span className="text-xs font-black uppercase tracking-widest text-[#0F1F1F]/70">Audit Log</span>
            </div>
            <div className="flex items-center gap-1 opacity-50">
              <Hash size={12} className="text-primary" />
              <span className="text-[9px] font-mono text-primary">0x82...9A</span>
            </div>
          </div>
          <div className="space-y-3">
            {[ 
              { label: "Vintage 2024 Verified", time: "Just now" },
              { label: "2023 Eden Wind Farm", time: "2h ago" }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-white/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span className="text-[10px] font-bold text-[#0F1F1F]">{item.label}</span>
                </div>
                <span className="text-[10px] font-mono text-gray-400">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute -right-16 -top-16 bg-white shadow-xl border border-white/50 p-3 rounded-xl flex items-center gap-3 animate-bounce-slow z-30">
          <div className="bg-green-100 p-1.5 rounded-full text-green-600">
            <CheckCircle2 size={16} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase">Status</p>
            <p className="text-xs font-black text-[#0F1F1F]">Audit Verified</p>
          </div>
        </div>

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
  );
};