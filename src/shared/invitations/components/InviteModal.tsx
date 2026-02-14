import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { createPortal } from 'react-dom';
import { MailOpen } from 'lucide-react';
import { Button } from '../../../components/ui/buttons/Button';
import type { InviteData } from '@/types/global/types';
import { useInviteFlow } from '../hooks/useInviteFlow';

const InviteModal = ({ data }: { data: InviteData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const { clearInvite } = useInviteFlow();

  const searchParams = new URLSearchParams(location.search);
  const inviteToken = searchParams.get('invite_token');

  const isLogin = location.pathname.includes('/login');
  const isAuthPage = isLogin || location.pathname.includes('/register');
  const shouldTrigger = isAuthPage && !!inviteToken && data?.data?.valid;

  useEffect(() => {
    if (shouldTrigger) setIsOpen(true);
  }, [shouldTrigger]);

  if (!isOpen || !shouldTrigger) return null;

  const { org_name, role, email } = data.data;

  return createPortal(
    <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
      {/* Darkened Overlay */}
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-500" 
        onClick={() => setIsOpen(false)} 
      />
      
      {/* Modal Container with Visible Outline */}
      <div className="relative w-full max-w-sm bg-white rounded-4xl p-8 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-300">
        
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-6 rounded-2xl bg-primary/5">
            <MailOpen size={24} className="text-primary" />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
            You're invited
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Join <span className="text-primary font-bold">{org_name}</span> as a <span className="text-black capitalize font-bold">{role}</span>.
          </p>
        </div>

        <div className="my-8 py-6 border-y border-gray-100">
          <div className="text-center space-y-1">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
              Account invited
            </p>
            <p className="text-sm font-medium text-gray-700">
              {email}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            onClick={() => setIsOpen(false)}
            className="w-full py-4 rounded-xl bg-gray-900 text-white hover:bg-black transition-all text-xs font-bold uppercase tracking-widest shadow-lg shadow-gray-900/20"
          >
            Accept and {isLogin ? 'Login' : 'Register'}
          </Button>
          
          <button 
            onClick={clearInvite}
            className="text-[11px] font-bold text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default InviteModal;