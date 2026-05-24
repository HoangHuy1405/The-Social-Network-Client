import { store } from "@/store";

export const checkIsAuthenticated = (): boolean => {
  return !!store.getState().auth.accessToken;
};
