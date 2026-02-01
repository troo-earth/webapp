import React, { useState } from 'react';
import BgGradient from '@/components/ui/global/BgGradient';
import SuccessOverlay from '@/features/auth/components/onboard/SuccessOverlay';
import AuthHeader from '@/features/auth/components/shared/AuthHeader';
import { OnboardingModal } from '@/features/auth/components/onboard/OnboardingModal';
import AuthFooter from '@/features/auth/components/shared/AuthFooter';

export const OnboardingPage: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleSuccess = (): void => {
    setIsSuccess(true);
  };

  return (
    <div className="relative h-screen w-full flex flex-col overflow-hidden bg-[#FDFDFD] font-nunito">
      
      {isSuccess && <SuccessOverlay />}
      <BgGradient/>

      <AuthHeader/>

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 w-full">
        <div className={`w-full max-w-4xl flex justify-center transform transition-all duration-1000 ease-out 
            ${isSuccess ? 'opacity-0 scale-90 blur-sm' : 'opacity-100 scale-100 animate-fade-in-up'}`}>
              <OnboardingModal onSuccess={handleSuccess} />
        </div>
      </main>

      <AuthFooter/>

      <style>{`
        .animate-ping-slow { animation: ping 8s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .animate-ping-delayed { animation: ping 8s cubic-bezier(0, 0, 0.2, 1) infinite; animation-delay: 4s; }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        
        .animate-expand-screen {
            animation: expandCircle 3.5s cubic-bezier(0.25, 1, 0.5, 1) forwards; 
        }
        .animate-content-slide-up {
            animation: slideUpFade 1s ease-out forwards;
        }
        .animate-fade-in-delayed {
            animation: fadeIn 2s ease-out 1s forwards;
        }
        .animate-progress-fill {
            animation: progressWidth 3s ease-out forwards;
        }

        .animate-float-up-1 { animation: floatUp 15s linear infinite; }
        .animate-float-up-2 { animation: floatUp 18s linear infinite; animation-delay: 2s; }
        .animate-float-up-3 { animation: floatUp 16s linear infinite; animation-delay: 4s; }
        .animate-float-slow { animation: float 6s ease-in-out infinite; }

        @keyframes expandCircle {
            0% { transform: scale(0); border-radius: 100%; }
            40% { border-radius: 100%; }
            100% { transform: scale(35); border-radius: 0; }
        }
        @keyframes slideUpFade {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes progressWidth {
            0% { width: 0%; }
            100% { width: 100%; }
        }
        @keyframes floatUp {
            0% { transform: translateY(100px) rotate(0deg); opacity: 0; }
            20% { opacity: 0.05; }
            80% { opacity: 0.05; }
            100% { transform: translateY(-100px) rotate(10deg); opacity: 0; }
        }
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }

        @keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};