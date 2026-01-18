import React, { useState } from 'react';
import { Compass, Briefcase, FolderKanban, ChevronLeft, ChevronRight, LogOut, Settings } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';
import { useAuth } from '@/features/auth/hooks/useAuth';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { logout } = useAuth(); 

  const navItems = [
    { label: 'Explore', icon: <Compass size={18} />, path: '/explore' },
    { label: 'Portfolio', icon: <Briefcase size={18} />, path: '/portfolio' },
    { label: 'My Holdings', icon: <FolderKanban size={18} />, path: '/my-holdings' },
    { label: 'Settings', icon: <Settings size={18} />, path: '/settings' },
  ];

  return (
    <motion.aside 
      animate={{ width: isCollapsed ? 64 : 232 }}
      className="relative h-full bg-white flex flex-col font-nunito "
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-12 z-50 flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md cursor-pointer hover:bg-gray-50"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <div className="h-16 flex items-center justify-center px-6 pt-2 overflow-hidden">
         {!isCollapsed && <Logo size='small'/>}
      </div>

      <nav className="flex-1 px-3 py-3 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center gap-4 px-3 py-3 rounded-xl text-sm font-bold group relative transition-colors"
            activeProps={{ className: 'bg-primary-accent text-primary' }}
            inactiveProps={{ className: 'text-gray-400 hover:bg-gray-50 hover:text-primary' }}
          >
            <div className="shrink-0">{item.icon}</div>
            
            <AnimatePresence mode="popLayout">
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        ))}
      </nav>

      <div className="px-3 py-6 border-t border-gray-100">
        <button
          onClick={() => logout()}
          className="w-full flex items-center gap-4 px-3 py-3 rounded-xl cursor-pointer text-sm font-bold text-red-500 hover:bg-red-50 transition-colors group"
        >
          <div className="shrink-0">
            <LogOut size={18} />
          </div>
          
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="whitespace-nowrap"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
};

export { Sidebar };