import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState } from '../types/authTypes';
import type { User } from '@/types/global/types';


const initialState: AuthState = {
  status: 'idle',
  user_id: null,
  email: null,
  fullname: null,
  org_id: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (
      state, 
      action: PayloadAction<User>
    ) => {
      state.status = 'authenticated';
      state.user_id = action.payload.user_id;
      state.email = action.payload.email;
      state.fullname = action.payload.fullname;
      state.org_id = action.payload.org_id;
    },
    clearAuth: (state) => {
      state.status = 'unauthenticated';
      state.user_id = null;
      state.email = null;
      state.fullname = null;
      state.org_id = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;