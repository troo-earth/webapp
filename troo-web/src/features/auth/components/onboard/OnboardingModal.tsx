import React, { useState } from 'react';
import { ArrowRight, UploadCloud, ImagePlus, Building2, FileCheck, X} from 'lucide-react';
import BgGradient from '@/components/ui/BgGradient';
import { Button } from '@/components/ui/Button';
import { InputField } from '@/components/ui/InputField';

interface OnboardingModalProps {
  onSuccess: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    country: '',
    registrationId: '',
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
        setIsLoading(false);
        onSuccess();
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'proof') => {
    if (e.target.files && e.target.files[0]) {
      if (type === 'logo') setLogoFile(e.target.files[0]);
      else setProofFile(e.target.files[0]);
    }
  };

  return (
    <div className="relative w-full max-w-4xl bg-white/60 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,116,115,0.08)] border border-white/80 overflow-hidden">
      
      <BgGradient variant='secondary'/>

      <div className="relative z-10">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          <div className="md:col-span-4 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-primary/10 pb-8 md:pb-0 md:pr-8">
             <div className="mb-8">
                <h3 className="text-2xl font-black text-primary-gradient tracking-tight leading-tight">
                  Setup <br/> Organization
                </h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-2">
                  Entity Verification
                </p>
             </div>

             <div className="relative group w-full max-w-35 aspect-square">
                <input type="file" accept="image/*" className="hidden" id="logo-upload" onChange={(e) => handleFileChange(e, 'logo')} />
                <label htmlFor="logo-upload" className={`w-full h-full rounded-3xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${logoFile ? 'border-primary bg-white shadow-xl scale-100' : 'border-primary/20 bg-white/40 hover:border-primary/50 hover:bg-white/60 hover:scale-[1.02]'}`}>
                  {logoFile ? (
                    <>
                        <Building2 className="w-10 h-10 text-primary mb-2" />
                        <span className="text-[10px] font-bold text-primary truncate w-20 text-center">{logoFile.name}</span>
                    </>
                  ) : (
                    <>
                        <ImagePlus className="w-8 h-8 text-primary/40 mb-2 group-hover:text-primary transition-colors" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-primary/60 group-hover:text-primary">Upload Logo</span>
                    </>
                  )}
                </label>
                {logoFile && (
                    <button type="button" onClick={() => setLogoFile(null)} className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full p-1.5 shadow-md hover:bg-red-50 border border-gray-100">
                        <X size={14} />
                    </button>
                )}
             </div>
          </div>

          <div className="md:col-span-8 flex flex-col justify-center space-y-6">
            <InputField label="Legal Entity Name" placeholder="Acme Corp Pte. Ltd." type="text" value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InputField label="Country" placeholder="Singapore" type="text" value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} />
                <InputField label="Registration / Tax ID" placeholder="UEN 202412345X" type="text" value={formData.registrationId} onChange={(e) => setFormData({...formData, registrationId: e.target.value})} />
            </div>

            <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-[#005C5C] mb-2 block">Proof of Registration</label>
                <div className="relative">
                    <input type="file" accept=".pdf,.jpg,.png" className="hidden" id="proof-upload" onChange={(e) => handleFileChange(e, 'proof')} />
                    {!proofFile ? (
                        <label htmlFor="proof-upload" className="w-full h-16 rounded-xl border-2 border-dashed border-primary/20 bg-[#F8FAFA]/50 hover:bg-white/60 hover:border-primary/40 cursor-pointer flex items-center justify-center gap-3 transition-all group">
                            <UploadCloud className="w-5 h-5 text-primary/40 group-hover:text-primary" />
                            <div className="text-left"><span className="text-xs font-bold text-[#0F1F1F]">Click to upload document</span><span className="text-[9px] font-medium text-gray-400 ml-2">(PDF/Image)</span></div>
                        </label>
                    ) : (
                        <div className="w-full h-16 rounded-xl border border-primary/30 bg-white/80 flex items-center px-4 gap-4 shadow-sm">
                            <div className="w-8 h-8 rounded-lg bg-[#E0F0F0] flex items-center justify-center text-primary"><FileCheck size={16} /></div>
                            <div className="flex-1 min-w-0"><p className="text-xs font-bold text-[#0F1F1F] truncate">{proofFile.name}</p><p className="text-[9px] font-medium text-green-600 uppercase tracking-wider">Ready to upload</p></div>
                            <button type="button" onClick={() => setProofFile(null)} className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors"><X size={16} /></button>
                        </div>
                    )}
                </div>
            </div>

            <div className="pt-4 flex items-center justify-between gap-4">
                <Button 
                    type="button" 
                    variant="ghost"
                    disabled={isLoading}
                    onClick={() => console.log("Skip clicked")} 
                >
                    Skip for now
                </Button>
                
                <Button 
                    type="submit" 
                    variant="primary" 
                    isLoading={isLoading}
                    className="text-xs uppercase tracking-widest"
                >
                    Verify & Continue
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};