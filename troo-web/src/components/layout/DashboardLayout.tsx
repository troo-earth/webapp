import { Outlet } from '@tanstack/react-router'
import { Sidebar } from '../global/Sidebar'
import { motion } from 'framer-motion'
import BgGradient from '../ui/global/BgGradient'
import { Header } from '../global/Header'

const DashboardLayout = () => {

  return (
    <div className="flex h-screen w-full bg-(--background-image-main-gradient) overflow-hidden font-nunito">      
      <Sidebar />
      <main className="flex-1 h-full flex flex-col relative">
        <Header/>
        <div className="flex-1 pr-5 pb-5 overflow-hidden">
          <motion.div 
            className="h-full w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-xl shadow-teal-900/5 border border-white flex flex-col overflow-hidden"
          >
            <div className="flex-1 overflow-y-auto p-2 custom-scrollbar" >
              <BgGradient/>
              <Outlet />
            </div>
          </motion.div>
        </div>

      </main>
    </div>
  )
}

export default DashboardLayout