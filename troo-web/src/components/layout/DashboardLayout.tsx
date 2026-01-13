import { Outlet, useLocation } from '@tanstack/react-router'
import { Sidebar } from '../global/Sidebar'
import { motion, AnimatePresence } from 'framer-motion'
import BgGradient from '../ui/global/BgGradient'
import { Header } from '../global/Header'

const DashboardLayout = () => {
  const location = useLocation()

  return (
    <div className="flex h-screen w-full bg-(--background-image-main-gradient) overflow-hidden font-nunito">      
      <Sidebar />
      <main className="flex-1 h-full flex flex-col relative">
        <Header/>
        <div className="flex-1 pr-5 pb-5 overflow-hidden">
          <motion.div 
            layout
            className="h-full w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-xl shadow-teal-900/5 border border-white flex flex-col overflow-hidden"
          >
            <div className="flex-1 overflow-y-auto p-2 custom-scrollbar" >
              <BgGradient/>
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

      </main>
    </div>
  )
}

export default DashboardLayout