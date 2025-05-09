import { Navigate } from "react-router-dom";
import { useAuthStore } from "../zustand/auth.store";

export const ProtectedRoute = ({ children }) => {
  const { user, isCheckingAuth } = useAuthStore();

  // Don't redirect while checking auth status
  if (isCheckingAuth) {
    return null; // Or a loading spinner
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};
