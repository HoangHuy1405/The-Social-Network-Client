export const ROUTE_PATHS = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  PROFILE: "/users/:username",
  UNAUTHORIZED: "/401",
  CREATE_POST: "/posts/create",
  POST_DETAIL: "/posts/:id",
  SEARCH: "/search",
} as const;

