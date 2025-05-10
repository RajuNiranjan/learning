import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../utils/axios";

export const useChatStore = create((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,

  getUsers: async () => {
    try {
      set({ isUserLoading: true });
      const res = await axiosInstance.get("/api/v1/messages/get_all_users");
      set({ users: res.data });
    } catch (error) {
      console.log(error);

      toast.error("Error fetching users");
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (receiver_id) => {
    try {
      set({ isMessageLoading: true });
      const res = await axiosInstance.get(
        `/api/v1/messages/get_conversation/${receiver_id}`
      );
      set({ messages: res.data });
    } catch (error) {
      console.log(error);
      toast.error("Error fetching messages");
    } finally {
      set({ isMessageLoading: false });
    }
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },
}));
