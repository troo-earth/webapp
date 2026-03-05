import { Info } from "lucide-react";

export const SimulationBanner = () => {
    return (
        <div className="px-5 pb-2">
            <div className="bg-primary/5 border border-primary/15 rounded-xl p-3 flex items-center gap-3 shadow-sm">
                <div className="bg-primary/10 p-2 rounded-lg">
                    <Info className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <p className="text-sm font-bold text-secondary">Simulation Mode</p>
                    <p className="text-xs text-secondary/70">
                        This is a simulation — no real trades are being executed. Certificates shown are for demonstration purposes only and are not real.
                    </p>
                </div>
            </div>
        </div>
    );
};
