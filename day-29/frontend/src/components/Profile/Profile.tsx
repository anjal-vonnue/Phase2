import { useAuth } from "../../context/AuthContext";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { Avatar } from "../Avatar/Avatar";
import "./Profile.css";

export const Profile = () => {
  useDocumentTitle("Profile | Project Management");

  const { user, logout } = useAuth();

  return (
    <div className="profile-container">
      <div className="profile-card">
        <Avatar />
        <h2>Name: {user?.name}</h2>
        <h3>Email: {user?.email}</h3>
        <h4>Role: {user?.role}</h4>
        <button onClick={logout}>Logut User</button>
      </div>
    </div>
  );
};
