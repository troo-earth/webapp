import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, AlertTriangle } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/buttons/Button';
import { cancelListingApi } from '../api/listingsApi';
import { ActionModal } from '@/components/ui/modal/ActionModal';
import type { Listing } from '../types/listingTypes';

interface CancelListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: Listing;
}

export const CancelListingModal = ({ isOpen, onClose, listing }: CancelListingModalProps) => {
  const queryClient = useQueryClient();
  
  // Action Modal State
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

  const cancelMutation = useMutation({
    mutationFn: () => cancelListingApi(listing.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      queryClient.invalidateQueries({ queryKey: ['my-holdings'] });
      
      // Show success modal
      setModalState({
        isOpen: true,
        type: 'success',
        title: 'Listing Canceled',
        message: `Your listing for <span class="text-primary font-bold">${listing.quantity} tCO2e</span> has been canceled successfully. Credits have been returned to your portfolio.`,
      });
    },
    onError: (error: any) => {
      // Show error modal
      setModalState({
        isOpen: true,
        type: 'error',
        title: 'Cancellation Failed',
        message: error.message || 'Failed to cancel listing. Please try again.',
      });
    },
  });

  const handleCloseActionModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
    if (modalState.type === 'success') {
      onClose(); // Close the cancel confirmation modal too on success
    }
  };

  const handleRetry = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
    cancelMutation.mutate();
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
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 z-10"
            >
              <X size={20} />
            </button>

            <div className="p-10 text-center">
              {/* Warning Icon */}
              <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <AlertTriangle size={40} className="text-red-500" />
              </div>

              {/* Title & Message */}
              <h3 className="text-3xl font-black text-secondary mb-2 tracking-tight">
                Cancel Listing?
              </h3>
              <p className="text-gray-500 font-medium mb-8">
                Are you sure you want to cancel this listing? The credits will be returned to your portfolio.
              </p>

              {/* Listing Details */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Project
                  </span>
                  <span className="text-sm font-bold text-secondary">
                    {listing.projectName}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Quantity
                  </span>
                  <span className="text-sm font-bold text-secondary">
                    {listing.quantity.toLocaleString()} tCO2e
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Listed Value
                  </span>
                  <span className="text-sm font-bold text-secondary">
                    ${listing.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <Button
                  variant="primary"
                  onClick={() => cancelMutation.mutate()}
                  isLoading={cancelMutation.isPending}
                  disabled={cancelMutation.isPending}
                  className="w-full py-6 bg-red-500 hover:bg-red-600 text-white text-xs uppercase font-black tracking-widest rounded-2xl shadow-lg shadow-red-500/20"
                >
                  Yes, Cancel Listing
                </Button>
                <button 
                  onClick={onClose}
                  disabled={cancelMutation.isPending}
                  className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors py-2 disabled:opacity-50"
                >
                  Keep Listing
                </button>
              </div>
            </div>
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