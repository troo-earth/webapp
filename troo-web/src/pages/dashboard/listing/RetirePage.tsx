import { useState } from 'react';
import { Leaf, ArrowRight, Info, ShieldCheck, TreePine, Droplets, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/buttons/Button'; 
import { Link } from '@tanstack/react-router';

const RetireCreditsPage = () => {
  const [retireAmount, setRetireAmount] = useState(0);
  
  const project = {
    name: "Amazonian Rainforest Protection",
    location: "Brazil",
    availableQuantity: 4500,
    unit: "tCO2e",
    image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80&w=800",
    type: "Forestry"
  };

  const maxRetire = project.availableQuantity;
  const impactScore = (retireAmount * 1.2).toFixed(1); 

  return (
    <div className="min-h-screen relative overflow-hidden">
      
      <div className="mx-auto relative z-10">
        <header className="p-4 pt-6">
        <div className=" mx-auto flex items-center justify-between">
          <Link to="/my-listings">
            <button className="flex items-center gap-2 text-gray-400 hover:text-primary transition-all font-bold text-sm cursor-pointer group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1" />
              <span>Back to Holdings</span>
            </button>
          </Link>
          
        </div>
      </header>
        <div className='p-6'>
            <div className="mb-8">
              <h1 className="text-4xl font-black text-[#0F1F1F] tracking-tight">
                Retire <span className="text-primary">Credits</span>
              </h1>
              <p className="text-gray-500 font-medium mt-2">Permanently remove carbon credits from circulation to claim your impact.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
              {/* LEFT: Project Details Card */}
              <div className="lg:col-span-5">
                <div className="bg-white/70 backdrop-blur-2xl rounded-4xl p-2 border border-white shadow-xl overflow-hidden">
                  <div className="relative h-48 w-full rounded-3xl overflow-hidden mb-6">
                    <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2">
                      <TreePine size={14} className="text-primary" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{project.type}</span>
                    </div>
                  </div>
            
                  <div className="px-6 pb-8">
                    <h2 className="text-2xl font-bold text-[#0F1F1F] leading-tight mb-2">{project.name}</h2>
                    <div className="flex items-center gap-2 text-gray-500 mb-6">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-sm font-medium">{project.location}</span>
                    </div>
                    <div className="bg-primary/5 rounded-2xl p-4 flex justify-between items-center border border-primary/10">
                      <div>
                        <p className="text-[10px] font-black text-primary uppercase tracking-tighter">Your Holdings</p>
                        <p className="text-2xl font-black text-[#0F1F1F]">{project.availableQuantity.toLocaleString()} <span className="text-sm font-medium text-gray-400">{project.unit}</span></p>
                      </div>
                      <ShieldCheck className="text-primary w-8 h-8 opacity-40" />
                    </div>
                  </div>
                </div>
              </div>
              {/* RIGHT: Retirement Action Area */}
             <div className="lg:col-span-7">
  {/* Combined Main Card */}
  <div className="backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/80 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] flex flex-col h-full">
    
    <div >
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 mb-4 block">
        Retirement Amount
      </label>

      {/* Input Group */}
      <div className="space-y-10">
        {/* <div className="relative group">
          <input
            type="number"
            value={retireAmount || ''}
            onChange={(e) => setRetireAmount(Math.min(Number(e.target.value), maxRetire))}
            className="w-full bg-transparent text-7xl font-black text-[#0F1F1F] border-none focus:ring-0 p-0 placeholder:text-gray-200 transition-all"
            placeholder="0"
          />
          <span className="absolute right-0 bottom-3 text-sm font-black text-gray-300 uppercase tracking-widest pointer-events-none">
            {project.unit} Available: {project.availableQuantity.toLocaleString()}
          </span>
        </div> */}

        {/* Custom Range Slider */}
        <div className="relative py-2">
          <input
            type="range"
            min="0"
            max={maxRetire}
            value={retireAmount}
            onChange={(e) => setRetireAmount(Number(e.target.value))}
            className="w-full h-1.5 bg-gray-200/50 rounded-full appearance-none cursor-pointer accent-primary hover:accent-primary/80 transition-all"
          />
          <div className="flex justify-between mt-4 px-1">
            {[0, 25, 50, 75, 100].map((percent) => (
              <button 
                key={percent}
                onClick={() => setRetireAmount((maxRetire * percent) / 100)}
                className="text-[9px] font-bold text-gray-400 hover:text-primary transition-colors uppercase tracking-tighter"
              >
                {percent}%
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Grid */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="p-5 rounded-3xl bg-white/60 border border-white shadow-sm transition-transform hover:scale-[1.02]">
          <p className="text-[9px] font-black text-gray-400 uppercase mb-2 tracking-widest">Impact Offset</p>
          <p className="text-xl font-bold text-[#0F1F1F] flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-green-50">
              <Leaf size={14} className="text-green-600" />
            </div>
            {impactScore} <span className="text-xs font-medium text-gray-400">Acres</span>
          </p>
        </div>
        <div className="p-5 rounded-3xl bg-white/60 border border-white shadow-sm transition-transform hover:scale-[1.02]">
          <p className="text-[9px] font-black text-gray-400 uppercase mb-2 tracking-widest">Water Protected</p>
          <p className="text-xl font-bold text-[#0F1F1F] flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-50">
              <Droplets size={14} className="text-blue-600" />
            </div>
            {(retireAmount * 3).toLocaleString()} <span className="text-xs font-medium text-gray-400">Liters</span>
          </p>
        </div>
      </div>
    </div>

    {/* Integrated Footer Action */}
    <div className="mt-10 pt-2 border-t border-gray-100/50 flex flex-col sm:flex-row items-center gap-4">
      <div className="flex-1">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Selection</p>
        <p className="text-xl font-black text-primary">
          {retireAmount.toLocaleString()} <span className="text-xs font-medium opacity-60 uppercase">{project.unit}</span>
        </p>
      </div>
      
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button className="p-4 rounded-2xl bg-white/80 border border-gray-100 text-gray-400 hover:text-primary hover:border-primary/20 transition-all">
          <Info size={20} />
        </button>
        
        <Button
          variant="primary"
          className="flex-1 sm:flex-none px-8 py-6 bg-primary text-white text-xs uppercase font-black tracking-[0.15em] rounded-2xl group shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all"
          disabled={retireAmount <= 0}
        >
          Execute Retirement
          <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  </div>
</div>
            </div>
                  </div>
        </div>
    </div>
  );
};

export default RetireCreditsPage;