import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/buttons/Button'; 
import BgGradient from '@/components/ui/global/BgGradient';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const totalTime = 5;

  useEffect(() => {
    if (countdown === 0) {
      navigate({ to: '/portfolio' });
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (countdown / totalTime) * circumference;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 font-nunito p-4">
        <BgGradient/>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full backdrop-blur-xl rounded-[2.5rem]     p-8 md:p-12 text-center"
      >
        
        <div className="relative flex items-center justify-center mb-8">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center relative z-10"
          >
             <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-8 h-8 text-primary" strokeWidth={4} />
             </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 0.5, 0], scale: 1.5 }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute w-24 h-24 bg-primary-200/50 rounded-full z-0"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-2xl font-black text-[#0F1F1F] mb-2">Payment Successful!</h1>
          <p className="text-gray-500 font-medium mb-8">
            Thank you for your purchase. Your transaction has been completed successfully.
          </p>
        </motion.div>

        <div className="flex flex-col items-center justify-center gap-6">
          <div className="relative flex items-center justify-center">
            <svg className="transform -rotate-90 w-16 h-16">
              <circle
                cx="32"
                cy="32"
                r={radius}
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                className="text-gray-100"
              />
              <circle
                cx="32"
                cy="32"
                r={radius}
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="text-primary transition-all duration-1000 ease-linear"
              />
            </svg>
            
            <span className="absolute text-lg font-bold text-primary tabular-nums"> 
              {countdown}
            </span>
          </div>

          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Redirecting to portfolio
          </p>
        </div>

            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8"
            >
            <Button 
                onClick={() => navigate({ to: '/portfolio' })}
                variant="primary"
                className="w-full bg-primary"
            >
                Go to Portfolio Now 
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            </motion.div>

      </motion.div>
    </div>
  );
};

export default PaymentSuccessPage;