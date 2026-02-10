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

export interface UpdateOrgDTO {
  org_id: string;
  org_name: string;
  registration_id: string;
  logo_url?: string;
}

export interface UpdateUserDTO {
  user_id: string;
  fullname: string;
  password?: string; 
  email?: string;
  user_name?: string;
}

export interface InviteUserDTO {
  email: string;
  role: string;
}
