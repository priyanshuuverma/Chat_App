import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore.js";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";

const ChatContainer = () => {
  const { authUser } = useAuthStore();
  const { message, getMessages, isMessageLoading, selectedUser } = useChatStore();
  const prevUserId = useRef(null);

  useEffect(() => {
    if (selectedUser?._id && prevUserId.current !== selectedUser._id) {
      getMessages(selectedUser._id);
      prevUserId.current = selectedUser._id;
    }
  }, [selectedUser?._id]);

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">Select a user to start chatting</p>
      </div>
    );
  }

  if (isMessageLoading)
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 flex flex-col overflow-y-auto p-4 space-y-4">
        {message.length > 0 ? (
          message.map((msg) => (
            <div
              key={msg._id}
              className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      msg.senderId === authUser._id
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="User Avatar"
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {new Date(msg.createdAt).toLocaleString()}
                </time>
              </div>
              <div className="chat-bubble flex flex-col">
                {msg.image && <img src={msg.image} alt="attachment" className="sm:max-w-[200px] rounded-md mb-2" />}
                {msg.text && <p>{msg.text}</p>}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No messages yet.</p>
        )}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
