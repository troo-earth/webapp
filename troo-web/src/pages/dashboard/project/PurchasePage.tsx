import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { ArrowLeft, Lock, ShieldCheck, Zap, TreeDeciduous, Globe, CreditCard, Keyboard } from 'lucide-react';
import { Link, useParams, useSearch } from '@tanstack/react-router';
import { useQuery, useMutation } from '@tanstack/react-query';
import LoadingScreen from '@/components/global/Loading';
import { Button } from '@/components/ui/buttons/Button';
import { createPaymentIntentApi, getProjectByIdApi } from '@/entities/projects/api/projectApi';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ total, isProcessing, setIsProcessing }: any) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsProcessing(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/purchase-success` },
    });
    if (error) setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="p-1 bg-white rounded-2xl border border-gray-100 shadow-inner">
        <PaymentElement options={{ layout: 'tabs' }} />
      </div>
      <Button 
        type="submit" 
        disabled={isProcessing}
        className="w-full bg-primary hover:bg-emerald-600 text-white py-6 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
      >
        {isProcessing ? "Processing..." : `Confirm & Pay $${total.toLocaleString()}`}
      </Button>
    </form>
  );
};

export const PurchasePage = () => {
  const { source, projectId } = useParams({ from: '/_authenticated/_dashboard-layout/$source/project/$projectId/purchase' });
  const { price } = useSearch({ from: '/_authenticated/_dashboard-layout/$source/project/$projectId/purchase' });
  
  const [amount, setAmount] = useState<number>(10);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectByIdApi(projectId),
  });

  const subtotal = amount * Number(price);
  const serviceFee = 0.50;
  const total = subtotal + serviceFee;

  const { mutate: initializePayment, isPending } = useMutation({
    mutationFn: () => createPaymentIntentApi(projectId, amount),
    onSuccess: (secret) => setClientSecret(secret),
  });

  // Reset payment intent if amount changes to ensure total matches
  useEffect(() => {
    setClientSecret(null);
  }, [amount]);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-white font-nunito">
      <header className="p-4 pt-6">
        <div className=" mx-auto flex items-center justify-between">
          <Link to="/$source/project/$projectId" params={{ source, projectId }}>
            <button className="flex items-center gap-2 text-gray-400 hover:text-primary transition-all font-bold text-sm cursor-pointer group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1" />
              <span>Back to Project</span>
            </button>
          </Link>
          <div className="flex items-center gap-1.5 px-4 py-1.5 bg-gray-50 rounded-full border border-gray-100">
            <Lock className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">SSL Secure</span>
          </div>
        </div>
      </header>

      <main className="mx-auto px-6 lg:px-12 pt-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-10">
            {/* Project Branding Section */}
            <section className="space-y-4">
              <div className="flex gap-2">
                <span className="bg-primary/10 text-primary text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">Transaction Registry: {project?.registry}</span>
              </div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-tight">
                Invest in <span className='text-primary italic'>{project?.fullName}</span>
              </h1>
              {/* <p className="text-gray-500 font-medium text-lg max-w-2xl leading-relaxed">
                Fund verified {project?.type?.title || 'nature-based'} solutions. 
              </p> */}
            </section>

            {/* Selection and Impact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Impact Card */}
              <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-gray-100 shadow-sm">
                        <Globe className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-black text-gray-900 text-lg">Climate Impact</h4>
                </div>
                <div className="space-y-2">
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">
                        Retiring <span className="text-primary font-black">{amount || 0} tonnes</span> is equivalent to offsetting:
                    </p>
                    <div className="flex items-center gap-2 text-gray-900 font-black text-xl">
                        <Zap className="w-5 h-5 text-yellow-500 fill-current" />
                        <span>{(amount * 2.4).toFixed(1)} long-haul flights</span>
                    </div>
                </div>
              </div>

              {/* Quantity Selection Card */}
              <div className="bg-white p-6 rounded-3xl border-2 border-gray-100 space-y-4">
                <h4 className="font-black text-gray-900 flex items-center gap-2">
                    <TreeDeciduous className="w-4 h-4 text-primary" /> Select Quantity
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {[10, 50, 100].map(v => (
                    <button 
                      key={v} 
                      onClick={() => setAmount(v)} 
                      className={`py-3 rounded-xl font-black text-sm transition-all border-2 ${amount === v ? 'border-primary bg-primary/5 text-primary' : 'border-gray-50 bg-gray-50 text-gray-400 hover:border-gray-200'}`}
                    >
                      {v}t
                    </button>
                  ))}
                </div>
                
                <div className="relative pt-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest absolute -top-1 left-3 bg-white px-1">Custom Amount</label>
                    <div className="relative">
                        <input 
                            type="number"
                            min="1"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-3 px-4 font-black text-gray-900 focus:outline-none focus:border-primary transition-colors pr-12"
                            placeholder="Enter tonnes..."
                        />
                        <Keyboard className="w-4 h-4 text-gray-300 absolute right-4 top-1/2 -translate-y-1/2" />
                    </div>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Terminal */}
          <div className="lg:col-span-4">
            <div className="sticky top-12">
              <div className={`bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] p-8 transition-all duration-500 ${clientSecret ? 'ring-2 ring-primary/20 shadow-primary/5' : ''}`}>
                <div className="mb-8">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Purchase Summary</span>
                    <div className="space-y-4 mt-6">
                        <div className="flex justify-between items-center text-sm">
                            <span className="font-bold text-gray-400">Carbon Credits ({amount}t)</span>
                            <span className="font-black text-gray-900">${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="font-bold text-gray-400">Service & Registry Fee</span>
                            <span className="font-black text-gray-900">${serviceFee.toFixed(2)}</span>
                        </div>
                        <div className="pt-6 border-t border-gray-50 flex justify-between items-end">
                            <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Due</span>
                            <span className="text-4xl font-black text-gray-900 tracking-tighter">${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                        </div>
                    </div>
                </div>

                <div className="relative">
                  {clientSecret ? (
                    <Elements stripe={stripePromise} options={{ 
                      clientSecret, 
                      appearance: { 
                        theme: 'flat',
                        variables: { colorPrimary: '#007473', fontFamily: 'Nunito, sans-serif' },
                      } 
                    }}>
                      <CheckoutForm total={total} isProcessing={isProcessing} setIsProcessing={setIsProcessing} />
                    </Elements>
                  ) : (
                    <Button 
                      onClick={() => initializePayment()}
                      disabled={isPending || amount <= 0}
                      className="w-full bg-primary text-white py-6 rounded-2xl font-black text-lg transition-all transform hover:scale-[1.02] shadow-xl flex items-center justify-center gap-3 cursor-pointer group"
                    >
                      {isPending ? "Configuring..." : "Initialize Payment"}
                      <Zap className={`w-5 h-5 ${isPending ? 'animate-pulse' : 'fill-current text-yellow-400 group-hover:rotate-12'} transition-transform`} />
                    </Button>
                  )}
                </div>

                <div className="mt-8 pt-8 border-t border-gray-50 space-y-4">
                    <div className="flex items-center gap-4 opacity-40 grayscale">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" className="h-4" alt="Stripe" />
                        <CreditCard className="w-4 h-4" />
                        <ShieldCheck className="w-4 h-4" />
                    </div>
                    
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
};