import React, { useState } from 'react';
import { ChevronDown, LogOut, User as UserIcon } from "lucide-react";
import { Logo } from "../../../../components/global/Logo";
import { useAuth } from '../../hooks/useAuth';


const AuthHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { logout, user, isAuthenticated } = useAuth()


  const displayUser = isAuthenticated && location.pathname.includes('/onboarding')

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="w-full py-8 z-50 flex justify-center">
      <div className="w-full max-w-350 px-6 md:px-12 flex justify-between items-center">
        
        <Logo />

        {displayUser && (
          <div className="relative">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-3 backdrop-blur-sm border py-1.5 px-3 pr-4 rounded-xl transition-all duration-1000 group bg-white/50 border-primary/20 hover:bg-white hover:shadow-sm text-[#0F1F1F]"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-1000 bg-primary/10 text-primary">
                <UserIcon size={16} />
              </div>
              
              <span className="text-sm font-bold tracking-tight">
                {user?.fullname || "User"}
              </span>
              
              <ChevronDown 
                size={16} 
                className={`transition-transform duration-300 text-primary ${isOpen ? 'rotate-180' : ''}`} 
              />
            </button>

            {isOpen && (
              <div className="absolute top-full right-0 mt-1 w-full bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-3 py-3 text-[14px] font-bold text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={14} />
                  Log Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default AuthHeader;