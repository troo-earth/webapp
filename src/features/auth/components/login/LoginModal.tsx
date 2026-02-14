import React, { useEffect, useState } from 'react';
import { ArrowRight, AlertCircle } from 'lucide-react';
import BgGradient from '@/components/ui/global/BgGradient';
import { InputField } from '@/components/ui/input/InputField';
import { Button } from '@/components/ui/buttons/Button';
import type { LoginFormData } from '../../types/authTypes';
import { loginSchema } from '../../utils/authSchema';
import { useNavigate } from '@tanstack/react-router';
import { useLogin } from '../../hooks/useAuthMutations'; // Import your hook

interface LoginModalProps {
  onLoginSuccess?: () => void;
  onPendingChange?: (isPending: boolean) => void; 
  prefilledEmail?: string;
  onDismissInvite?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onPendingChange, prefilledEmail, onDismissInvite }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: prefilledEmail || '',
    password: '',
  });

  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});

  // Integrate the custom hook
  const { mutate, isPending, isError, error } = useLogin({
    onMutate: () => onPendingChange?.(true),
    onSettled: () => onPendingChange?.(false),
  });

  useEffect(() => {
    setFormData(prev => ({ ...prev, email: prefilledEmail || '' }));
  }, [prefilledEmail]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({}); 
    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const flattenedErrors = result.error.flatten().fieldErrors;
      const errors: Partial<Record<keyof LoginFormData, string>> = {};
      
      (Object.keys(flattenedErrors) as Array<keyof LoginFormData>).forEach((key) => {
        const fieldError = flattenedErrors[key];
        if (fieldError && fieldError.length > 0) {
          errors[key] = fieldError[0]; 
        }
      });

      setValidationErrors(errors);
      return;
    }

    mutate(result.data); 
  };

  return (
    <div className="relative w-full max-w-md bg-white/60 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,116,115,0.08)] border border-white/80 overflow-hidden">
      <BgGradient variant="secondary" />

      <div className="relative z-10">
        <div className="mb-8 text-center">
          <h3 className="text-3xl font-black text-primary-gradient tracking-tight">
            Welcome Back
          </h3>
          <p className="text-xs text-gray-500 font-medium mt-2 uppercase tracking-widest">
            Enter your credentials to access
          </p>
        </div>

        {isError && (
          <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-100 flex items-center gap-2 text-red-600 animate-fade-in-up">
            <AlertCircle size={16} />
            <span className="text-[11px] font-bold uppercase tracking-wide">
              {error instanceof Error ? error.message : "Login failed"}
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <InputField
              label="Username or Email"
              placeholder="john@company.com"
              type="text"
              value={formData.email}
              disabled={!!prefilledEmail}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`${validationErrors.email ? "border-red-500 focus:border-red-500" : ""} ${prefilledEmail ? "opacity-70 bg-gray-50/50" : ""}`}
            />
            {validationErrors.email && (
              <p className="text-[10px] text-red-500 font-bold ml-1">
                {validationErrors.email}
              </p>
            )}
            {prefilledEmail && (
              <div className="flex items-center justify-between px-1">
                <p className="text-[9px] text-primary/60 font-bold ml-1 uppercase tracking-tighter">
                  Invitation Applied
                </p>
                <button
                  type="button"
                  onClick={onDismissInvite} // This function clears the query params
                  className="text-[9px] text-red-400 font-extrabold uppercase tracking-tighter hover:text-red-500 transition-colors cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="space-y-1">
              <InputField
                label="Password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={
                  validationErrors.password
                    ? "border-red-500 focus:border-red-500"
                    : ""
                }
              />
              {validationErrors.password && (
                <p className="text-[10px] text-red-500 font-bold ml-1">
                  {validationErrors.password}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="bg-transparent p-0 h-auto text-[10px] font-bold text-primary hover:underline hover:bg-transparent uppercase tracking-tighter shadow-none"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          <div className="pt-2 flex flex-col items-center gap-6">
            <Button
              type="submit"
              disabled={isPending}
              className="group w-full py-4 rounded-full bg-[#005C5C] text-white font-bold text-xs uppercase tracking-widest
              hover:bg-[#0F1F1F] hover:shadow-lg hover:shadow-[#005C5C]/20 transition-all duration-300 flex items-center justify-center gap-3 
              disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isPending ? "Signing In..." : "Sign In"}
              {!isPending && (
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              )}
            </Button>

            <div className="text-center flex items-center justify-center gap-2">
              <span className="text-xs text-gray-500 font-medium">
                New to the platform?
              </span>
              <button
                type="button"
                className="bg-transparent p-0 h-auto text-sm font-black text-primary hover:bg-transparent cursor-pointer shadow-none"
                onClick={() => navigate({ to: "/register" })}
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