import React from 'react';
import { useLocation } from '@tanstack/react-router';
import { useAuth } from '@/features/auth/hooks/useAuth';

const Header: React.FC = () => {
  const location = useLocation();
  
  const { user } = useAuth()

  const getTitle = () => {
    const pathname = location.pathname;
    if (pathname.includes('listing')) {
      return 'Listing Details';
    }
    const path = location.pathname.split('/').pop() || 'Dashboard';
    return path.replace(/-/g, ' ');
  };

  const getInitials = (name?: string) => {
    if (!name) return 'GU';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  return (
    <header className="h-16 flex items-center justify-between px-8 bg-transparent">
      <div className="flex items-center gap-2">
        <span className="text-primary-gradient font-black text-2xl pt-2 capitalize">
          {getTitle()}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div 
          title={user?.fullname}
          className="h-10 w-10 rounded-full bg-primary-accent border border-primary/20 flex items-center justify-center text-primary font-bold text-sm shadow-sm transition-transform hover:scale-105 cursor-pointer"
        >
          {getInitials(user?.fullname)}
        </div>
      </div>
    </header>
  );
};

export { Header };