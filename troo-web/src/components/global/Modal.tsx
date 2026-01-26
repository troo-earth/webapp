import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { Button } from '@/components/ui/buttons/Button'; 
import type { ModalProps } from "@/types/global/types";

export const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  onSave,
  saveLabel = "Save Changes",
  isLoading = false,
  isSaveDisabled = false 
}: ModalProps & { isSaveDisabled?: boolean }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#0F1F1F]/20 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative bg-white rounded-[2.5rem] border border-white shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center shrink-0">
          <h3 className="text-xl font-black text-[#0F1F1F]">{title}</h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <X size={20}/>
          </button>
        </div>

        <div className="p-8 overflow-y-auto">
          {children}
        </div>

        {onSave && (
          <div className="p-8 border-t border-gray-50 bg-gray-50/50 shrink-0">
            <Button 
              onClick={onSave} 
              disabled={isLoading || isSaveDisabled} 
              className="w-full bg-primary py-4 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Saving...' : saveLabel}
            </Button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};