import React, { useState } from 'react';
import { ArrowRight, Info, ShieldCheck, TreePine, ArrowLeft, ArrowLeftRight, Building2, MapPin, Calendar, Award } from 'lucide-react';
import { Button } from '@/components/ui/buttons/Button'; 
import { Link, useParams, useNavigate } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { getMyHoldingsApi } from '@/features/portfolio/api/myHoldingsApi';
import { transferCreditsApi } from '@/features/portfolio-actions/api/transferCreditsApi';
import { ActionModal } from '@/components/ui/modal/ActionModal';
import { toast } from 'sonner';
import LoadingScreen from '@/components/global/Loading';

const TransferCreditsPage = () => {
  const { projectId } = useParams({ from: '/_authenticated/_dashboard-layout/portfolio/transfer/$projectId' });
  const { user } = useAuth();
  const orgId = user?.org_id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [transferAmount, setTransferAmount] = useState(0);
  const [inputValue, setInputValue] = useState<string>('');
  const [recipientOrgCode, setRecipientOrgCode] = useState('');
  
  // Unified Modal State
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'success' | 'error';
    title: string;
    message: string;
    data?: any;
  }>({
    isOpen: false,
    type: 'success',
    title: '',
    message: '',
    data: null
  });
  
  // Fetch holdings to get the specific holding with available quantity
  const { data: holdings, isLoading: holdingsLoading } = useQuery({
    queryKey: ['my-holdings', orgId],
    queryFn: () => getMyHoldingsApi(),
    enabled: !!orgId,
  });

  // Transfer mutation
  const transferMutation = useMutation({
    mutationFn: transferCreditsApi,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['my-holdings'] });
      queryClient.invalidateQueries({ queryKey: ['history'] });
      queryClient.invalidateQueries({ queryKey: ['history', 'transfer'] });
      
      // Show success modal
      setModalState({
        isOpen: true,
        type: 'success',
        title: 'Transfer Complete',
        message: `You have successfully transferred <span class="text-primary font-bold">${transferAmount} tCO2e</span> to <span class="text-primary font-bold">${recipientOrgCode}</span>.`,
        data: response.data
      });
    },
    onError: (error: Error) => {
      setModalState({
        isOpen: true,
        type: 'error',
        title: 'Transfer Failed',
        message: error.message || 'Failed to transfer credits. Please try again.',
        data: null
      });
    },
  });

  const handleCloseModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
    if (modalState.type === 'success') {
      navigate({ to: '/portfolio' });
    }
  };

  const handleRetry = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
    handleTransfer();
  };

  // Find the specific holding for this project
  const holding = holdings?.find(h => h.projectId === projectId);

  if (holdingsLoading) {
    return <LoadingScreen />;
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
    registry: holding.serialPrefix,
    vintageYear: holding.vintage,
    methodology: holding.serialPrefix,
    projectStartYear: holding.vintage
  };

  const maxTransfer = project.availableQuantity;

  // Helper to handle manual typing and enforce limits - now with decimal support
  const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow empty string, digits, decimal point, and up to 2 decimal places
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setInputValue(value);
      
      if (value === '' || value === '.') {
        setTransferAmount(0);
        return;
      }

      const numValue = parseFloat(value);

      if (numValue > maxTransfer) {
        setTransferAmount(maxTransfer);
        setInputValue(maxTransfer.toString());
      } else {
        setTransferAmount(numValue);
      }
    }
  };

  // Handle slider change
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setTransferAmount(value);
    setInputValue(value.toString());
  };

  // Handle percentage buttons
  const handlePercentage = (percent: number) => {
    const amount = Math.floor((maxTransfer * percent) / 100);
    const formattedAmount = parseFloat(amount.toFixed(2));
    setTransferAmount(formattedAmount);
    setInputValue(formattedAmount.toString());
  };

  // Handle transfer submission
  const handleTransfer = () => {
    // Validate inputs
    if (!recipientOrgCode.trim() || !projectId || transferAmount <= 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    transferMutation.mutate({
      to_org_code: recipientOrgCode.trim().toUpperCase(),
      project_id: projectId,
      amount: transferAmount,
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-50/30">
      {/* ACTION MODAL */}
      <ActionModal 
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        type={modalState.type}
        title={modalState.title}
        message={modalState.message}
        data={modalState.data}
        onRetry={handleRetry}
        showDownloadButton={false}
      />

      <div className="mx-auto relative z-10">
        <header className="p-4 pt-6">
          <div className="mx-auto flex items-center justify-between">
            <Link to="/portfolio" className="flex items-center gap-2 text-gray-400 hover:text-primary transition-all font-bold text-sm cursor-pointer group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Portfolio</span>
            </Link>
          </div>
        </header>

        <div className='p-6'>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT: Project Details Card */}
            <div className="lg:col-span-5">
              <div className="bg-white/70 backdrop-blur-2xl rounded-[2rem] p-2 border border-white shadow-xl overflow-hidden">
                <div className="relative h-48 w-full rounded-[1.5rem] overflow-hidden mb-6">
                  <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2">
                    <TreePine size={14} className="text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{project.type}</span>
                  </div>
                </div>

                <div className="px-6 pb-8">
                  <h2 className="text-2xl font-bold text-[#0F1F1F] leading-tight mb-2">{project.name}</h2>
                  <div className="flex items-center gap-2 text-gray-500 mb-6">
                    <MapPin size={14} className="text-primary" />
                    <span className="text-sm font-medium">{project.location}</span>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Award size={14} className="text-primary/60" />
                        <span className="text-xs font-medium">Serial Prefix</span>
                      </div>
                      <span className="text-xs font-bold text-[#0F1F1F]">{project.registry}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar size={14} className="text-primary/60" />
                        <span className="text-xs font-medium">Vintage Year</span>
                      </div>
                      <span className="text-xs font-bold text-[#0F1F1F]">{project.vintageYear}</span>
                    </div>
                  </div>

                  {/* Current Inventory */}
                  <div className="bg-primary/5 rounded-2xl p-4 flex justify-between items-center border border-primary/10">
                    <div>
                      <p className="text-[10px] font-black text-primary uppercase tracking-tighter">Available to Transfer</p>
                      <p className="text-2xl font-black text-[#0F1F1F]">{project.availableQuantity.toLocaleString()} <span className="text-sm font-medium text-gray-400">{project.unit}</span></p>
                    </div>
                    <ShieldCheck className="text-primary w-8 h-8 opacity-40" />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Transfer Action Area */}
            <div className="lg:col-span-7">
              <div className="backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/80 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] flex flex-col h-full bg-white/40">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 mb-4 block">
                    Transfer Amount
                  </label>

                  {/* Input Group - Quantity */}
                  <div className="space-y-10">
                    <div className="relative group">
                      <input
                        type="text"
                        inputMode="decimal"
                        value={inputValue}
                        onChange={handleManualInput}
                        className="w-full bg-transparent text-5xl sm:text-7xl font-black text-[#0F1F1F] border-none focus:ring-0 p-0 placeholder:text-gray-200 transition-all outline-none"
                        placeholder="0"
                      />
                      <span className="absolute right-0 bottom-3 text-[10px] font-black text-gray-300 uppercase tracking-widest pointer-events-none">
                        {project.unit} • Max: {project.availableQuantity.toLocaleString(undefined, {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>

                    {/* Slider */}
                    <div className="relative py-2">
                      <input
                        type="range"
                        min="0"
                        max={maxTransfer}
                        step="0.01"
                        value={transferAmount}
                        onChange={handleSliderChange}
                        className="w-full h-1.5 bg-gray-200/50 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #5BA49F 0%, #5BA49F ${(transferAmount / maxTransfer) * 100}%, rgb(229 231 235 / 0.5) ${(transferAmount / maxTransfer) * 100}%, rgb(229 231 235 / 0.5) 100%)`
                        }}
                      />
                      <div className="flex justify-between mt-4 px-1">
                        {[0, 25, 50, 75, 100].map((percent) => (
                          <button 
                            key={percent}
                            onClick={() => handlePercentage(percent)}
                            className={`text-[9px] font-bold uppercase tracking-tighter transition-colors ${
                                Math.abs((transferAmount / maxTransfer) * 100 - percent) < 2 ? 'text-primary' : 'text-gray-400 hover:text-primary'
                            }`}
                          >
                            {percent}%
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Recipient Input */}
                  <div className="mt-12">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 mb-4 block">
                      Recipient Organization Code <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors">
                        <Building2 size={20} />
                      </div>
                      <input 
                        type="text"
                        placeholder="Enter organization code (e.g., TR-05B195)"
                        value={recipientOrgCode}
                        onChange={(e) => setRecipientOrgCode(e.target.value.toUpperCase())}
                        className="w-full bg-transparent border-b-2 border-gray-100 focus:border-primary py-4 pl-8 pr-4 text-lg font-bold placeholder:text-gray-200 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Integrated Footer Action */}
                <div className="mt-auto pt-10 border-t border-gray-100/50 flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">To be Transferred</p>
                    <p className="text-xl font-black text-primary flex items-center gap-2">
                      <ArrowLeftRight size={18} />
                      {transferAmount.toFixed(2)} <span className="text-xs font-medium opacity-60 uppercase">{project.unit}</span>
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button className="p-4 rounded-2xl bg-white/80 border border-gray-100 text-gray-400 hover:text-primary hover:border-primary/20 transition-all">
                      <Info size={20} />
                    </button>
                    
                    <Button
                      variant="primary"
                      onClick={handleTransfer}
                      isLoading={transferMutation.isPending}
                      className="flex-1 sm:flex-none px-8 py-6 bg-primary text-white text-xs uppercase font-black tracking-[0.15em] rounded-2xl group shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all"
                      disabled={transferAmount <= 0 || !recipientOrgCode.trim() || transferMutation.isPending}
                    >
                      Initiate Transfer
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

export default TransferCreditsPage;