import { Navigate } from "react-router-dom";
import { useAuthStore } from "../zustand/auth.store";

export const PrivateRoutes = ({ children }) => {
  const { user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const PublicRoutes = ({ children }) => {
  const { user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return null;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};
