import React, { useEffect, useRef } from "react";
import { useChatStore } from "../../../zustand/chat.store";
import { MessageSkeleton } from "../../../global-components/skeletons/MessageSkeleton";
import { ChatHeader } from "./ChatHeader";
import { MessageInput } from "./MessageInput";
import { useAuthStore } from "../../../zustand/auth.store";

export const ChatContainer = () => {
  const { messages, selectedUser, isMessageLoading, getMessages, subscribeToMessages, unsubscribeToMessages } =
    useChatStore();

  const { user } = useAuthStore();

  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => {
      unsubscribeToMessages();
    };
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeToMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
 
  if (isMessageLoading) {
    return (
      <div className="flex-1 flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton /> 
        <MessageInput />
      </div>
    );
  }

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.sender_id === user._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.sender_id === user._id
                      ? user.profile_picture || "/user.svg"
                      : selectedUser.profile_picture || "/user.svg"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.message && <p>{message.message}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};
