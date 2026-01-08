import React, { useState } from 'react';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query'; // Import TanStack Query
import { ArrowRight, AlertCircle } from 'lucide-react'; // Added AlertIcon for server errors
import { InputField } from '../../../../components/ui/InputField';
import { Button } from '../../../../components/ui/Button';
import BgGradient from '@/components/ui/BgGradient';
import { LoginApi } from '../../api/LoginApi';

const loginSchema = z.object({
  identifier: z.string().min(1, "Username or Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"), 
});

export type LoginFormData = z.infer<typeof loginSchema>;

interface LoginModalProps {
  onLoginSuccess?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    identifier: '',
    password: '',
  });

  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});

  const mutation = useMutation({
    mutationFn: LoginApi,
    onSuccess: (data) => {
      console.log("Login Successful:", data);
      if (onLoginSuccess) onLoginSuccess();
    },
    onError: (error) => {
      console.error("Login Failed:", error);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({}); 
    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: any = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setValidationErrors(fieldErrors);
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
             Welcome Back
           </h3>
           <p className="text-xs text-gray-500 font-medium mt-2 uppercase tracking-widest">
             Enter your credentials to access
           </p>
        </div>

        {mutation.isError && (
          <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-100 flex items-center gap-2 text-red-600 animate-fade-in-up">
            <AlertCircle size={16} />
            <span className="text-[11px] font-bold uppercase tracking-wide">
              {mutation.error instanceof Error ? mutation.error.message : "Login failed"}
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="space-y-1">
            <InputField 
              label="Username or Email" 
              placeholder="john@company.com" 
              type="text"
              value={formData.identifier}
              onChange={(e) => setFormData({...formData, identifier: e.target.value})}
              className={validationErrors.identifier ? "border-red-500 focus:border-red-500" : ""}
            />
            {validationErrors.identifier && (
              <p className="text-[10px] text-red-500 font-bold ml-1">{validationErrors.identifier}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="space-y-1">
                <InputField 
                label="Password" 
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className={validationErrors.password ? "border-red-500 focus:border-red-500" : ""}
                />
                {validationErrors.password && (
                <p className="text-[10px] text-red-500 font-bold ml-1">{validationErrors.password}</p>
                )}
            </div>
            
            <div className="flex justify-end">
              <button 
                type="button" 
                className="bg-transparent p-0 h-auto text-[10px] font-bold text-[#007473] hover:underline hover:bg-transparent uppercase tracking-tighter shadow-none"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          <div className="pt-2 flex flex-col items-center gap-6">
            
            <Button 
              type="submit"
              disabled={mutation.isPending} 
              className="group w-full py-4 rounded-full bg-[#005C5C] text-white font-bold text-xs uppercase tracking-widest
              hover:bg-[#0F1F1F] hover:shadow-lg hover:shadow-[#005C5C]/20 transition-all duration-300 flex items-center justify-center gap-3 
              disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {mutation.isPending ? 'Signing In...' : 'Sign In'}
              
              {!mutation.isPending && (
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              )}
            </Button>
            
            <div className="text-center flex items-center justify-center gap-2">
              <span className="text-xs text-gray-500 font-medium">
                New to the platform? 
              </span>
              <button 
                type="button" 
                className="bg-transparent p-0 h-auto text-sm font-black text-[#007473] hover:underline hover:bg-transparent shadow-none"
              >
                Create Account
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};