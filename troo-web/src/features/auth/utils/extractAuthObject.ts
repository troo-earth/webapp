import type { User } from "@/types/global/types";

export const extractLoginAuthObject = (response: any) : User => {
    const userInfo = response.data?.data?.user;
    
    return {
      user_id: userInfo?.user_id,
      email: userInfo?.email,
      fullname: userInfo?.fullname,
    }
};

export const extractRegisterAuthObject = (response: any) : User => {
    const userInfo = response.data?.data;
    
    return {
      user_id: userInfo?.user_id,
      email: userInfo?.email,
      fullname: userInfo?.fullname,
    }
};