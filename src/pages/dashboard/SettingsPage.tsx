import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2, UserPlus, LogOut, Camera, CheckCircle2, Copy 
} from 'lucide-react';
import { Button } from '@/components/ui/buttons/Button';
import { InputField } from '@/components/ui/input/InputField';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { settingsQueries } from '@/features/settings/query/settingsQueries';
import LoadingScreen from '@/components/global/Loading';
import { Modal } from '@/components/global/Modal';
import { useUpdateOrganization, useUpdateUser, useInviteUser } from '@/features/settings/hooks/useSettingsMutations';
import { uploadLogoApi } from '@/features/auth/api/authApi';
import { inviteSchema, orgSchema, userSchema } from '@/features/settings/utils/settingsSchema';
import { notify } from '@/components/global/Toast';
import { useRouteContext } from '@tanstack/react-router';


const SettingsPage = () => {
  const { user } = useRouteContext({ from: '/_authenticated' });
  const isRestricted = !user?.org_id;
  
  const queryClient = useQueryClient();

  const [copied, setCopied] = useState(false);
  const [isOrgModalOpen, setIsOrgModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const userId = user?.user_id || '';
  const org_id = user?.org_id || '';

  const { data: org, isLoading: isOrgLoading } = useQuery(settingsQueries.viewOrgInfo());
  const { data: userInfo, isLoading: isUserLoading } = useQuery(settingsQueries.viewUserInfo(user?.user_id));

  const updateOrgMutation = useUpdateOrganization();
  const updateUserMutation = useUpdateUser();
  const inviteUserMutation = useInviteUser();

  const employees = org?.employees || [];
  const fileInputRef = useRef<HTMLInputElement>(null);  
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);


  const [orgForm, setOrgForm] = useState({ 
    name: '', 
    regId: '',
    logoUrl: '' 
  });

  const [userForm, setUserForm] = useState({ 
    fullName: '', 
    user_name: '',
    email: '',
    password: '', 
    confirmPassword: '' 
  });

  const [inviteForm, setInviteForm] = useState({ 
    org_id: org_id || '',
    email: '', 
    invited_by_user_id: userId || '',
  });


  useEffect(() => {
    if (user) {
      setUserForm(prev => ({ 
        ...prev, 
        fullName: userInfo?.fullname || '',
        email: userInfo?.email || '',
        user_name: userInfo?.user_name || ''
      }));
    }
    setInviteForm(prev => ({
      ...prev,
      invited_by_user_id: userId,
      org_id: org_id
    }));
  }, [user, userId, org_id]);

  useEffect(() => {
    if (org) {
      setOrgForm({ 
        name: org.org_name || '', 
        regId: org.registration_id || '',
        logoUrl: org.logo_url || '' 
      });
    }
  }, [org]);


  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingLogo(true);
      const publicUrl = await uploadLogoApi(file);
      setOrgForm(prev => ({ ...prev, logoUrl: publicUrl }));
    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to upload image"); 
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const handleOrgSave = () => {
    if (!org?.org_id) return;

    const validation = orgSchema.safeParse(orgForm);
    
    if (!validation.success) {
      alert(validation.error.issues[0].message);
      return;
    }
    
    updateOrgMutation.mutate({
      org_id: org.org_id,
      org_name: orgForm.name,
      registration_id: orgForm.regId,
      logo_url: orgForm.logoUrl   
    }, {
      onSuccess: () => {
        notify.success("Organization updated successfully");
        setIsOrgModalOpen(false); 
        queryClient.setQueryData(settingsQueries.viewOrgInfo().queryKey, (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            org_name: orgForm.name,
            registration_id: orgForm.regId,
            logo_url: orgForm.logoUrl
          };
        });
      }
    });
  };

  const handleUserSave = () => {
    const validation = userSchema.safeParse(userForm);

    if (!validation.success) {
      alert(validation.error.issues[0].message);
      return;
    }
    
    updateUserMutation.mutate({
      user_id: userId,
      fullname: userForm.fullName,
      email: userForm.email,
      user_name: userForm.user_name,
      password: userForm.password
    }, {
      onSuccess: () => {
        notify.success("Profile updated successfully");
        setUserForm(prev => ({ ...prev, password: '', confirmPassword: '' }));
      }
    });
  };

  const handleInvite = () => {
    const validation = inviteSchema.safeParse(inviteForm);

    if (!validation.success) {
      alert(validation.error.issues[0].message);
      return;
    }

    inviteUserMutation.mutate(inviteForm, {
      onSuccess: () => {
        setIsInviteModalOpen(false);
        setInviteForm(prev => ({ ...prev, email: '' }));
        alert("Invitation sent!");
      }
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isOrgLoading || isUserLoading) return <LoadingScreen/>;

  return (
    <div className="mx-auto space-y-16 p-8">
      
      {!isRestricted && (
      <div className='flex flex-col gap-16'>
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-black text-[#0F1F1F]">Organization Settings</h2>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Manage your entity profile</p>
          </div>
          <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white p-8 shadow-sm flex flex-col md:flex-row gap-10 items-center">
            <div className="w-32 h-32 rounded-4xl bg-linear-to-br from-primary/10 to-primary/5 border-2 border-dashed border-primary/20 flex items-center justify-center overflow-hidden relative">
              {org?.logo_url ? (
                <img src={org.logo_url} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <Building2 className="w-10 h-10 text-primary/40" />
              )}
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Legal Entity Name</label>
                <h3 className="text-2xl font-bold text-[#0F1F1F]">{org?.org_name}</h3>
              </div>
              <div className="flex flex-wrap gap-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Organization ID</label>
                  <div className="flex items-center gap-2 mt-1 bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/10">
                    <code className="text-xs font-bold text-primary">{org?.org_code}</code>
                    <button onClick={() => copyToClipboard(org?.org_code || '')} className="text-primary/60 hover:text-primary">
                      {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Registration ID</label>
                  <p className="text-sm font-bold text-[#0F1F1F] mt-1">{org?.registration_id}</p>
                </div>
                 <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Country</label>
                  <p className="text-sm font-bold text-[#0F1F1F] mt-1">{org?.country_code}</p>
                </div>
              </div>
            </div>
            <Button className='bg-primary' onClick={() => setIsOrgModalOpen(true)}>Edit Profile</Button>
          </div>
        </section>
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
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Username</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {employees.length > 0 ? (
                  employees.map((emp) => (
                    <tr key={emp.user_id} className="group hover:bg-white/50 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm uppercase">
                            {emp.fullname.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#0F1F1F]">{emp.fullname}</p>
                            <p className="text-xs text-gray-400">{emp.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-xs font-bold text-[#0F1F1F]">@{emp.user_name}</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="px-8 py-8 text-center text-sm text-gray-400">
                      No other members found in this organization.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      )}

      <section>
        <div className="mb-8">
          <h2 className="text-2xl font-black text-[#0F1F1F]">Personal Settings</h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Account identity & security</p>
        </div>
        <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white p-10 shadow-sm relative overflow-hidden">
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
              <InputField 
                label="Full Name" 
                value={userForm.fullName} 
                onChange={(e) => setUserForm({...userForm, fullName: e.target.value})}
              />
              <InputField 
                label="Email Address" 
                value={userForm.email} 
                onChange={(e) => setUserForm({...userForm, email: e.target.value})}
              />
              <InputField 
                label="Username" 
                value={userForm.user_name} 
                onChange={(e) => setUserForm({...userForm, user_name: e.target.value})} 
              />
            </div>
            <div className="pt-4">
              <div className="flex items-center gap-2 mb-8">
                <span className="h-px w-8 bg-primary/20"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">Security Update</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                <InputField 
                  label="New Password" 
                  type="password" 
                  placeholder="Leave blank to keep current" 
                  value={userForm.password}
                  onChange={(e) => setUserForm({...userForm, password: e.target.value})}
                />
                <InputField 
                  label="Confirm Password" 
                  type="password" 
                  placeholder="Confirm new password" 
                  value={userForm.confirmPassword}
                  onChange={(e) => setUserForm({...userForm, confirmPassword: e.target.value})}
                />
              </div>
            </div>
            <div className="flex items-center justify-between pt-6">
              <p className="text-[10px] text-gray-400 font-medium italic">
                Last updated: {userInfo?.updatedAt ? new Date(userInfo.updatedAt).toLocaleDateString() : 'N/A'}
              </p>
              <Button 
                className="bg-primary px-10" 
                onClick={handleUserSave}
                disabled={updateUserMutation.isPending}
              >
                {updateUserMutation.isPending ? 'Updating...' : 'Update Profile'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Modal 
        isOpen={isOrgModalOpen} 
        onClose={() => setIsOrgModalOpen(false)} 
        title="Edit Organization"
        onSave={handleOrgSave}
        saveLabel="Save Changes"
        isLoading={updateOrgMutation.isPending} 
        isSaveDisabled={isUploadingLogo}
      >
        <div className="space-y-8">
          <div className="flex flex-col items-center gap-4">
            
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleLogoChange}
            />

            <div 
              className="relative group cursor-pointer" 
              onClick={() => !isUploadingLogo && fileInputRef.current?.click()}
            >
              <div className={`w-24 h-24 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden group-hover:border-primary transition-colors ${isUploadingLogo ? 'opacity-50' : ''}`}>
                 
                 {isUploadingLogo ? (
                   <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                 ) : orgForm.logoUrl ? (
                   <img 
                     src={orgForm.logoUrl} 
                     alt="Logo Preview" 
                     className="w-full h-full object-cover group-hover:opacity-50 transition-opacity" 
                   />
                 ) : (
                   <Camera size={24} className="text-gray-300 group-hover:text-primary" />
                 )}

                 {!isUploadingLogo && orgForm.logoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera size={24} className="text-primary font-bold" />
                    </div>
                 )}
              </div>
              <p className="text-[10px] font-black uppercase text-center mt-2 text-gray-400">
                {isUploadingLogo ? 'Uploading...' : 'Update Logo'}
              </p>
            </div>
          </div>

          <InputField 
            label="Organization Name" 
            value={orgForm.name}
            onChange={(e) => setOrgForm({...orgForm, name: e.target.value})} 
          />
        </div>
      </Modal>

      <Modal 
        isOpen={isInviteModalOpen} 
        onClose={() => setIsInviteModalOpen(false)} 
        title="Invite Team Member"
      >
        <div className="space-y-8">
          <p className="text-sm text-gray-500">Send an invitation email to a new user to grant them access to <strong>{org?.org_name}</strong>.</p>
          <InputField 
            label="Email Address" 
            placeholder="colleague@example.com" 
            type="email" 
            value={inviteForm.email}
            onChange={(e) => setInviteForm({...inviteForm, email: e.target.value})}
          />
          {/* <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#005C5C]">Assign Role</label>
          </div> */}
          <Button 
            className="w-full bg-primary py-4" 
            onClick={handleInvite}
            disabled={inviteUserMutation.isPending}
          >
            {inviteUserMutation.isPending ? 'Sending...' : 'Send Invitation'}
          </Button>
        </div>
      </Modal>

    </div>
  );
};

export default SettingsPage;