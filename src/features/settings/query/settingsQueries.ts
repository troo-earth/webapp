import { queryOptions } from "@tanstack/react-query";
import { getInfoByOrgIdApi, getInfoByUserIdApi } from "../api/settingsApi";

export const settingsQueries = {
    viewOrgInfo : () => queryOptions({
        queryKey: ['view-org'],
        queryFn: () => getInfoByOrgIdApi(),
        staleTime: 30 * 60 * 1000,
        }),
        
    viewUserInfo : (userId:string) => queryOptions({
        queryKey: ['view-user'],
        queryFn: () => getInfoByUserIdApi(userId),
        staleTime: 30 * 60 * 1000,
        }),
}