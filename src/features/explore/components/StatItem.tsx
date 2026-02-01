
export const StatItem = ({ label, value, icon: Icon }: { label: string, value: string, icon: React.ComponentType<{ size?: number; strokeWidth?: number }> }) => (
    <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Icon size={20} strokeWidth={2.5} />
        </div>
        <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
            <p className="text-xl font-black text-gray-900 leading-none mt-0.5">{value}</p>
        </div>
    </div>
);