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
    publicProfile: "/users/@:username",
  },
  media: {
    signature: "/media/signature",
    register: "/media/register",
    registerBatch: "/media/register/batch",
  },
  post: {
    create: "/posts",
    detail: "/posts/:id",
    update: "/posts/:id",
    delete: "/posts/:id",
    byUser: "/posts/user/:authorId",
    search: "/posts/search",
  },
  feed: {
    list: "/feed",
  },
  comment: {
    create: "/posts/:postId/comments",
    list: "/posts/:postId/comments",
    replies: "/comments/:rootId/replies",
  },
  like: {
    like: "/posts/:postId/likes",
    unlike: "/posts/:postId/likes",
  },
} as const;

export const PUBLIC_ENDPOINTS: string[] = [
  API_ENDPOINTS.auth.login,
  API_ENDPOINTS.auth.register,
  API_ENDPOINTS.feed.list,
  API_ENDPOINTS.user.profileSummary,
  API_ENDPOINTS.user.publicProfile,
  API_ENDPOINTS.post.search,
  API_ENDPOINTS.post.byUser,
];
