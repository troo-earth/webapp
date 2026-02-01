import { CheckCircle2, XCircle, X, Download } from 'lucide-react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/buttons/Button';

type ModalType = 'success' | 'error';

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: ModalType;
  title: string;
  message: string;
  data?: {
    certificate_number?: string;
    retired_amount?: number;
    certificate_id?: string;
  };
  onDownload?: (id: string) => void;
  onRetry?: () => void;
  showDownloadButton?: boolean;
}

export const ActionModal = ({ 
  isOpen, 
  onClose, 
  type,
  title,
  message,
  data,
  onDownload,
  onRetry,
  showDownloadButton = false
}: ActionModalProps) => {
  if (!isOpen) return null;

  const config = {
    success: {
      icon: <CheckCircle2 size={40} className="text-green-500" />,
      iconBg: 'bg-green-50',
      primaryAction: showDownloadButton && data?.certificate_id && onDownload,
      primaryActionText: 'Download Certificate',
      primaryActionIcon: <Download size={18} />,
      closeText: showDownloadButton ? 'Return to Portfolio' : 'Close'
    },
    error: {
      icon: <XCircle size={40} className="text-red-500" />,
      iconBg: 'bg-red-50',
      primaryAction: onRetry,
      primaryActionText: 'Try Again',
      primaryActionIcon: null,
      closeText: 'Close'
    }
  }[type];

  return createPortal(
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      <div className="relative bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <div className="absolute top-6 right-6">
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-10 text-center">
          {/* Icon */}
          <div className={`w-20 h-20 ${config.iconBg} rounded-3xl flex items-center justify-center mx-auto mb-6`}>
            {config.icon}
          </div>

          {/* Title & Message */}
          <h3 className="text-3xl font-black text-secondary mb-2 tracking-tight">{title}</h3>
          <p 
            className="text-gray-500 font-medium mb-8" 
            dangerouslySetInnerHTML={{ __html: message }} 
          />

          {/* Certificate Details (Success Only) */}
          {type === 'success' && data?.certificate_number && (
            <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left border border-gray-100">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Certificate Number
                </span>
                <span className="text-xs font-bold text-secondary">
                  {data.certificate_number}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Status
                </span>
                <span className="text-[10px] font-black text-green-600 bg-green-100 px-2 py-0.5 rounded-full uppercase">
                  Verified
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            {/* Primary Action Button */}
            {config.primaryAction && (
              <Button
                variant="primary"
                onClick={() => {
                  if (type === 'success' && showDownloadButton && data?.certificate_id) {
                    onDownload?.(data.certificate_id);
                  } else if (type === 'error') {
                    onRetry?.();
                  }
                }}
                className="w-full py-6 bg-primary text-white text-xs uppercase font-black tracking-widest rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center gap-3"
              >
                {config.primaryActionIcon}
                {config.primaryActionText}
              </Button>
            )}

            {/* Close/Secondary Button */}
            <button 
              onClick={onClose}
              className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors py-2"
            >
              {config.closeText}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};