import { api } from "@/lib/axiosConfig";
import { handleError } from "@/utils/utils";
import type { OrganizationApiResponse, OrganizationData, UpdateOrg, UpdateUser, UpdateUserPayload, UserData } from "../types/settingsType";

export const getInfoByOrgIdApi = async (): Promise<OrganizationData> =>{
  try{
    const response = await api.get<OrganizationApiResponse>('/orgs/view-org');
    return response.data.data;
  } catch (error: unknown) {
    throw new Error(handleError(error, "Failed to fetch listing details."));
  }
}

export const getInfoByUserIdApi = async (): Promise<UserData> =>{
  try{
    const response = await api.get(`/users/view-user`);
    return response.data.data.user;
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
      `/users/update-user`, 
      payload
    );
    return response.data.data;
  } catch (error: unknown) {
    throw new Error(handleError(error, "Failed to update user profile."));
  }
};


  export const updateUserRoleApi = async (payload: UpdateUserPayload): Promise<void> => {
    try {
      const response = await api.patch('/users/update-role', payload);
      return response.data;
    } catch (error: unknown) {
      throw new Error(handleError(error, "User role update failed."));
    }
  };

  export const removeUserFromOrgApi = async (userId: string): Promise<void> => {
    const payload = { user_id: userId };
    try {
      const response = await api.delete('/users/remove-user', { data: payload });
      return response.data;
    } catch (error: unknown) {
      throw new Error(handleError(error, "Failed to remove user from organization."));
    }
  };