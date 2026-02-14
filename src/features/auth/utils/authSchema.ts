import z from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Username or Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/[0-9]/, "Must contain a number")
    .regex(/[^A-Za-z0-9]/, "Must contain a special character")});



export const registerSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  username: z.string().optional(),
  email: z
    .email("Invalid email address")
    .refine((val) => {
      const publicDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
      const domain = val.split('@')[1];
      return !publicDomains.includes(domain?.toLowerCase());
    }, { message: "Please use a company email address" }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/[0-9]/, "Must contain a number")
    .regex(/[^A-Za-z0-9]/, "Must contain a special character"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});


const MAX_FILE_SIZE = 5 * 1024 * 1024; 
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ACCEPTED_DOC_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];

export const onboardingSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  countryCode: z.string().max(4, "Please select a valid country"),
  registrationId: z.string().min(5, "Registration ID is required"),
  
  logo: z.instanceof(File, { message: "Logo is required" })
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), "Only .jpg, .png and .webp are supported."),
    
  proof: z.instanceof(File, { message: "Proof of registration is required" })
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine((file) => ACCEPTED_DOC_TYPES.includes(file.type), "Only .jpg, .png and .pdf are supported."),
});

