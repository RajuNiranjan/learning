import React from "react";
import { useChatStore } from "../../../zustand/chat.store";

export const ChatContainer = () => {
  const { selectedUser } = useChatStore();

  console.log("selectedUser", selectedUser);

  return <div>ChatContainer</div>;
};
