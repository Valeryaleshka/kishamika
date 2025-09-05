export type AuthInput = { email: string; password: string; name?: string };
export type SignInpData = { userId: number; email: string };
export type AuthResult = {
  userId: number;
  username: string;
};
