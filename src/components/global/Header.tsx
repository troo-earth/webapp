import React from 'react';
import { useLocation } from '@tanstack/react-router';
import { useAuth } from '@/features/auth/hooks/useAuth';

const Header: React.FC = () => {
  const location = useLocation();
  
  const { user } = useAuth()

  const getTitle = () => {
  const pathname = location.pathname;
  
  // Route patterns mapping
  const routeTitles: Record<string, string> = {
    '/listing/': 'Listing Details',
    '/project/': 'Project Details',
    '/retire/': 'Retire Credits',
    '/transfer/': 'Transfer Credits',
    '/list/': 'List for Sale',
    '/transactions': 'Transactions',
    '/history': 'History',
    '/settings': 'Settings',
    '/explore': 'Explore',
    '/portfolio': 'Portfolio',
    '/marketplace': 'Marketplace',
    '/listings': 'Listings',
  };
  
  // Check for matches
  for (const [route, title] of Object.entries(routeTitles)) {
    if (pathname.includes(route)) {
      return title;
    }
  }
  
  // Default fallback
  const path = pathname.split('/').pop() || 'Dashboard';
  return path.replace(/-/g, ' ');
};


  return (
    <header className="h-16 flex items-center justify-between px-8 bg-transparent">
      <div className="flex items-center gap-2">
        <span className="text-primary-gradient font-black text-2xl pt-2 capitalize">
          {getTitle()}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-primary">
          Welcome, {user?.fullname?.split(' ')[0] || 'User'}
        </span>
      </div>
    </header>
  );
};

export { Header };