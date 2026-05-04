export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
  },
  user: {
    me: "/users/me",
    profile: "/users/me/profile",
    changePassword: "/users/me/change-password",
    privacy: "/users/me/privacy",
    profileSummary: "/users/:id/profile-summary",
  },
  media: {
    signature: "/media/signature",
    register: "/media/register",
    registerBatch: "/media/register/batch",
  },
  post: {
    create: "/feed/posts",
  },
  feed: {
    list: "/feed",
  },
} as const;

export const PUBLIC_ENDPOINTS: string[] = [
  API_ENDPOINTS.auth.login,
  API_ENDPOINTS.auth.register,
  API_ENDPOINTS.feed.list,
  API_ENDPOINTS.user.profileSummary,
];
