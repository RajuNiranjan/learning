import { useEffect } from "react";
import LogInScreen from "./views/LoginScree";
import SignUpScreen from "./views/SignUpScreen";
import { Navigate, Route, Routes } from "react-router-dom";
import { fetchUser } from "./redux/actions/auth.slice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./redux/store";
import { PrivateRoutes, PublicRoutes } from "./utils/ProtectRoutes";
import WelcomeScreen from "./views/WelcomeScreen";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/login" element={<LogInScreen />} />
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route path="/welcome" element={<WelcomeScreen />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
