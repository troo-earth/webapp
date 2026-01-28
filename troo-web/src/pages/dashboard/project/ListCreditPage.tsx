import React, { useState } from 'react';
import { ArrowRight, Info, ShieldCheck, TreePine, ArrowLeft, Tag, DollarSign, BarChart3, MapPin, Calendar, Award } from 'lucide-react';
import { Button } from '@/components/ui/buttons/Button'; 
import { Link, useParams, useNavigate } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { getMyHoldingsApi } from '@/features/portfolio/api/myHoldingsApi';
import { sellCreditsApi } from '@/features/portfolio-actions/api/sellCreditsApi';
import { toast } from 'sonner';
import LoadingScreen from '@/components/global/Loading';

const ListCreditsPage = () => {
  const { projectId } = useParams({ from: '/_authenticated/_dashboard-layout/portfolio/list/$projectId' });
  const { user } = useAuth();
  const orgId = user?.org_id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [listAmount, setListAmount] = useState(0);
  const [unitPrice, setUnitPrice] = useState(15.00); 
  
  // Fetch holdings to get the specific holding with available quantity
  const { data: holdings, isLoading: holdingsLoading } = useQuery({
    queryKey: ['my-holdings', orgId],
    queryFn: () => getMyHoldingsApi(orgId!),
    enabled: !!orgId,
  });

  // Sell/List mutation
  const listMutation = useMutation({
    mutationFn: sellCreditsApi,
    onSuccess: (data) => {
      toast.success('Listing created successfully!');
      // Invalidate both holdings and listings queries
      queryClient.invalidateQueries({ queryKey: ['my-holdings'] });
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      // Navigate back to portfolio or listings page
      navigate({ to: '/portfolio' });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create listing');
    },
  });

  // Find the specific holding for this project
  const holding = holdings?.find(h => h.projectId === projectId);

  if (holdingsLoading) {
    return (
     <LoadingScreen />
    );
  }

  if (!holding || !orgId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/30">
        <div className="text-center">
          <p className="text-red-600 font-medium">Project not found in your holdings</p>
          <Link to="/portfolio">
            <button className="mt-4 text-primary hover:underline">Back to Portfolio</button>
          </Link>
        </div>
      </div>
    );
  }

  // Use the holding data directly
  const project = {
    name: holding.projectName,
    location: holding.location,
    availableQuantity: holding.quantity,
    unit: "tCO2e",
    image: holding.image,
    type: holding.impactFact,
    serialPrefix: holding.serialPrefix,
    vintage: holding.vintage,
  };

  const maxList = project.availableQuantity;
  const totalValue = (listAmount * unitPrice).toLocaleString(undefined, { minimumFractionDigits: 2 });

  // Helper to handle manual typing and enforce limits
  const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); 
    const numValue = value === '' ? 0 : Number(value);

    if (numValue > maxList) {
      setListAmount(maxList);
    } else {
      setListAmount(numValue);
    }
  };

  // Handle slider change
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListAmount(Number(e.target.value));
  };

  // Handle percentage buttons
  const handlePercentage = (percent: number) => {
    const amount = Math.floor((maxList * percent) / 100);
    setListAmount(amount);
  };

  // Handle price input
  const handlePriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setUnitPrice(value);
    }
  };

  // Handle listing submission
  const handlePostListing = () => {
    // Validate inputs
    if (!orgId || !projectId || listAmount <= 0 || unitPrice <= 0) {
      toast.error('Please fill in all required fields with valid values');
      return;
    }

    if (listAmount > project.availableQuantity) {
      toast.error(`Cannot list more than ${project.availableQuantity} ${project.unit}`);
      return;
    }

    console.log('Listing payload:', {
      org_id: orgId,
      project_id: projectId,
      amount: listAmount,
      price: unitPrice,
    });

    listMutation.mutate({
      org_id: orgId,
      project_id: projectId,
      amount: listAmount,
      price: unitPrice,
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-50/30">
      <div className="mx-auto relative z-10">
        <header className="p-4 pt-6">
          <div className="mx-auto flex items-center justify-between">
            <Link to="/portfolio">
              <button className="flex items-center gap-2 text-gray-400 hover:text-[#5BA49F] transition-all font-bold text-sm cursor-pointer group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Portfolio</span>
              </button>
            </Link>
          </div>
        </header>

        <div className='p-6'>
          <div className="mb-8">
            <h1 className="text-4xl font-black text-[#0F1F1F] tracking-tight">
              List <span className="text-[#5BA49F]">Credits</span>
            </h1>
            <p className="text-gray-500 font-medium mt-2">Set your price and list your environmental assets on the marketplace.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT: Project Details Card */}
            <div className="lg:col-span-5">
              <div className="bg-white/70 backdrop-blur-2xl rounded-[2rem] p-2 border border-white shadow-xl overflow-hidden">
                <div className="relative h-48 w-full rounded-[1.5rem] overflow-hidden mb-6">
                  <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2">
                    <TreePine size={14} className="text-[#5BA49F]" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{project.type}</span>
                  </div>
                </div>

                <div className="px-6 pb-8">
                  <h2 className="text-2xl font-bold text-[#0F1F1F] leading-tight mb-2">{project.name}</h2>
                  <div className="flex items-center gap-2 text-gray-500 mb-6">
                    <MapPin size={14} className="text-[#5BA49F]" />
                    <span className="text-sm font-medium">{project.location}</span>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Award size={14} className="text-[#5BA49F]/60" />
                        <span className="text-xs font-medium">Serial Prefix</span>
                      </div>
                      <span className="text-xs font-bold text-[#0F1F1F]">{project.serialPrefix}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar size={14} className="text-[#5BA49F]/60" />
                        <span className="text-xs font-medium">Vintage Year</span>
                      </div>
                      <span className="text-xs font-bold text-[#0F1F1F]">{project.vintage}</span>
                    </div>
                  </div>

                  {/* Available to Sell */}
                  <div className="bg-[#5BA49F]/5 rounded-2xl p-4 flex justify-between items-center border border-[#5BA49F]/10">
                    <div>
                      <p className="text-[10px] font-black text-[#5BA49F] uppercase tracking-tighter">Available to Sell</p>
                      <p className="text-2xl font-black text-[#0F1F1F]">{project.availableQuantity.toLocaleString()} <span className="text-sm font-medium text-gray-400">{project.unit}</span></p>
                    </div>
                    <ShieldCheck className="text-[#5BA49F] w-8 h-8 opacity-40" />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Listing Action Area */}
            <div className="lg:col-span-7">
              <div className="backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/80 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] flex flex-col h-full bg-white/40">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5BA49F]/60 mb-4 block">
                    Listing Amount
                  </label>

                  {/* Input Group - Quantity */}
                  <div className="space-y-10">
                    <div className="relative group">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={listAmount === 0 ? '' : listAmount.toLocaleString()}
                        onChange={handleManualInput}
                        className="w-full bg-transparent text-5xl sm:text-7xl font-black text-[#0F1F1F] border-none focus:ring-0 p-0 placeholder:text-gray-200 transition-all outline-none"
                        placeholder="0"
                      />
                      <span className="absolute right-0 bottom-3 text-[10px] font-black text-gray-300 uppercase tracking-widest pointer-events-none">
                        {project.unit} • Max: {project.availableQuantity.toLocaleString()}
                      </span>
                    </div>

                    {/* Slider */}
                    <div className="relative py-2">
                      <input
                        type="range"
                        min="0"
                        max={maxList}
                        step="1"
                        value={listAmount}
                        onChange={handleSliderChange}
                        className="w-full h-1.5 bg-gray-200/50 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#5BA49F] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#5BA49F] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #5BA49F 0%, #5BA49F ${(listAmount / maxList) * 100}%, rgb(229 231 235 / 0.5) ${(listAmount / maxList) * 100}%, rgb(229 231 235 / 0.5) 100%)`
                        }}
                      />
                      <div className="flex justify-between mt-4 px-1">
                        {[0, 25, 50, 75, 100].map((percent) => (
                          <button 
                            key={percent}
                            onClick={() => handlePercentage(percent)}
                            className={`text-[9px] font-bold uppercase tracking-tighter transition-colors ${
                                Math.abs((listAmount / maxList) * 100 - percent) < 2 ? 'text-[#5BA49F]' : 'text-gray-400 hover:text-[#5BA49F]'
                            }`}
                          >
                            {percent}%
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing Input Section */}
                  <div className="mt-12">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5BA49F]/60 mb-4 block">
                      Set Total Price (USD) <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-3 border-b-2 border-gray-100 focus-within:border-[#5BA49F] transition-colors pb-2">
                       <DollarSign size={24} className="text-gray-300" />
                       <input 
                          type="number"
                          step="0.01"
                          min="0"
                          value={unitPrice}
                          onChange={handlePriceInput}
                          className="w-full bg-transparent text-4xl font-black text-[#0F1F1F] border-none outline-none focus:ring-0 p-0 placeholder:text-gray-200"
                          placeholder="0.00"
                       />
                    </div>
                    <p className="text-xs text-gray-400 mt-2 ml-9">
                      Total price for all {listAmount.toLocaleString()} {project.unit}
                      {listAmount > 0 && ` (≈ $${(unitPrice / listAmount).toFixed(2)} per credit)`}
                    </p>
                  </div>

                  {/* Marketplace Metrics Grid */}
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="p-5 rounded-[1.5rem] bg-white/60 border border-white shadow-sm transition-transform hover:scale-[1.02]">
                      <p className="text-[9px] font-black text-gray-400 uppercase mb-2 tracking-widest">Total Value</p>
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-blue-50">
                          <BarChart3 size={14} className="text-blue-600" />
                        </div>
                        <p className="text-xl font-bold text-[#0F1F1F]">${unitPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                      </div>
                    </div>
                    <div className="p-5 rounded-[1.5rem] bg-white/60 border border-white shadow-sm transition-transform hover:scale-[1.02]">
                      <p className="text-[9px] font-black text-gray-400 uppercase mb-2 tracking-widest">Service Fee</p>
                      <p className="text-xl font-bold text-gray-300 italic">0.00%</p>
                    </div>
                  </div>
                </div>

                {/* Integrated Footer Action */}
                <div className="mt-auto pt-10 border-t border-gray-100/50 flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Estimated Revenue</p>
                    <p className="text-xl font-black text-[#5BA49F] flex items-center gap-2">
                      <Tag size={18} />
                      ${unitPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button className="p-4 rounded-2xl bg-white/80 border border-gray-100 text-gray-400 hover:text-[#5BA49F] transition-all">
                      <Info size={20} />
                    </button>
                    
                    <Button
                      variant="secondary"
                      onClick={handlePostListing}
                      isLoading={listMutation.isPending}
                      className="flex-1 sm:flex-none px-8 py-6 bg-[#5BA49F] text-white text-xs uppercase font-black tracking-[0.15em] rounded-2xl group shadow-lg shadow-[#5BA49F]/20 transition-all"
                      disabled={listAmount <= 0 || unitPrice <= 0 || listMutation.isPending}
                    >
                      Post Listing
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

export default ListCreditsPage;