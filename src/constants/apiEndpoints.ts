export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
  },
  user: {
    me: "/users/me",
  },
  media: {
    signature: "/media/signature",
    register: "/media/register",
  },
} as const;

export const PUBLIC_ENDPOINTS: string[] = [API_ENDPOINTS.auth.login, API_ENDPOINTS.auth.register];
