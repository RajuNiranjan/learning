import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";

const SOCKET_BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

export const useAuthStore = create((set, get) => ({
  user: null,
  isCheckingAuth: false,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isUpdatingProfile: false,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });
      const res = await axiosInstance.get("/api/v1/auth/check-auth");

      set({ user: res.data });
      get().connectSocket();
      console.log(get().socket);
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
      get().connectSocket();

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
      get().connectSocket();

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
      get().disConnectSocket();
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

  connectSocket: () => {
    try {
      const { user } = get();

      if (!user || get().socket?.connected) return;

      const socket = io(SOCKET_BASE_URL, {
        query: {
          userId: user._id,
        },
      });

      socket.connect();
      set({ socket });

      socket.on("getOnlineUsers", (userId) => {
        set({ onlineUsers: userId });
      });
    } catch (error) {
      console.log(error);
    }
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket && socket.connected) {
      socket.disconnect();
    }
  },
}));
