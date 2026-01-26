import z from "zod";

export const orgSchema = z.object({
  name: z.string().min(2, "Organization name must be at least 2 characters"),
  regId: z.string().optional(), 
  logoUrl: z.string().optional(),
});

export const inviteSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  org_id: z.string().min(1, "Organization ID is missing"),
  invited_by_user_id: z.string().min(1, "User ID is missing"),
});

export const userSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  user_name: z.string().min(3, "Username must be at least 3 characters").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().optional().or(z.literal('')), 
  confirmPassword: z.string().optional().or(z.literal('')),
}).refine((data) => {
  if (data.password && data.password.length > 0) {
    return data.password === data.confirmPassword;
  }
  return true;
}, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
}).refine((data) => {
  if (data.password && data.password.length > 0) {
    return data.password.length >= 6;
  }
  return true;
}, {
  message: "Password must be at least 6 characters",
  path: ["password"],
});