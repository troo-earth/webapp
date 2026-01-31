import toast, { Toaster as HotToaster, type Toast } from 'react-hot-toast';
import { Check, X, AlertCircle, Info } from 'lucide-react';
import clsx from 'clsx';
import BgGradient from '../ui/global/BgGradient';

const MinimalToast = ({ 
  t, 
  title, 
  message, 
  type 
}: { 
  t: Toast; 
  title: string; 
  message?: string; 
  type: 'success' | 'error' | 'info';
}) => {
  return (
    <div
      className={clsx(
        `${t.visible ? 'animate-in fade-in slide-in-from-top-2' : 'animate-out fade-out slide-out-to-top-2'} duration-300`,
        "flex items-center w-full max-w-sm",
        "backdrop-blur-xl", 
        "border border-white/40",      
        "rounded-2xl p-4 gap-3",        
        "shadow-lg shadow-primary/5",   
        "pointer-events-auto select-none"
      )}
    >
      <BgGradient/>
      <div className={clsx(
        "shrink-0 mt-0.5 w-8 h-8 rounded-full flex items-center justify-center",
        type === 'success' && "bg-primary/10 text-primary",
        type === 'error' && "bg-red-50 text-red-500",
        type === 'info' && "bg-gray-50 text-gray-500"
      )}>
        {type === 'success' && <Check size={16} strokeWidth={3} />}
        {type === 'error' && <AlertCircle size={16} strokeWidth={3} />}
        {type === 'info' && <Info size={16} strokeWidth={3} />}
      </div>

      <div className="flex-1">
        <h3 className={clsx(
          "text-sm font-bold",
          type === 'error' ? "text-red-900" : "text-[#0F1F1F]" 
        )}>
          {title}
        </h3>
        {message && (
          <p className="mt-0.5 text-xs font-medium text-gray-500 leading-relaxed">
            {message}
          </p>
        )}
      </div>

      <button
        onClick={() => toast.dismiss(t.id)}
        className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors p-1"
      >
        <X size={14} />
      </button>
    </div>
  );
};


// eslint-disable-next-line react-refresh/only-export-components
export const notify = {
  success: (title: string, message?: string) => 
    toast.custom((t) => <MinimalToast t={t} title={title} message={message} type="success" />),
  
  error: (title: string, message?: string) => 
    toast.custom((t) => <MinimalToast t={t} title={title} message={message} type="error" />),

  info: (title: string, message?: string) => 
    toast.custom((t) => <MinimalToast t={t} title={title} message={message} type="info" />),
};

export const Toaster = () => {
  return (
    <HotToaster
      position="top-right"
      gutter={8}
      containerStyle={{
        top: 24,
        right: 24,
      }}
      toastOptions={{
        duration: 2500,
        className: '',
        style: {
          background: 'transparent',
          boxShadow: 'none',
          border: 'none',
          padding: 0,
        },
      }}
    />
  );
};