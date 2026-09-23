import z from "zod";

export const registerSchema = z.object({
  username: z.string().min(0, "Username required").max(100, "Username is too long"),
  password: z.string().min(6, "Password is too short")
});
