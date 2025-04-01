import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import { io } from "socket.io-client";
export const useChatStore = create((set, get) => ({
  message: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ message: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, message } = get();
    if (!selectedUser) {
      toast.error("No user selected for messaging.");
      return;
    }

    try {
      const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
      set((state) => ({ message: [...state.message, res.data] }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState()?.socket;
    if (!socket) return;

    socket.off("newMessage"); // Ensure we don't add multiple listeners
    socket.on("newMessage", (newMessage) => {
      if (newMessage.senderId !== selectedUser._id) return;

      set((state) => ({ message: [...state.message, newMessage] }));
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState()?.socket;
    if (socket) {
      socket.off("newMessage");
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
