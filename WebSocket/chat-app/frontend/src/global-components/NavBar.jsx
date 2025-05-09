import React from "react";
import { useAuthStore } from "../zustand/auth.store";
import { LogOutIcon } from "lucide-react";

export const NavBar = () => {
  const { logout } = useAuthStore();

  return (
    <div>
      <h1>NavBar</h1>
      <button onClick={logout}>
        <LogOutIcon />
      </button>
    </div>
  );
};
