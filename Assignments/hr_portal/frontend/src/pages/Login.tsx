import { z } from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "../redux/features/auth/authAPI";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useEffect } from "react";

const loginSchema = z.object({
  email: z.email("Invalid Email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(15, "Password must not exceed 15 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/,
      "Password must include upper, lower, number, and special character"
    ),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/dashboard");
    }
  }, [auth.isAuthenticated, navigate]);

  const [loginUser, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginUser(data).unwrap();
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" {...register("email")} />{" "}
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>{" "}
        <div>
          <label htmlFor="password">User Name</label>
          <input type="password" {...register("password")} />{" "}
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>
        <button type="submit" disabled={isSubmitting || isLoading}>
          {isSubmitting || isLoading ? "Loading...." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
