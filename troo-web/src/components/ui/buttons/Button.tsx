import React, { type ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading = false,
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyles = "relative rounded-full cursor-pointer font-bold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[#002B2B] text-white hover:bg-[#004242] shadow-sm hover:shadow-[#002B2B]/20 px-8 py-3 text-sm",
    secondary: "bg-[#5BA49F] text-white hover:bg-[#4a8a86] px-8 py-3 text-sm",
    outline: "border-2 border-[#002B2B] text-[#002B2B] hover:bg-[#002B2B] hover:text-white px-8 py-3 text-sm",
    ghost: "bg-transparent text-gray-400 hover:text-[#007473] shadow-none hover:bg-transparent px-2 text-xs"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      disabled={disabled || isLoading}
      {...props}
    >
      <span className={`flex items-center gap-2 transition-opacity duration-200 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </span>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="animate-spin" size={16} />
        </div>
      )}
    </button>
  );
};