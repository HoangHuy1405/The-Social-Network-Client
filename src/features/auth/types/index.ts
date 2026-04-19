export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  id: string;
  accessToken: string;
  email: string;
  username: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
};

export type RegisterResponse = {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
};
