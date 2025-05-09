import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import HomeScreen from "./views/HomePage/HomeScreen";
import LoginScreen from "./views/LoginPage/LoginScreen";
import SignUpScreen from "./views/SignUpPage/SignUpScreen";
import SettingsScreen from "./views/SettingsPage/SettingsScreen";
import ProfileScreen from "./views/ProfilePage/ProfileScreen";
import { PrivateRoutes, PublicRoutes } from "./utils/RouteGuards";
import { Toaster } from "react-hot-toast";

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
          <PrivateRoutes>
            <HomeScreen />
          </PrivateRoutes>
        ),
      },
      {
        path: "/login",
        element: (
          <PublicRoutes>
            <LoginScreen />
          </PublicRoutes>
        ),
      },
      {
        path: "/signup",
        element: (
          <PublicRoutes>
            <SignUpScreen />
          </PublicRoutes>
        ),
      },
      {
        path: "/settings",
        element: (
          <PrivateRoutes>
            <SettingsScreen />
          </PrivateRoutes>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoutes>
            <ProfileScreen />
          </PrivateRoutes>
        ),
      },
      {
        path: "*",
        element: <Navigate to="/login" replace />,
      },
    ],
  },
]);
