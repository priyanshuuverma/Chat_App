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
  isMessageLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ message: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessageLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, message } = get();
    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        messageData
      );
      set({ message: [...message, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  // subscribeToMessage: () => {
  //   const { selectedUser } = get();
  //   if (!selectedUser) return;
  //   const socket = useAuthStore.getState().socket;
  //   socket.on("newMessage", (newMessage) => {
  //     set({
  //       message: [...get(), message, newMessage],
  //     });
  //   });
  //   socket.on();
  // },

  // unsubscribefrommessages: () => {
  //   const socket = useAuthStore.getState().socket;
  //   socket.off("newMessages");
  // },
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
