import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  status: 'idle' | 'authenticated' | 'unauthenticated';
  user: User | null;
}

const initialState: AuthState = {
  status: 'idle',
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<User>) => {
      state.status = 'authenticated';
      state.user = action.payload;
    },
    clearAuth: (state) => {
      state.status = 'unauthenticated';
      state.user = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;