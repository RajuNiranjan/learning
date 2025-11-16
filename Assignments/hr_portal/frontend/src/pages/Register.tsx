import { z } from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "../redux/features/auth/authAPI";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useEffect } from "react";

const registerSchema = z.object({
  email: z.email("Invalid Email"),
  username: z
    .string()
    .min(3, "Minimum 3 charecters required")
    .max(20, "Maximum 20 charecters only"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(15, "Password must not exceed 15 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/,
      "Password must include upper, lower, number, and special character"
    ),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/dashboard");
    }
  }, [auth.isAuthenticated, navigate]);

  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data).unwrap();
      navigate("/login");
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
          <label htmlFor="username">User Name</label>
          <input type="text" {...register("username")} />
          {errors.username && (
            <p className="text-xs text-red-500">{errors.username.message}</p>
          )}
        </div>{" "}
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
          {isSubmitting || isLoading ? "Loading...." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
