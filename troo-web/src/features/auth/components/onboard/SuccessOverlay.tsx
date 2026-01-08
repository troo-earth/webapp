import { Building2, LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";

const SuccessOverlay = () => {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden">
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-25 h-25 rounded-full animate-expand-screen bg-[radial-gradient(circle_at_center,#051F1F_0%,#020C0C_100%)]"></div>
            </div>


            {showContent && (
                <div className="relative z-20 flex flex-col items-center text-center animate-content-slide-up">
                    
                    <div className="relative mb-10 group">
                        <div className="absolute inset-0 bg-primary rounded-full blur-[60px] opacity-30 animate-pulse"></div>
                        <div className="relative w-24 h-24 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden">
                            <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-size-[10px_10px]"></div>
                            <Building2 className="absolute text-white/10 w-16 h-16 translate-y-3 scale-110" strokeWidth={1} />
                            <div className="relative z-10 animate-float-slow">
                                <LayoutDashboard className="text-[#A3E635] w-10 h-10 drop-shadow-[0_0_15px_rgba(163,230,53,0.3)]" strokeWidth={1.5} />
                            </div>
                            <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-[#A3E635] rounded-full shadow-[0_0_10px_#A3E635] animate-ping"></div>
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6">
                        Orchestrating <br/>
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-[#A5F3FC] to-primary italic">
                            Sustainability.
                        </span>
                    </h1>
                    
                    <div className="w-64 h-0.5 bg-white/10 rounded-full overflow-hidden relative">
                        <div className="absolute inset-0 bg-white rounded-full animate-progress-fill box-shadow-[0_0_10px_white]"></div>
                    </div>

                    <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-4 animate-pulse">
                        Initializing Dashboard...
                    </p>
                </div>
            )}
        </div>
    );
};

export default SuccessOverlay;