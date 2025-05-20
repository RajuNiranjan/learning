import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export const PublicRoutes = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return user ? <Navigate to="/welcome" /> : <Outlet />;
};
