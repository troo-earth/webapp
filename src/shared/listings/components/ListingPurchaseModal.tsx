import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  X,
  ShieldCheck,
  Zap,
  Globe,
  CreditCard,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/buttons/Button";
import { buyCreditsApi } from "@/shared/listings/api/listingApi";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { createPortal } from "react-dom";
import type { ListingPurchaseModalProps } from "../types/listingTypes";

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
      confirmParams: {
        return_url: `${window.location.origin}/purchase-success`,
      },
    });

    if (error) setIsProcessing(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500"
    >
      <div className="min-h-55">
        <PaymentElement options={{ layout: "tabs" }} />
      </div>
      <Button
        type="submit"
        disabled={isProcessing}
        className="w-full bg-primary hover:bg-emerald-600 text-white py-3 rounded-xl font-black text-md shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
      >
        {isProcessing ? "Processing..." : `Pay $${total.toLocaleString()}`}
      </Button>
    </form>
  );
};


export const PurchaseModal = ({
  isOpen,
  onClose,
  listingId,
  pricePerCredit,
  projectTitle,
  registry,
}: ListingPurchaseModalProps) => {
  const org_id = useSelector((state: RootState) => state.auth.org_id) ?? "";

  const [amount, setAmount] = useState<number>(10);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = amount * pricePerCredit;
  const serviceFee = 0.5;
  const total = subtotal + serviceFee;

  const { mutate: initializePayment, isPending } = useMutation({
    mutationFn: () => buyCreditsApi(listingId, org_id, amount),
    onSuccess: (secret) => setClientSecret(secret),
  });

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setClientSecret(null);
        setIsProcessing(false);
        setAmount(10);
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    setClientSecret(null);
  }, [amount]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 font-nunito">
      <div
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="relative z-101 bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:h-137.5 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer text-gray-500"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-full md:w-5/12 bg-gray-50/50 p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black bg-gray-200 text-primary px-2 py-0.5 rounded uppercase tracking-wider">
                {registry}
              </span>
            </div>
            <h2
              className="text-lg font-black text-gray-900 leading-tight line-clamp-2"
              title={projectTitle}
            >
              {projectTitle}
            </h2>
          </div>

          <div className="py-6 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                <span>Quantity</span>
                <span className="text-primary">{amount} tCO2e</span>
              </div>

              <div className="relative">
                <input
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-14 bg-white border border-gray-200 rounded-xl pl-4 pr-48 font-black text-gray-900 text-lg focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                />

                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  {[10, 50, 100].map((v) => (
                    <button
                      key={v}
                      type="button" 
                      onClick={() => setAmount(v)}
                      className={`
              h-9 min-w-14 rounded-lg text-xs font-black transition-all border flex items-center justify-center
              ${
                amount === v
                  ? "bg-primary border-primary text-white shadow-md shadow-primary/20"
                  : "bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100 hover:border-gray-200"
              }
            `}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-gray-200/60">
            <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
              <div className="p-2 bg-green-100 rounded-full text-green-700">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                Offset{" "}
                <span className="text-gray-900 font-bold">
                  {(amount * 2.4).toFixed(1)} flights
                </span>
                <br />
                <span className="text-[10px] opacity-70">
                  Based on avg. long-haul flight
                </span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-gray-300">
              <ShieldCheck className="w-3 h-3" /> Encrypted Transaction
            </div>
          </div>
        </div>

        <div className="w-full md:w-7/12 bg-white flex flex-col relative">
          <div className="px-6 md:px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white shrink-0 z-10">
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
              Checkout
            </span>
            <div className="text-right pr-8">
              <span className="block text-2xl font-black text-gray-900">
                ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              <span className="text-[10px] font-bold text-gray-400">
                Includes ${serviceFee} fee
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6">
            {clientSecret ? (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: "stripe",
                    variables: {
                      colorPrimary: "#007473",
                      fontFamily: "Nunito, sans-serif",
                      fontSizeBase: "14px",
                      spacingGridRow: "16px",
                    },
                  },
                }}
              >
                <CheckoutForm
                  total={total}
                  isProcessing={isProcessing}
                  setIsProcessing={setIsProcessing}
                />
              </Elements>
            ) : (
              <div className="h-full flex flex-col items-center justify-center space-y-5">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                  <CreditCard className="w-8 h-8 text-gray-300" />
                </div>
                <div className="text-center max-w-60">
                  <h4 className="font-bold text-gray-900 mb-1">
                    Confirm Details
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Review your purchase of <b>{amount} tonnes</b>. Click below
                    to load the secure payment gateway.
                  </p>
                </div>
                <Button
                  onClick={() => initializePayment()}
                  disabled={isPending || amount <= 0}
                  className="w-full max-w-xs bg-primary hover:bg-primary-dark text-white py-3.5 rounded-xl font-black text-sm shadow-xl shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isPending ? "Loading Gateway..." : "Proceed to Payment"}
                  {!isPending && (
                    <Zap className="w-4 h-4 fill-current text-yellow-400" />
                  )}
                </Button>
              </div>
            )}
          </div>

          <div className="p-4 text-center border-t border-gray-50 bg-gray-50/30 shrink-0">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
              className="h-3 opacity-20 mx-auto grayscale"
              alt="Stripe"
            />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};
