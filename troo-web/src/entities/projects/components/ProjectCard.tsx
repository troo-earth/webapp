import React, { useMemo, useState } from 'react';
import { MapPin, ArrowUpRight, Calendar, ShieldCheck } from 'lucide-react';
import { getCountryName, getSDGColor } from '../utils/helpers';
import type { Project } from '../types/projectTypes';

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2613&auto=format&fit=crop";

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [imgSrc, setImgSrc] = useState(project.imageUrl || FALLBACK_IMAGE);

  const location = useMemo(() => {
    const countryName = getCountryName(project.country);
    if (project.state) {
      return `${project.state}, ${countryName}`;
    }
    return countryName;
  }, [project.country, project.state]);

  const priceDisplay = useMemo(() => {
    if (!project.price || project.price <= 0) {
      return { formatted: 'Price TBD', isRange: false };
    }
    return {
      formatted: `$${project.price.toFixed(2)}`,
      isRange: false,
    };
  }, [project.price]);

  return (
        <div
          className="group relative flex flex-col w-full bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 cursor-pointer hover:-translate-y-1 h-full"
        >
        
          <div className="relative h-40 w-full overflow-hidden shrink-0">
            <img
              src={imgSrc}
              alt={project.name}
              onError={() => setImgSrc(FALLBACK_IMAGE)}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
        
            <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                <div className="flex items-center gap-1.5 bg-white text-gray-900 px-2.5 py-1 rounded-md shadow-sm border border-gray-100/50">
                    <ShieldCheck className="w-3 h-3 text-primary" strokeWidth={3} />
                    <span className="text-[10px] font-extrabold uppercase tracking-wider">{project.registry}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md text-gray-600 px-2.5 py-1 rounded-md shadow-sm border border-gray-100/50">
                    <Calendar className="w-3 h-3" />
                    <span className="text-[10px] font-black">{project.year}</span>
                </div>
            </div>
            <div className="absolute bottom-3 left-3 z-10">
                 <span className="inline-flex items-center bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-lg uppercase tracking-widest">
                    {project.type}
                 </span>
            </div>
          </div>
          <div className="p-4 flex flex-col flex-1 gap-3">
        
            <div>
                <div className="h-12 mb-1">
                    <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {project.name}
                    </h3>
                </div>
                <div className="flex items-center text-gray-600 text-xs">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-gray-500" />
                    <span className="truncate">{location}</span>
                </div>
            </div>
            <div className="h-13 bg-gray-50 rounded-lg px-2 flex items-center gap-3 border border-gray-100/50">
                <div className="flex items-center gap-1 text-primary font-bold shrink-0">
                    <span className='font-family-nunito text-[14px]'>SDG Impact</span>
                </div>
        
                <div className="h-6 w-px bg-gray-200"></div>
                <div className="flex -space-x-2 overflow-hidden py-0.5 items-center">
                    {project.sdgGoals && project.sdgGoals.length > 0 ? (
                        <>
                            {project.sdgGoals.slice(0, 5).map((goal) => (
                                <div
                                    key={goal}
                                    className={`w-8 h-8 rounded-full border-2 border-white ${getSDGColor(goal)} flex items-center justify-center text-xs font-bold text-white shadow-sm hover:z-10 hover:scale-110 transition-transform cursor-help`}
                                    title={`SDG ${goal}`}
                                >
                                    {goal}
                                </div>
                            ))}
                            {project.sdgGoals.length > 5 && (
                                <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500 z-10">
                                    +{project.sdgGoals.length - 5}
                                </div>
                            )}
                        </>
                    ) : (
                        <span className="text-xs text-primary font-medium pl-1 italic">
                            Standard Verified
                        </span>
                    )}
                </div>
            </div>
            <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                <div className="flex flex-col">
                    <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] text-gray-400 font-bold capitalize tracking-wide">
                            Price / Credit
                        </span>
                    </div>
                    <div className="text-gray-900 leading-none">
                        <span className="text-lg font-black tracking-tight">
                            {priceDisplay.formatted}
                        </span>
                    </div>
                </div>
                <button className="w-9 h-9 rounded-full bg-gray-50 text-gray-900 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <ArrowUpRight className="w-4.5 h-4.5" strokeWidth={2.5} />
                </button>
            </div>
          </div>
        </div>
  );
};