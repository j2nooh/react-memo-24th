export type AuthCredentials = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
};

export type SignupResponse = {
  userId: number;
  email: string;
};

export type AuthSession = {
  accessToken: string;
  email: string;
};
