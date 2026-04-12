import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  accessToken: string | null;
  email: string | null;
  username: string | null;
  avatarUrl: string | null;
};

type LoginPayload = {
  accessToken: string;
  email: string;
  username: string;
  avatarUrl: string | null;
};

const initialState: AuthState = {
  accessToken: null,
  email: null,
  username: null,
  avatarUrl: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<LoginPayload>) {
      state.accessToken = action.payload.accessToken;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.avatarUrl = action.payload.avatarUrl;
    },
    logout() {
      return initialState;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export type { AuthState, LoginPayload };
export default authSlice.reducer;
