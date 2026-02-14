import { Outlet, Link } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'framer-motion'
import BgGradient from '../ui/global/BgGradient'
import { Header } from '../global/Header'
import Sidebar from '../global/Sidebar'
import { AlertCircle, ArrowRight } from 'lucide-react' 
import { authQueries } from '@/features/auth/query/authQuery'
import { useQuery } from '@tanstack/react-query'

const DashboardLayout = () => {
  const { data: user } = useQuery(authQueries.me());

  const isRestricted = !user?.org_id ;

  return (
    <div className="flex h-screen w-full bg-(--background-image-main-gradient) overflow-hidden font-nunito">      
      <Sidebar />
      <main className="flex-1 h-full flex flex-col relative">
        <Header/>
        
        <AnimatePresence>
          {isRestricted && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-5 pb-3"
            >
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-amber-900">Account Incomplete</p>
                    <p className="text-xs text-amber-700">Please complete onboarding to unlock all features and enable purchasing.</p>
                  </div>
                </div>
                
                <Link 
                  to="/onboarding"
                  className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  Onboard Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 pr-5 pb-5 overflow-hidden">
          <motion.div 
            className="h-full w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-xl shadow-teal-900/5 border border-white flex flex-col relative overflow-hidden"
          >
            <div className="flex-1 overflow-y-auto p-2 custom-scrollbar relative" id="main-scrollable-area">
              <BgGradient/>
              
              {isRestricted && (
                <div 
                  className="absolute inset-0 z-50 cursor-not-allowed"
                  style={{ height: 'max-content', minHeight: '100%' }}
                  onClick={(e) => e.stopPropagation()}
                />
              )}

              <Outlet />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout