import { ArrowUpRight } from "lucide-react";
import type { FactCardType } from "../types/exploreTypes";

export const FactCard = ({ title, fact, color }: FactCardType) => (
    <div className={`h-full w-full min-h-[320px] p-8 rounded-3xl flex flex-col justify-between items-start ${color} text-white shadow-lg transform hover:-translate-y-1 transition-transform duration-300`}>
      <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/10">
          Did you know?
      </div>
      
      <div className="mt-auto">
          <h4 className="text-2xl font-black leading-tight mb-3">{title}</h4>
          <p className="text-sm opacity-90 font-medium leading-relaxed">{fact}</p>
      </div>
      
      <div className="mt-6 w-full pt-6 border-t border-white/20 flex justify-between items-center">
          <span className="text-[10px] font-bold uppercase tracking-wider opacity-75">Learn More</span>
          <ArrowUpRight className="w-5 h-5" />
      </div>
    </div>
  );