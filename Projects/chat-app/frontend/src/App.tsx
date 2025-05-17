import { useEffect } from "react";
import LogInScreen from "./views/LoginScree";
import SignUpScreen from "./views/SignUpScreen";
import { Navigate, Route, Routes } from "react-router-dom";
import { fetchUser } from "./redux/actions/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./redux/store";
import { PrivateRoutes, PublicRoutes } from "./utils/ProtectRoutes";
import WelcomeScreen from "./views/WelcomeScreen";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const { user } = useSelector((state: RootState) => state.auth);
  console.log(user);

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
