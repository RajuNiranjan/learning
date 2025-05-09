import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import HomeScreen from "./views/HomePage/HomeScreen";
import LoginScreen from "./views/LoginPage/LoginScreen";
import SignUpScreen from "./views/SignUpPage/SignUpScreen";
import SettingsScreen from "./views/SettingsPage/SettingsScreen";
import ProfileScreen from "./views/ProfilePage/ProfileScreen";
import { useAuthStore } from "./zustand/auth.store";
import { Toaster } from "react-hot-toast";

const PrivateRoute = ({ children }) => {
  const { user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const { user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return null;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Toaster />
        <App />
      </div>
    ),
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <HomeScreen />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <LoginScreen />
          </PublicRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <PublicRoute>
            <SignUpScreen />
          </PublicRoute>
        ),
      },
      {
        path: "/settings",
        element: (
          <PrivateRoute>
            <SettingsScreen />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <ProfileScreen />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
