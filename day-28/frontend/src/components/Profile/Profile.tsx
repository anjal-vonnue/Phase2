import useDocumentTitle from "../../hooks/useDocumentTitle";
import { Avatar } from "../Avatar/Avatar";
import "./Profile.css";

export const Profile = () => {
  useDocumentTitle("Profile | Project Management");
  return (
    <div className="profile-container">
      <div className="profile-card">
        <Avatar />
        <h2>ANJAL K BIJU</h2>
      </div>
    </div>
  );
};
