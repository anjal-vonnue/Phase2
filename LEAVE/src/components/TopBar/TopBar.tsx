import { BellCheck, Search } from "lucide-react";
import "./TopBar.css";

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="top-bar-search">
        <Search />
        <input
          aria-label="search"
          type="text"
          placeholder="Search requests, team, policies..."
        />
      </div>
      <div className="top-bar-profile">
        <BellCheck />
        <div className="top-bar-profile-content">
          <div className="top-bar-profile-content-details">
            <p>Sarah Jenkins</p>
            <p>Senior Product Designer</p>
          </div>
          <img src="./profile.png" width={40} alt="profile image" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
