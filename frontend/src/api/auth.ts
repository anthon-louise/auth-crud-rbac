import type { registerInput } from "../schemas/auth";
import { api } from "./axios";

export const registerUser = async (data: registerInput) => {
  const res = await api.post("/", data);
  return res.data;
}
