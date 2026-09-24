import { Avatar } from "../Avatar/Avatar";
import "./Profile.css";

export const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-card">
        <Avatar />
        <h2>ANJAL K BIJU</h2>
      </div>
    </div>
  );
};
