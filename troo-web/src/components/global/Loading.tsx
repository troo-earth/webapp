import { ClimbingBoxLoader } from 'react-spinners';
import BgGradient from '../ui/BgGradient'; 
import type React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-50 overflow-hidden">
        <BgGradient />
      <div className="relative z-10 flex flex-col items-center gap-8">
          <ClimbingBoxLoader 
            color="#007473" 
            size={20}
            speedMultiplier={1} 
          />
      </div>
    </div>
  );
};

export default LoadingScreen;