import React from 'react';

interface BgGradientProps {
  variant?: 'primary' | 'secondary';
}

const BgGradient: React.FC<BgGradientProps> = ({ variant = 'primary' }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      
      {variant === 'primary' && (
        <>
          <div className="absolute top-[-10%] left-[-5%] w-150 h-150 bg-primary/5 rounded-full blur-[140px]" />
          <div className="absolute top-[20%] right-[-10%] w-100 h-100 bg-[#A3E635]/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[5%] left-[10%] w-125 h-125 bg-primary/5 rounded-full blur-[130px]" />
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </>
      )}

      {variant === 'secondary' && (
        <>
          <div className="absolute -top-[20%] -right-[20%] w-[80%] h-[80%] bg-accent/5 rounded-full blur-[100px]" />
          <div className="absolute -bottom-[20%] -left-[20%] w-[60%] h-[60%] bg-primary/2 rounded-full blur-[80px]" />
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#007473_1px,transparent_1px)] bg-size-[24px_24px]" />
        </>
      )}
      
    </div>
  );
};

export default BgGradient;