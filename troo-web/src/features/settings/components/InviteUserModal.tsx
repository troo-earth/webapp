import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/buttons/Button';
import { InputField } from '@/components/ui/input/InputField';
import { Modal } from '@/components/global/Modal';

interface InviteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InviteUserModal = ({ isOpen, onClose }: InviteUserModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Invite Member">
      <div className="space-y-8">
        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
          <p className="text-xs leading-relaxed text-gray-600">
            Invite a new member to collaborate. They will receive an email to set up their account access.
          </p>
        </div>

        <div className="space-y-6">
          <InputField 
            label="Email Address" 
            placeholder="colleague@acme.com" 
            type="email" 
          />
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#005C5C]">
              Permission Role
            </label>
            <select className="w-full py-3 bg-transparent border-b border-gray-200 text-sm font-medium focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer">
              <option value="read">Read-Only</option>
              <option value="write">Write Access</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
        </div>

        <Button className="w-full bg-primary py-4 flex items-center justify-center gap-2 shadow-xl shadow-primary/10" onClick={onClose}>
          <UserPlus size={16} />
          Send Invitation
        </Button>
      </div>
    </Modal>
  );
};