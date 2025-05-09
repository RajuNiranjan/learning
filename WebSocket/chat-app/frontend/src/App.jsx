import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "./global-components/NavBar";
import { useAuthStore } from "./zustand/auth.store";
import { Loader } from "lucide-react";

const App = () => {
  const { user, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {user && <NavBar />}
      <Outlet />
    </div>
  );
};

export default App;
