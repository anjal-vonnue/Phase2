import "./TopBar.css";

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="top-bar-search">
        <span>Logo</span>
        <input type="text" placeholder="Search requests, team, policies..." />
      </div>
      <div className="top-bar-profile">
        <div>bell</div>
        <div className="top-bar-profile-content">
          <div className="top-bar-profile-content-details">
            <p>Sarah Jenkins</p>
            <p>Senior Product Designer</p>
          </div>
          <img src="./profile.png" width={40} />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
