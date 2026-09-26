import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

const LoginProtection = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default LoginProtection;
