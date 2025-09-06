export type AuthInput = { email: string; password: string; name?: string };
export type SignInpData = { userId: number; email: string; name?: string };
export type AuthResult = {
  userId: number;
  useremail: string;
  name: string;
};
