import {
  CalendarCheck,
  CalendarDays,
  CircleQuestionMark,
  LayoutDashboard,
  PartyPopper,
  Wallet,
} from "lucide-react";
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
            <a>
              <LayoutDashboard />
              Dashboard
            </a>
            <a className="sidebar-req">
              <CalendarCheck />
              Request Leave
            </a>
            <a>
              <Wallet />
              My Balance & History
            </a>
            <a>
              <CalendarDays />
              Team Calender
            </a>
            <a>
              <PartyPopper />
              Company Holidays
            </a>
          </nav>
        </div>

        <div className="sidebar-bottom">
          <div className="sidebar-bottom-content">
            <CircleQuestionMark />
            <span>HR Policies & Help</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
