import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/buttons/Button';
import { toast } from 'sonner';
import { editListingApi } from '../api/listingsApi';
import { ActionModal } from '@/components/ui/modal/ActionModal';
import type { Listing } from '../types/listingTypes';

interface EditListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: Listing;
}

export const EditListingModal = ({ isOpen, onClose, listing }: EditListingModalProps) => {
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState(listing.quantity);
  const [price, setPrice] = useState(listing.pricePerUnit);
  
  // Modal State
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'success' | 'error';
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: 'success',
    title: '',
    message: '',
  });

  const updateMutation = useMutation({
    mutationFn: (data: { quantity: number; price: number }) => 
      editListingApi({
        listing_id: listing.id,
        price: data.price,
        quantity: data.quantity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      
      // Show success modal
      setModalState({
        isOpen: true,
        type: 'success',
        title: 'Listing Updated',
        message: `Your listing has been updated successfully. New quantity: <span class="text-primary font-bold">${quantity} tCO2e</span> at <span class="text-primary font-bold">$${price.toFixed(2)}</span> per unit.`,
      });
    },
    onError: (error: Error) => {
      // Show error modal
      setModalState({
        isOpen: true,
        type: 'error',
        title: 'Update Failed',
        message: error.message || 'Failed to update listing. Please try again.',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (quantity <= 0 || price <= 0) {
      toast.error('Quantity and price must be greater than 0');
      return;
    }

    updateMutation.mutate({ quantity, price });
  };

  const handleCloseActionModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
    if (modalState.type === 'success') {
      onClose(); // Close the edit modal too on success
    }
  };

  const handleRetry = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
    handleSubmit(new Event('submit') as any);
  };

  if (!isOpen) return null;

  return (
    <>
      {createPortal(
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" 
            onClick={onClose} 
          />
          
          <div className="relative bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
              >
                <X size={20} />
              </button>
              
              <h3 className="text-2xl font-black text-secondary tracking-tight">Edit Listing</h3>
              <p className="text-sm text-gray-500 mt-1">{listing.projectName}</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Quantity Input */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 block">
                  Quantity (tCO2e)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full bg-gray-50 border-2 border-gray-100 focus:border-primary rounded-2xl py-4 px-4 pr-4 text-lg font-bold outline-none transition-all"
                    placeholder="0.00"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2 ml-1">
                  Original: {listing.quantity.toLocaleString()} tCO2e
                </p>
              </div>

              {/* Price Input */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 block">
                  Price per Unit (USD)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-gray-50 border-2 border-gray-100 focus:border-primary rounded-2xl py-4 px-4 pr-4 text-lg font-bold outline-none transition-all"
                    placeholder="0.00"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2 ml-1">
                  Original: ${listing.pricePerUnit.toFixed(2)} per unit
                </p>
              </div>

              {/* Total Value Display */}
              <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  New Total Value
                </p>
                <p className="text-2xl font-black text-primary">
                  ${(quantity * price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={updateMutation.isPending}
                  className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={updateMutation.isPending}
                  disabled={updateMutation.isPending}
                  className="flex-1 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20"
                >
                  Update Listing
                </Button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* Action Modal for Success/Error */}
      <ActionModal
        isOpen={modalState.isOpen}
        onClose={handleCloseActionModal}
        type={modalState.type}
        title={modalState.title}
        message={modalState.message}
        onRetry={modalState.type === 'error' ? handleRetry : undefined}
        showDownloadButton={false}
      />
    </>
  );
};