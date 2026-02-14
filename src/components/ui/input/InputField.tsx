import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const InputField: React.FC<InputProps> = ({ label, type, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full flex flex-col items-start group">
      <label className="text-[10px] font-black uppercase tracking-widest text-[#005C5C] text-left mb-1">
        {label}
      </label>
      
      <div className="relative w-full">
        <input 
          {...props}
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          className={clsx(
            "w-full py-3 bg-transparent border-b border-gray-200",
            "text-gray-800 placeholder:text-gray-300 text-sm font-medium",
            "focus:outline-none focus:border-primary transition-colors duration-300",
            isPassword && "pr-10" 
          )}
        />

        {isPassword && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-primary transition-colors focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff size={16} strokeWidth={2.5} />
            ) : (
              <Eye size={16} strokeWidth={2.5} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};