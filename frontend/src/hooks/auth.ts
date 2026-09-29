import { useMutation, useQueryClient } from "@tanstack/react-query"
import { registerUser } from "../api/auth";
import type { registerInput } from "../schemas/auth";
import { toast } from "sonner";

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: registerInput) => registerUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["me"]});
      toast.success("Register successfully");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to register");
    }
  })
  
}
