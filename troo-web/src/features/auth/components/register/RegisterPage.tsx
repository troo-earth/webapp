import React from 'react';
import { RegisterModal } from "./RegisterModal";
import { RegisterDecorative } from './RegisterDecorative'; 
import AuthHeader from '../global/AuthHeader';
import AuthFooter from '../global/AuthFooter';
import BgGradient from '@/components/ui/BgGradient';

export const RegisterPage: React.FC = () => {
  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#FDFDFD] font-nunito">
      
      <BgGradient variant='primary'/>
      <AuthHeader/>

      <div className="relative z-10 w-full max-w-350 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center grow">
        
        <RegisterDecorative />

        <div className="col-span-1 lg:col-span-7 flex justify-center lg:justify-end h-full items-center">
          <RegisterModal />
        </div>
      </div>

      <AuthFooter/>

      <style>{`
        .animate-bounce-slow {
            animation: bounce-slow 4s infinite;
        }
        .animate-bounce-delayed {
            animation: bounce-slow 4.5s infinite;
            animation-delay: 1.2s;
        }
        @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};