import React, { useState } from 'react';
import { ArrowRight, Lock, User } from 'lucide-react';
import { InputField } from '../../../../components/ui/InputField';
import { Button } from '../../../../components/ui/Button';

export const LoginModal: React.FC = () => {
  const [formData, setFormData] = useState({
    identifier: '', // Can be username or email
    password: '',
    rememberMe: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in user:", formData);
  };

  return (
    <div className="relative w-full max-w-md bg-white/60 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,116,115,0.08)] border border-white/80 overflow-hidden">
      
      {/* --- ATMOSPHERIC GLOW EFFECTS --- */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute -top-[20%] -left-[20%] w-[80%] h-[80%] bg-[#007473]/5 rounded-full blur-[100px]" />
         <div className="absolute -bottom-[20%] -right-[20%] w-[60%] h-[60%] bg-[#FFB71B]/5 rounded-full blur-[80px]" />
         <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#007473_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative z-10">
        
        {/* --- HEADER SECTION --- */}
        <div className="mb-10 text-center">
           <h3 className="text-3xl font-black text-primary-gradient tracking-tight">
             Welcome Back
           </h3>
           <p className="text-xs text-gray-500 font-medium mt-2 uppercase tracking-widest">
             Enter your credentials to access
           </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Identifier (Email/Username) */}
          <InputField 
            label="Username or Email" 
            placeholder="john@company.com" 
            type="text"
            onChange={(e) => setFormData({...formData, identifier: e.target.value})}
          />

          {/* Password Section */}
          <div className="space-y-2">
            <InputField 
              label="Password" 
              type="password"
              placeholder="••••••••"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <div className="flex justify-end">
              <button type="button" className="text-[10px] font-bold text-[#007473] hover:underline uppercase tracking-tighter">
                Forgot Password?
              </button>
            </div>
          </div>

          {/* --- ACTIONS SECTION --- */}
          <div className="pt-4 flex flex-col items-center gap-6">
            
            {/* 1. Login Button */}
            <Button 
              type="submit"
              className="group w-full py-4 rounded-full bg-[#005C5C] text-white font-bold text-xs uppercase tracking-widest
              hover:bg-[#0F1F1F] hover:shadow-lg hover:shadow-[#005C5C]/20 transition-all duration-300 flex items-center justify-center gap-3"
            >
              Sign In
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Button>
            
            {/* 2. Register Link */}
            <div className="text-center">
              <span className="text-xs text-gray-500 font-medium">
                New to the platform? 
              </span>
              <button type="button" className="ml-2 text-sm font-black text-[#007473] hover:underline">
                Create Account
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};