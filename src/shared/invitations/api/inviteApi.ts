import type { InvitationsResponse, Invitees, InviteUser } from "@/features/settings/types/settingsType";
import { api } from "@/lib/axiosConfig";
import { handleError } from "@/utils/utils";


export const checkInviteTokenApi = async (token: string) => {
  const payload = { token: token };
  try {
    const response = await api.post("/invitations/public/check-token", payload);
    return response.data;
  } catch (error: unknown) {
    throw new Error(handleError(error, "Invalid or expired invitation token."));
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

export const resendInviteApi = async (payload: { email: string }): Promise<void> => {
  try {
    await api.post<{ email: string }>(
      '/invitations/resend-invite', 
      payload
    );
  } catch (error: unknown) {
    throw new Error(handleError(error, "Failed to resend invitation."));
  }
};

export const revokeInviteApi = async (payload: { email: string }): Promise<void> => {
  try {
    await api.patch<{ email: string }>(
      '/invitations/revoke-invite', 
      payload
    );
  } catch (error: unknown) {
    throw new Error(handleError(error, "Failed to revoke invitation."));
  }
};