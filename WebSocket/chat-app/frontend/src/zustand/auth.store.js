import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  isCheckingAuth: false,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isUpdatingProfile: false,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });
      const res = await axiosInstance.get("/api/v1/auth/check-auth");

      set({ user: res.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async ({ user_name, email, password }) => {
    try {
      set({ isSigningUp: true });
      const res = await axiosInstance.post("/api/v1/auth/signup", {
        user_name,
        email,
        password,
      });
      set({ user: res.data.user });
      toast.success("Signup successful");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async ({ emailOrUsername, password }) => {
    try {
      set({ isLoggingIn: true });
      const res = await axiosInstance.post("/api/v1/auth/login", {
        emailOrUsername,
        password,
      });
      set({ user: res.data.user });
      toast.success("Login successful");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      set({ isLoggingOut: true });
      await axiosInstance.post("/api/v1/auth/logout");
      set({ user: null });
      toast.success("Logout successful");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingOut: false });
    }
  },

  updateProfile: async (data) => {
    try {
      set({ isUpdatingProfile: true });
      const res = await axiosInstance.put("/api/v1/auth/update-profile", data);
      set({ user: res.data.user });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
