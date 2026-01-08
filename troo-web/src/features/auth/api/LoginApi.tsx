import type { LoginFormData } from "../components/login/LoginModal";

export const LoginApi = async (data: LoginFormData) => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  if (data.identifier === 'error') throw new Error("Invalid credentials provided.");
  return { token: 'abc-123', user: { name: 'John Doe' } };
};