import { useForm } from "react-hook-form";
import { useRegister } from "../hooks/auth"
import { registerSchema, type registerInput } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const registerMutation = useRegister();
  const nav = useNavigate();
  const {} = useForm

  const {
    handleSubmit,
    register,
    formState: {errors}
  } = useForm<registerInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const handleRegister = (data: registerInput) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        nav("/")
      }
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleRegister)}>
        <div>
          <input type="text" {...register("username")} placeholder="Username" />
          {errors.username && <p>
            {errors.username.message}</p>}
        </div>

        <div>
          <input type="text" {...register("password")} placeholder="Password"/>
          {errors.password && <p>
            {errors.password.message}</p>}
        </div>

        <button disabled={registerMutation.isPending}>
          {registerMutation.isPending ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  )
}

export default RegisterPage
