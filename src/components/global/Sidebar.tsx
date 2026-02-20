import React, { useState } from "react";
import {
  Compass,
  Briefcase,
  FolderKanban,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Settings,
  Loader2,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { Logo } from "./Logo";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { listingQueries } from "@/shared/listings/queries/listingQueries";

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { logout, isLogoutPending } = useAuth();

  const queryClient = useQueryClient();

  const navItems = [
    {
      label: "Explore",
      icon: <Compass size={18} />,
      path: "/explore",
      prefetch: listingQueries.list(),
    },
    { label: "Portfolio", icon: <Briefcase size={18} />, path: "/portfolio" },
    { label: "History", icon: <FolderKanban size={18} />, path: "/history" },
    { label: "Settings", icon: <Settings size={18} />, path: "/settings" },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePrefetch = (options: any) => {
    if (options) {
      queryClient.prefetchQuery(options);
    }
  };

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 64 : 232 }}
      className="relative h-full bg-white flex flex-col font-nunito"
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-12 z-50 flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md cursor-pointer hover:bg-gray-50 text-gray-500"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <div className="h-18 flex items-center justify-center px-6  overflow-hidden mb-2">
        {!isCollapsed && <Logo size="small" />}
      </div>

      <nav className="flex-1 px-3 py-3 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onMouseEnter={() => handlePrefetch(item.prefetch)}
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold group relative transition-all duration-200 overflow-hidden"
            activeProps={{
              className:
                "bg-primary/5 text-primary shadow-sm ring-1 ring-primary/10",
            }}
            inactiveProps={{
              className: "text-gray-400 hover:bg-gray-50 hover:text-gray-900",
            }}
          >
            <div className="shrink-0 transition-transform duration-300 group-hover:scale-110">
              {item.icon}
            </div>

            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -5 }}
                  transition={{ duration: 0.2 }}
                  className="whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        ))}
      </nav>

      <div className="p-4 mt-auto mb-4 border-t border-gray-50">
        <button
          onClick={() => logout()}
          disabled={isLogoutPending}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer text-sm font-bold text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all group overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <div>
            {isLogoutPending ? (
              <Loader2 size={18} className="animate-spin text-red-500" />
            ) : (
              <LogOut size={18} />
            )}
          </div>

          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`whitespace-nowrap ${isLogoutPending ? "text-red-500" : ""}`}
              >
                {isLogoutPending ? "Logging out..." : "Logout"}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
};
export default Sidebar;
