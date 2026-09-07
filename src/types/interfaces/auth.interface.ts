export interface SignupPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}
export interface LoginPayload {
  email: string;
  password: string;
}
export interface AuthPayload {
  isLoading: boolean;
  isError: boolean;
  user: User | null;
}
export interface User {
  email: string;
  password: string;
  phone: string;
  name: string;
  role: string;
}
