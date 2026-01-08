import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { InputField } from '../../../../components/ui/InputField';
import { Button } from '../../../../components/ui/Button';
import BgGradient from '@/components/ui/BgGradient';
import type { RegisterFormData } from '../../types/authTypes';
import { RegisterApi } from '../../api/authApi';
import { registerSchema } from '../../utils/authSchema';

export const RegisterModal: React.FC<{ onRegisterSuccess?: () => void }> = ({ onRegisterSuccess }) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});

  const mutation = useMutation({
    mutationFn: RegisterApi,
    onSuccess: (data) => {
      console.log("Registration Successful:", data);
      if (onRegisterSuccess) onRegisterSuccess();
    },
    onError: (error) => {
      console.error("Registration Failed:", error);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});
    
    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      const flattenedErrors = result.error.flatten().fieldErrors;
      const errors: Partial<Record<keyof RegisterFormData, string>> = {};
      
      (Object.keys(flattenedErrors) as Array<keyof RegisterFormData>).forEach((key) => {
        const fieldError = flattenedErrors[key];
        if (fieldError && fieldError.length > 0) {
          errors[key] = fieldError[0];
        }
      });

      setValidationErrors(errors);
      return;
    }

    mutation.mutate(result.data);
  };

  return (
    <div className="relative w-full max-w-md bg-white/60 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,116,115,0.08)] border border-white/80 overflow-hidden">
      
      <BgGradient variant='secondary'/>

      <div className="relative z-10">
        <div className="mb-8 text-center">
           <h3 className="text-3xl font-black text-primary-gradient tracking-tight">
             Join the Ecosystem
           </h3>
           <p className="text-xs text-gray-500 font-medium mt-2 uppercase tracking-widest">
             Create your professional account
           </p>
        </div>

        {mutation.isError && (
          <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-100 flex items-center gap-2 text-red-600 animate-fade-in-up">
            <AlertCircle size={16} />
            <span className="text-[11px] font-bold uppercase tracking-wide">
              {mutation.error instanceof Error ? mutation.error.message : "Registration failed"}
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <InputField 
                label="First Name" 
                placeholder="John" 
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className={validationErrors.firstName ? "border-red-500" : ""}
              />
              {validationErrors.firstName && <p className="text-[10px] text-red-500 font-bold ml-1">{validationErrors.firstName}</p>}
            </div>
            <div className="space-y-1">
              <InputField 
                label="Last Name" 
                placeholder="Doe" 
                value={formData.lastName || ''}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <InputField 
              label="Company Email" 
              placeholder="name@company.com" 
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={validationErrors.email ? "border-red-500" : ""}
            />
            {validationErrors.email && <p className="text-[10px] text-red-500 font-bold ml-1">{validationErrors.email}</p>}
          </div>

         <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <InputField 
              label="Password" 
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className={validationErrors.password ? "border-red-500" : ""}
            />
            {validationErrors.password && <p className="text-[10px] text-red-500 font-bold ml-1">{validationErrors.password}</p>}
          </div>

          <div className="space-y-1">
            <InputField 
              label="Confirm Password" 
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className={validationErrors.confirmPassword ? "border-red-500" : ""}
            />
            {validationErrors.confirmPassword && <p className="text-[10px] text-red-500 font-bold ml-1">{validationErrors.confirmPassword}</p>}
          </div>
          </div> 

          <div className="pt-4 flex flex-col items-center gap-6">
            <Button 
              type="submit"
              isLoading={mutation.isPending}
              className="group w-full py-4 rounded-full bg-[#005C5C] text-white font-bold text-xs uppercase tracking-widest"
            >
              {mutation.isPending ? 'Creating Account...' : 'Create Account'}
              {!mutation.isPending && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
            </Button>
            
            <div className="text-center flex items-center justify-center gap-2">
              <span className="text-xs text-gray-500 font-medium">Already have an account?</span>
              <button type="button" className="text-sm font-black">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};