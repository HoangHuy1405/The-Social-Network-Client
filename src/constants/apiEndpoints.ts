export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
  },
  user: {
    me: "/users/me",
  },
} as const;

export const PUBLIC_ENDPOINTS: string[] = [API_ENDPOINTS.auth.login, API_ENDPOINTS.auth.register];
