import { api } from "@/lib/axiosConfig";
import { handleError } from "@/utils/utils";
import type { InvitationsResponse, Invitees, InviteUser, OrganizationApiResponse, OrganizationData, UpdateOrg, UpdateUser, UserApiResponse, UserData } from "../types/settingsType";

export const getInfoByOrgIdApi = async (): Promise<OrganizationData> =>{
  try{
    const response = await api.get<OrganizationApiResponse>('/orgs/view-org');
    return response.data.data;
  } catch (error: unknown) {
    throw new Error(handleError(error, "Failed to fetch listing details."));
  }
}

export const getInfoByUserIdApi = async (userId:string): Promise<UserData> =>{
  try{
    const response = await api.get<UserApiResponse>(`/users/view-user/${userId}`);
    return response.data.data;
  } catch (error: unknown) {
    throw new Error(handleError(error, "Failed to fetch user details."));
  }
}

export const updateOrganizationApi = async (payload: UpdateOrg): Promise<OrganizationData> => {
  try {
    const response = await api.patch<{ data: OrganizationData }>(
      `/orgs/update-org/${payload.org_id}`, 
      payload
    );
    return response.data.data;
  } catch (error: unknown) {
    throw new Error(handleError(error, "Failed to update organization details."));
  }
};

export const updateUserProfileApi = async (payload: UpdateUser): Promise<UserData> => {
  try {
    const response = await api.put<{ data: UserData }>(
      `/users/update-user/${payload.user_id}`, 
      payload
    );
    return response.data.data;
  } catch (error: unknown) {
    throw new Error(handleError(error, "Failed to update user profile."));
  }
};

export const inviteUserApi = async (payload: InviteUser): Promise<void> => {
  try {
    await api.post<InviteUser>(
      '/invitations/create-invite', 
      payload
    );
  } catch (error: unknown) {
    throw new Error(handleError(error, "Failed to send invitation."));
  }
};

export const viewOrgInvitees = async (): Promise<Invitees[]> => {
  try{
    const response = await api.get<InvitationsResponse>(
      '/invitations/view-invites',
    );
    return response.data.data;
  } catch (error: unknown) {
    throw new Error(handleError(error, "Failed to get organization invitees"))
  }
}