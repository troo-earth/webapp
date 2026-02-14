import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2, UserPlus, Camera, CheckCircle2, Copy, 
  Mail, Edit2, Trash2, AlertCircle, RotateCcw, XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/buttons/Button';
import { InputField } from '@/components/ui/input/InputField';
import { useQuery } from '@tanstack/react-query';
import { settingsQueries } from '@/features/settings/query/settingsQueries';
import LoadingScreen from '@/components/global/Loading';
import { Modal } from '@/components/global/Modal';
import { 
  useUpdateOrganization, 
  useUpdateUser, 
  useInviteUser,
  useUpdateUserRole,
  useRemoveUserFromOrg, 
} from '@/features/settings/hooks/useSettingsMutations';

import { uploadLogoApi } from '@/features/auth/api/authApi';
import { inviteSchema, orgSchema, userSchema } from '@/features/settings/utils/settingsSchema';
import { notify } from '@/components/global/Toast';
import { useRouteContext } from '@tanstack/react-router';
import { SelectField } from '@/components/ui/input/SelectField';
import type { InviteUser } from '@/features/settings/types/settingsType';
import { canManage, ROLE_HIERARCHY } from '@/features/settings/utils/settingsUtils';
import { inviteQueries } from '@/shared/invitations/queries/inviteQueries';
import { useResendInvite, useRevokeInvite } from '@/shared/invitations/mutations/useInviteMutations';

