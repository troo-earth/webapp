import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Optional container props
}

export const SearchInput: React.FC<SearchInputProps> = ({ className, ...props }) => {
  return (
    <div className="relative group">
      {/* Icon: Smaller and changes color on group focus */}
      <Search 
        className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors duration-300" 
      />
      
      <input 
        type="text" 
        className={`
          w-full pl-10 pr-4 py-2.5
          bg-white border border-gray-200 rounded-xl
          text-sm text-gray-700 font-medium placeholder:text-gray-400
          focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none 
          transition-all duration-300 
          ${className || ''} 
        `}
        {...props}
      />
    </div>
  );
};