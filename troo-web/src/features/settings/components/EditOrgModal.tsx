import React from 'react';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/buttons/Button';
import { InputField } from '@/components/ui/input/InputField';
import { Modal } from '@/components/global/Modal';

interface EditOrgModalProps {
  isOpen: boolean;
  onClose: () => void;
  orgName: string;
  onSave: (newName: string) => void;
}

export const EditOrgModal = ({ isOpen, onClose, orgName, onSave }: EditOrgModalProps) => {
  const [tempName, setTempName] = React.useState(orgName);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Organization">
      <div className="space-y-8">
        <div className="flex flex-col items-center gap-4">
          <div className="relative group cursor-pointer">
            <div className="w-24 h-24 rounded-4xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden group-hover:border-primary/50 transition-all duration-300">
              <Camera size={24} className="text-gray-300 group-hover:text-primary transition-colors" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-center mt-3 text-gray-400 group-hover:text-primary">
              Change Logo
            </p>
          </div>
        </div>

        <InputField 
          label="Organization Name" 
          value={tempName} 
          onChange={(e) => setTempName(e.target.value)} 
        />

        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1 rounded-2xl py-4" onClick={onClose}>
            Cancel
          </Button>
          <Button className="flex-2 bg-primary py-4 shadow-lg shadow-primary/20" onClick={() => onSave(tempName)}>
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
};