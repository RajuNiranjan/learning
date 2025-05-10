import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../utils/axios";

export const useChatStore = create((set, get) => ({
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

  getMessages: async (userId) => {
    try {
      set({ isMessageLoading: true });
      const res = await axiosInstance.get(
        `/api/v1/messages/get_conversation/${userId}`
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

  sendMessage: async (message) => {
    const { messages, selectedUser } = get();
    try {
      const res = await axiosInstance.post(
        `/api/v1/messages/send_message/${selectedUser._id}`,
        {
          message,
        }
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.log(error);
    }
  },
}));
