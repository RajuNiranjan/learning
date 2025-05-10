import React from "react";
import { useChatStore } from "../../zustand/chat.store";
import { SideBar } from "./components/SideBar";
import { NoChatSelected } from "./components/NoChatSelected";
import { ChatContainer } from "./components/ChatContainer";

const HomeScreen = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <SideBar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
