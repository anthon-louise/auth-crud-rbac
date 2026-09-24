import z from "zod";

export const registerSchema = z.object({
  username: z.string().min(3, "Username is too short").max(100, "Username is too long"),
  password: z.string().min(6, "Password is too short").max(255, "Password is tooo long")
});

export const loginSchema = z.object({
  username: z.string().min(0, "Username is required").max(255, "User name is too long"),
  password: z.string().min(0, "Password is required").max(255, "Password is too long")
});
