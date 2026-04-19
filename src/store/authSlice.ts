import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  accessToken: string | null;
  email: string | null;
  username: string | null;
  displayName: string | null;
  avatarUrl: string | null;
};

type LoginPayload = {
  accessToken: string;
  email: string;
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
};

const initialState: AuthState = {
  accessToken: null,
  email: null,
  username: null,
  displayName: null,
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
      state.displayName = action.payload.displayName;
      state.avatarUrl = action.payload.avatarUrl;
    },
    setAvatarUrl(state, action: PayloadAction<string>) {
      state.avatarUrl = action.payload;
    },
    logout() {
      return initialState;
    },
  },
});

export const { setCredentials, setAvatarUrl, logout } = authSlice.actions;
export type { AuthState, LoginPayload };
export default authSlice.reducer;
