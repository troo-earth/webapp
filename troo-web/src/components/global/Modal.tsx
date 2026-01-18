import { X } from "lucide-react";

export const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F1F1F]/20 backdrop-blur-sm">
      <div className="bg-white rounded-[2.5rem] border border-white shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center">
          <h3 className="text-xl font-black text-[#0F1F1F]">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors"><X size={20}/></button>
        </div>
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
};