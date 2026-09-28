import { Outlet } from "react-router";
import "./AuthLayout.css";

export const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <Outlet />
    </div>
  );
};
