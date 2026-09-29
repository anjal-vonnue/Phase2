import "./SideBar.css";

const SideBar = () => {
  return (
    <div className="sidebar-layout">
      <div className="sidebar-logo">
        <img src="./logo.png" width={32} />
        <h3>PulseHR</h3>
      </div>
      <div className="sidebar-content">
        <div className="sidebar-nav">
          <nav className="sidebar-nav-links">
            <a>Dashboard</a>
            <a className="sidebar-req">Request Leave</a>
            <a>My Balance & History</a>
            <a>Team Calender</a>
          </nav>
        </div>

        <div className="sidebar-bottom">
          <div className="sidebar-bottom-content">
            <span>?</span>
            <span>HR Policies & Help</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
