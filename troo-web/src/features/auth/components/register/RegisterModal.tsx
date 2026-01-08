import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { InputField } from '../../../../components/ui/InputField';
import { Button } from '../../../../components/ui/Button';

export const RegisterModal: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registering user:", formData);
  };

  return (
    // Slightly narrower (max-w-xl) and tighter padding (p-10) to allow more gap
    <div className="relative w-full max-w-xl bg-white/60 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,116,115,0.08)] border border-white/80 overflow-hidden">
      
      {/* --- ATMOSPHERIC GLOW EFFECTS --- */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute -top-[20%] -right-[20%] w-[80%] h-[80%] bg-[#FFB71B]/5 rounded-full blur-[100px]" />
         <div className="absolute -bottom-[20%] -left-[20%] w-[60%] h-[60%] bg-[#007473]/2 rounded-full blur-[80px]" />
         <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#007473_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative z-10">
        
        {/* --- HEADER SECTION --- */}
        <div className="mb-10 text-center">
           <h3 className="text-3xl font-black text-primary-gradient tracking-tight">
             Join the Ecosystem
           </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Row 1 - Name & Username */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InputField 
              label="Name" 
              placeholder="John" 
              type="text"
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            />
            <InputField 
              label="Username (Optional)" 
              placeholder="Doe" 
              type="text"
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            />
          </div>

          {/* Email */}
          <InputField 
            label="Company Email" 
            placeholder="john@company.com" 
            type="email"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />

          {/* Row 2 - Passwords */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InputField 
              label="Password" 
              type="password"
              placeholder="••••••••"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <InputField 
              label="Confirm Password" 
              type="password"
              placeholder="••••••••"
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>

          {/* --- ACTIONS SECTION --- */}
          <div className="pt-6 flex flex-col items-center gap-5">
            
            {/* 1. Create Button */}
            <Button 
              type="submit"
              className="group w-full py-4 rounded-full bg-[#005C5C] text-white font-bold text-xs uppercase tracking-widest
              hover:bg-[#0F1F1F] hover:shadow-lg hover:shadow-[#005C5C]/20 transition-all duration-300 flex items-center justify-center gap-3"
            >
              Create Account
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Button>
            
            {/* 2. Login Link */}
            <div className="text-center">
              <span className="text-xs text-gray-500 font-medium">
                Already have an account? 
              </span>
              <button type="button" className="ml-2 text-sm font-black text-[#007473] hover:underline">
                Login
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};