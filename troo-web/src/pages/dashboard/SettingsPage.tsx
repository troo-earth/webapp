import React, { useState } from 'react';
import { 
  Building2, UserPlus, Shield, Trash2, Copy, CheckCircle2, 
  MoreVertical, Globe, Save, X, LogOut, Camera
} from 'lucide-react';
import { Button } from '@/components/ui/buttons/Button';
import { InputField } from '@/components/ui/input/InputField';

// --- Modal Wrapper Component ---
const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => {
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

const SettingsPage = () => {
  const [copied, setCopied] = useState(false);
  const [isOrgModalOpen, setIsOrgModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  
  const [profile, setProfile] = useState({ fullName: "Sarah Chen", email: "sarah@acme.com", newPassword: "", confirmPassword: "" });
  const [orgDetails, setOrgDetails] = useState({ name: "Acme Corp Pte. Ltd.", id: "ORG-99284-X2", country: "Singapore", logo: null });

  const users = [
    { id: 1, name: "Sarah Chen", email: "sarah@acme.com", role: "Admin", status: "Active" },
    { id: 2, name: "James Wilson", email: "james@acme.com", role: "Write", status: "Active" },
    { id: 3, name: "Elena Rodriguez", email: "elena@acme.com", role: "Read", status: "Pending Invite" },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto space-y-16 p-8">
      
      {/* 1. ORGANIZATION PROFILE SECTION */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-black text-[#0F1F1F]">Organization Settings</h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Manage your entity profile</p>
        </div>

        <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white p-8 shadow-sm flex flex-col md:flex-row gap-10 items-center">
          <div className="w-32 h-32 rounded-[2rem] bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-dashed border-primary/20 flex items-center justify-center overflow-hidden">
            {orgDetails.logo ? <img src={orgDetails.logo} alt="Logo" className="w-full h-full object-cover" /> : <Building2 className="w-10 h-10 text-primary/40" />}
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Legal Entity Name</label>
              <h3 className="text-2xl font-bold text-[#0F1F1F]">{orgDetails.name}</h3>
            </div>
            <div className="flex flex-wrap gap-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Organization ID</label>
                <div className="flex items-center gap-2 mt-1 bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/10">
                  <code className="text-xs font-bold text-primary">{orgDetails.id}</code>
                  <button onClick={() => copyToClipboard(orgDetails.id)} className="text-primary/60 hover:text-primary">
                    {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Button className='bg-primary' onClick={() => setIsOrgModalOpen(true)}>Edit Profile</Button>
        </div>
      </section>

      {/* 2. USER MANAGEMENT SECTION */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-black text-[#0F1F1F]">User Access</h2>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Manage team roles and permissions</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-red-100 text-red-500 hover:bg-red-50 flex items-center gap-2">
              <LogOut size={16} /> Leave
            </Button>
            <Button className="bg-primary flex items-center gap-2" onClick={() => setIsInviteModalOpen(true)}>
              <UserPlus size={16} /> Invite User
            </Button>
          </div>
        </div>

        <div className="bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">User</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Role</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user) => (
                <tr key={user.id} className="group hover:bg-white/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">{user.name.charAt(0)}</div>
                      <div>
                        <p className="text-sm font-bold text-[#0F1F1F]">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5"><span className="text-xs font-bold text-[#0F1F1F]">{user.role}</span></td>
                  <td className="px-8 py-5">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right ">
                    <button className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. PERSONAL SETTINGS SECTION */}
      <section>
        <div className="mb-8">
          <h2 className="text-2xl font-black text-[#0F1F1F]">Personal Settings</h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Account identity & security</p>
        </div>
        <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white p-10 shadow-sm relative overflow-hidden">
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
              <InputField label="Full Name" value={profile.fullName} onChange={(e) => setProfile({...profile, fullName: e.target.value})} />
              <InputField label="Email Address" value={profile.email} disabled />
            </div>
            <div className="pt-4">
              <div className="flex items-center gap-2 mb-8">
                <span className="h-px w-8 bg-primary/20"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">Security Update</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                <InputField label="New Password" type="password" placeholder="Leave blank to keep current" />
                <InputField label="Confirm Password" type="password" placeholder="Confirm new password" />
              </div>
            </div>
            <div className="flex items-center justify-between pt-6">
              <p className="text-[10px] text-gray-400 font-medium italic">Last updated: 2 days ago</p>
              <Button className="bg-primary px-10">Update Profile</Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- MODALS --- */}
      
      {/* Edit Organization Modal */}
      <Modal isOpen={isOrgModalOpen} onClose={() => setIsOrgModalOpen(false)} title="Edit Organization">
        <div className="space-y-8">
          <div className="flex flex-col items-center gap-4">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden group-hover:border-primary transition-colors">
                 <Camera size={24} className="text-gray-300 group-hover:text-primary" />
              </div>
              <p className="text-[10px] font-black uppercase text-center mt-2 text-gray-400">Update Logo</p>
            </div>
          </div>
          <InputField 
            label="Organization Name" 
            value={orgDetails.name} 
            onChange={(e) => setOrgDetails({...orgDetails, name: e.target.value})} 
          />
          <Button className="w-full bg-primary py-4" onClick={() => setIsOrgModalOpen(false)}>Save Changes</Button>
        </div>
      </Modal>

      {/* Invite User Modal */}
      <Modal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} title="Invite Team Member">
        <div className="space-y-8">
          <p className="text-sm text-gray-500">Send an invitation email to a new user to grant them access to this organization.</p>
          <InputField label="Email Address" placeholder="colleague@acme.com" type="email" />
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#005C5C]">Assign Role</label>
            <select className="w-full py-3 bg-transparent border-b border-gray-200 text-sm focus:outline-none focus:border-primary">
              <option>Read-Only</option>
              <option>Write Access</option>
              <option>Admin</option>
            </select>
          </div>
          <Button className="w-full bg-primary py-4" onClick={() => setIsInviteModalOpen(false)}>Send Invitation</Button>
        </div>
      </Modal>

    </div>
  );
};

export default SettingsPage;