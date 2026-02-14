export interface Employee {
  user_id: string;
  fullname: string;
  email: string;
  user_name: string;
}

export interface OrganizationData {
  org_id: string;
  org_name: string;
  org_code: string;
  country_code: string;
  registration_id: string;
  logo_url: string;
  incorporation_doc_url: string;
  createdAt: string; 
  updatedAt: string;
  employees: Employee[];
}

export interface OrganizationApiResponse {
  status: string; 
  message: string;
  data: OrganizationData;
  metadata: Record<string, unknown>; 
}

export interface UserData {
  user_id: string;
  fullname: string;
  user_name: string;
  email: string;
  org_id: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserApiResponse {
  success: boolean;
  message: string;
  data: UserData;
}

export interface UpdateOrg {
  org_id: string;
  org_name: string;
  registration_id: string;
  logo_url?: string;
}

export interface UpdateUser {
  user_id: string;
  fullname: string;
  password?: string; 
  email?: string;
  user_name?: string;
}

export interface InviteUser {
  email: string;
  role: string;
}

export type InvitationRole = 'superadmin' | 'admin' | 'manager' | 'viewer'; 
export type InvitationStatus = 'pending' | 'accepted' | 'expired' | 'revoked';

export interface Invitees {
  invite_id: string;
  email: string;
  role: InvitationRole;
  status: InvitationStatus;
  created_by: string;
  expires_at: string;
  createdAt: string;  
}

export interface InvitationsResponse {
  status: 'success' | 'error';
  message: string;
  data: Invitees[];
  metadata: Record<string, unknown>;
}

export interface UpdateUserPayload {
  user_id: string;
  role: InvitationRole
}