const SettingsPage = () => {
  const { user } = useRouteContext({ from: '/_authenticated' });
  const isRestricted = !user?.org_id;
  const currentUserRole = user?.role;

  // Role visibility logic
  const canSeeInvitations = currentUserRole === 'admin' || currentUserRole === 'superadmin';

  // --- States ---
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('members');
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modals
  const [isOrgModalOpen, setIsOrgModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isResendModalOpen, setIsResendModalOpen] = useState(false);
  const [isRevokeModalOpen, setIsRevokeModalOpen] = useState(false);

  // Selections
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [selectedInvite, setSelectedInvite] = useState<any>(null);
  const [newRole, setNewRole] = useState<"admin" | "manager" | "viewer">('viewer');

  const userId = user?.user_id || '';
  const org_id = user?.org_id || '';

  // --- Queries ---
  const { data: org, isLoading: isOrgLoading } = useQuery(settingsQueries.viewOrgInfo());
  const { data: userInfo, isLoading: isUserLoading } = useQuery(settingsQueries.viewUserInfo(user?.user_id));
  const { data: inviteesInfo, isLoading: isInviteesLoading } = useQuery(inviteQueries.viewOrgInvitees());

  const employees = org?.employees || [];
  const pendingInvitations = inviteesInfo?.filter((inv) => inv.status === 'pending') || [];

  // --- Forms ---
  const [orgForm, setOrgForm] = useState({ name: '', regId: '', logoUrl: '' });
  const [userForm, setUserForm] = useState({ fullName: '', user_name: '', email: '', password: '', confirmPassword: '' });
  const [inviteForm, setInviteForm] = useState<InviteUser>({ email: '', role: '' });

  // --- Mutations ---
  const updateOrgMutation = useUpdateOrganization({ onSuccess: () => setIsOrgModalOpen(false) });
  const inviteUserMutation = useInviteUser({ onSuccess: () => setIsInviteModalOpen(false) });
  const updateUserRoleMutation = useUpdateUserRole({ onSuccess: () => setIsEditRoleOpen(false) });
  const removeUserMutation = useRemoveUserFromOrg({ onSuccess: () => setIsDeleteOpen(false) });
  const resendInviteMutation = useResendInvite();
  const revokeInviteMutation = useRevokeInvite();
  const updateUser = useUpdateUser({ 
    onSuccess: () => {
      notify.success("Profile updated successfully");
      setUserForm(prev => ({ ...prev, password: '', confirmPassword: '' }));
    } 
  });

  const ROLE_OPTIONS = [
    { value: 'admin', label: 'Admin' },
    { value: 'manager', label: 'Manager' },
    { value: 'viewer', label: 'Viewer' },
  ];

  const getManageableRoles = () => {
    const actorLevel = ROLE_HIERARCHY[currentUserRole as keyof typeof ROLE_HIERARCHY] || 0;
    return ROLE_OPTIONS.filter(option => {
      const targetLevel = ROLE_HIERARCHY[option.value as keyof typeof ROLE_HIERARCHY] || 0;
      return actorLevel > targetLevel;
    });
  };

  useEffect(() => {
    if (user) {
      setUserForm(prev => ({ 
        ...prev, 
        fullName: userInfo?.fullname || '',
        email: userInfo?.email || '',
        user_name: userInfo?.user_name || ''
      }));
    }
    setInviteForm(prev => ({ ...prev, invited_by_user_id: userId, org_id: org_id }));
  }, [user, userId, org_id, userInfo]);

  useEffect(() => {
    if (org) {
      setOrgForm({ 
        name: org.org_name || '', 
        regId: org.registration_id || '',
        logoUrl: org.logo_url || '' 
      });
    }
  }, [org]);

  // --- Logic Handlers ---

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
        setIsOrgModalOpen(false); 
      }
    });
  };

  const handleUserSave = () => {
    const validation = userSchema.safeParse(userForm);
    if (!validation.success) {
      return notify.error(validation.error.issues[0].message);
    }
    
    updateUser.mutate({
      user_id: user.user_id,
      fullname: userForm.fullName,
      email: userForm.email,
      user_name: userForm.user_name,
      password: userForm.password 
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
        setInviteForm(prev => ({ ...prev, email: '', role: '' }));
      }
    });
  };

  const handleResend = () => {
    if (!selectedInvite) return;
    resendInviteMutation.mutate({ email: selectedInvite.email }, {
      onSuccess: () => {
        setIsResendModalOpen(false);
      }
    });
  };

  const handleRevoke = () => {
    if (!selectedInvite) return;
    revokeInviteMutation.mutate({ email: selectedInvite.email }, {
      onSuccess: () => {
        setIsRevokeModalOpen(false);
      }
    });
  };

  const handleUpdateRole = () => {
    if (!selectedMember || !newRole) return;
    updateUserRoleMutation.mutate({
      user_id: selectedMember.user_id,
      role: newRole
    }, {
      onSuccess: () => {
        setIsEditRoleOpen(false);
      }
    });
  };

  const handleremoveUser = () => {
    if (!selectedMember) return;
    removeUserMutation.mutate(selectedMember.user_id, {
      onSuccess: () => {
        setIsDeleteOpen(false);
      }
    });
  };

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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isOrgLoading || isUserLoading || isInviteesLoading) return <LoadingScreen/>;

  return (
    <div className="mx-auto space-y-16 p-8">
      {!isRestricted && (
      <div className='flex flex-col gap-16'>
        
        {/* Organization Settings */}
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

        {/* User Access Section */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-black text-[#0F1F1F]">User Access</h2>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Manage team roles and permissions</p>
            </div>
            <div className="flex gap-3">
              {canSeeInvitations && (
                <Button 
                    className="bg-[#0F1F1F] text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-black/5"
                    onClick={() => setIsInviteModalOpen(true)}
                >
                    <UserPlus size={16} /> Invite User
                </Button>
              )}
            </div>
          </div>

          <div className="flex gap-8 mb-6 border-b border-gray-100 px-2">
            <button 
              onClick={() => setActiveTab('members')}
              className={`pb-4 text-sm font-black uppercase tracking-widest transition-all relative ${
                activeTab === 'members' ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Members
              {activeTab === 'members' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />}
            </button>
            
            {canSeeInvitations && pendingInvitations.length > 0 && (
              <button 
                onClick={() => setActiveTab('invitations')}
                className={`pb-4 text-sm font-black uppercase tracking-widest transition-all relative flex items-center gap-2 ${
                  activeTab === 'invitations' ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Invitations
                <span className="bg-gray-100 text-[#0F1F1F] px-2 py-0.5 rounded-full text-[10px]">
                  {pendingInvitations.length || 0}
                </span>
                {activeTab === 'invitations' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />}
              </button>
            )}
          </div>

          <div className="bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">User</th>
                  {activeTab === 'members' && <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Username</th>}
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Role</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {activeTab === 'members' ? (
                  employees.map((emp) => {
                    const hasPermission = canManage(currentUserRole, emp.role || 'viewer');
                    const isSelf = emp.user_id === userId;

                    return (
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
                          <td className="px-8 py-5">
                          <div className="flex items-center gap-1.5 bg-primary/10 w-fit px-3 py-1 rounded-full">
                              <span className="text-[10px] font-extrabold uppercase text-primary">{emp.role || 'Member'}</span>
                          </div>
                          </td>
                          <td className="px-8 py-5 text-right">
                              {hasPermission && !isSelf && (
                                  <div className="flex items-center justify-end gap-2">
                                      <button onClick={() => { setSelectedMember(emp); setNewRole(emp.role); setIsEditRoleOpen(true); }} className="p-2 hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded-lg transition-colors">
                                          <Edit2 size={16} />
                                      </button>
                                      <button onClick={() => { setSelectedMember(emp); setIsDeleteOpen(true); }} className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors">
                                          <Trash2 size={16} />
                                      </button>
                                  </div>
                              )}
                          </td>
                      </tr>
                    );
                  })
                ) : (
                  pendingInvitations.map((inv) => (
                    <tr key={inv.invite_id} className="group hover:bg-white/50 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                            <Mail size={16} />
                          </div>
                          <p className="text-sm font-bold text-[#0F1F1F]">{inv.email}</p>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-1.5 bg-blue-50 w-fit px-3 py-1 rounded-full">
                          <span className="text-[10px] font-black uppercase tracking-tight text-blue-600">{inv.role}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-2 ">
                          <button onClick={() => { setSelectedInvite(inv); setIsResendModalOpen(true); }} className="p-2 hover:bg-green-50 text-gray-400 hover:text-green-600 rounded-lg" title="Resend">
                            <RotateCcw size={16} />
                          </button>
                          <button onClick={() => { setSelectedInvite(inv); setIsRevokeModalOpen(true); }} className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg" title="Revoke">
                            <XCircle size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      )}

      {/* Personal Settings Section */}
      <section>
        <div className="mb-8">
          <h2 className="text-2xl font-black text-[#0F1F1F]">Personal Settings</h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Account identity & security</p>
        </div>
        <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white p-10 shadow-sm relative overflow-hidden">
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
              <InputField label="Full Name" value={userForm.fullName} onChange={(e) => setUserForm({...userForm, fullName: e.target.value})} />
              <InputField label="Email Address" value={userForm.email} onChange={(e) => setUserForm({...userForm, email: e.target.value})} />
              <InputField label="Username" value={userForm.user_name} onChange={(e) => setUserForm({...userForm, user_name: e.target.value})} />
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
              <Button className="bg-primary px-10" onClick={handleUserSave} disabled={updateUser.isPending}>
                {updateUser.isPending ? 'Updating...' : 'Update Profile'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modals remain exactly as defined previously but with restored logic... */}
      <Modal isOpen={isOrgModalOpen} onClose={() => setIsOrgModalOpen(false)} title="Edit Organization" onSave={handleOrgSave} saveLabel="Save Changes" isLoading={updateOrgMutation.isPending} isSaveDisabled={isUploadingLogo}>
        <div className="space-y-8">
          <div className="flex flex-col items-center gap-4">
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoChange}/>
            <div className="relative group cursor-pointer" onClick={() => !isUploadingLogo && fileInputRef.current?.click()}>
              <div className={`w-24 h-24 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden group-hover:border-primary transition-colors ${isUploadingLogo ? 'opacity-50' : ''}`}>
                 {isUploadingLogo ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div> : orgForm.logoUrl ? <img src={orgForm.logoUrl} alt="Logo" className="w-full h-full object-cover" /> : <Camera size={24} className="text-gray-300" />}
              </div>
            </div>
          </div>
          <InputField label="Organization Name" value={orgForm.name} onChange={(e) => setOrgForm({...orgForm, name: e.target.value})} />
        </div>
      </Modal>

      <Modal isOpen={isResendModalOpen} onClose={() => setIsResendModalOpen(false)} title="Resend Invitation">
        <div className="space-y-6">
          <p className="text-sm text-gray-500">Send a new invitation link to <strong>{selectedInvite?.email}</strong>?</p>
          <div className="flex gap-3 justify-end"><Button variant="ghost" onClick={() => setIsResendModalOpen(false)}>Cancel</Button><Button className="bg-primary" onClick={handleResend} isLoading={resendInviteMutation.isPending}>Resend Now</Button></div>
        </div>
      </Modal>

      <Modal isOpen={isRevokeModalOpen} onClose={() => setIsRevokeModalOpen(false)} title="Revoke Invitation">
        <div className="space-y-6">
           <div className="flex items-start gap-4 bg-orange-50 p-4 rounded-xl border border-orange-100">
              <AlertCircle className="text-orange-500 w-6 h-6 shrink-0" />
              <p className="text-xs text-orange-800">This will invalidate the existing invitation link for <strong>{selectedInvite?.email}</strong>.</p>
           </div>
           <div className="flex gap-3 justify-end"><Button variant="ghost" onClick={() => setIsRevokeModalOpen(false)}>Cancel</Button><Button className="bg-red-500 text-white" onClick={handleRevoke} isLoading={revokeInviteMutation.isPending}>Revoke Invite</Button></div>
        </div>
      </Modal>

      {/* Invite Modal */}
      <Modal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} title="Invite Team Member">
        <div className="space-y-8">
            <p className="text-sm text-gray-500">Send an invitation email to a new user for <strong>{org?.org_name}</strong>.</p>
            <div className="space-y-6">
              <InputField label="Email Address" type="email" value={inviteForm.email} onChange={(e) => setInviteForm({...inviteForm, email: e.target.value})}/>
              <SelectField label="Assign Role" options={getManageableRoles()} value={inviteForm.role} onChange={(val) => setInviteForm({...inviteForm, role: val})} />
            </div>
            <Button className="w-full bg-primary py-4 mt-4" onClick={handleInvite} isLoading={inviteUserMutation.isPending}>Send Invitation</Button>
        </div>
      </Modal>

      {/* Update Role Modal */}
      <Modal isOpen={isEditRoleOpen} onClose={() => setIsEditRoleOpen(false)} title="Update User Role" onSave={handleUpdateRole} saveLabel="Update Role" isLoading={updateUserRoleMutation.isPending}>
          <SelectField 
            label="Select New Role" 
            options={getManageableRoles()} 
            value={newRole} 
            // Cast the incoming string to your specific type
            onChange={(val) => setNewRole(val as "admin" | "manager" | "viewer")} 
          />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Remove Team Member">
        <div className="space-y-6">
           <div className="flex items-start gap-4 bg-red-50 p-4 rounded-xl border border-red-100">
              <AlertCircle className="text-red-500 w-6 h-6 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-red-800">Are you sure?</h4>
                <p className="text-xs text-red-600 mt-1">Permanently remove <strong>{selectedMember?.fullname}</strong>.</p>
              </div>
           </div>
           <div className="flex gap-3 justify-end pt-2">
             <Button variant="ghost" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
             <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={handleremoveUser} isLoading={removeUserMutation.isPending}>Remove Member</Button>
           </div>
        </div>
      </Modal>

    </div>
  );
};

export default SettingsPage;