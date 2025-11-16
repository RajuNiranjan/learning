import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthRedirect } from "./routes/AuthRedirect";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { useDispatch } from "react-redux";
import { useRefreshMutation } from "./redux/features/auth/authAPI";
import { useEffect } from "react";
import { setCredentials } from "./redux/features/auth/authSlice";
import DashBoard from "./pages/DashBoard";

const App = () => {
  const dispatch = useDispatch();

  const [refresh, { data, isSuccess }] = useRefreshMutation();

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(
        setCredentials({
          user: data.user,
          access_token: data.access_token,
        })
      );
    }
  }, [isSuccess, data, dispatch]);
  return (
    <>
      <Routes>
        <Route element={<AuthRedirect />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashBoard />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
};

export default App;
