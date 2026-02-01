import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

interface FilterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export const FilterButton: React.FC<FilterButtonProps> = ({ label = "Filters", className, ...props }) => {
  return (
    <button 
      className={`
        flex items-center justify-center gap-2 px-5 py-2.5
        bg-primary text-white rounded-xl
        text-sm font-bold tracking-wide
        border border-transparent
        hover:bg-primary/80 gradient hover:shadow-lg hover:-translate-y-0.5
        active:scale-95 active:translate-y-0
        transition-all duration-300 ease-out
        ${className || ''}
      `}
      {...props}
    >
      <SlidersHorizontal className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
};