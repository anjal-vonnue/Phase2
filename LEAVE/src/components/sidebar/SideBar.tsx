import {
  CalendarCheck,
  CalendarDays,
  CircleQuestionMark,
  LayoutDashboard,
  PartyPopper,
  Wallet,
} from "lucide-react";
import "./SideBar.css";
import type { Dispatch, SetStateAction } from "react";

const SideBar = ({
  sidebar,
  setSidebar,
}: {
  sidebar: string;
  setSidebar: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="sidebar-layout">
      <div className="sidebar-logo">
        <img src="./logo.png" width={32} />
        <h3>PulseHR</h3>
      </div>
      <div className="sidebar-content">
        <div className="sidebar-nav">
          <nav className="sidebar-nav-links">
            <a
              className={sidebar === "dashboard" ? "sidebar-req" : ""}
              onClick={() => {
                setSidebar("dashboard");
              }}
            >
              <LayoutDashboard />
              Dashboard
            </a>
            <a
              className={sidebar === "request" ? "sidebar-req" : ""}
              onClick={() => {
                setSidebar("request");
              }}
            >
              <CalendarCheck />
              Request Leave
            </a>
            <a
              className={sidebar === "balance" ? "sidebar-req" : ""}
              onClick={() => {
                setSidebar("balance");
              }}
            >
              <Wallet />
              My Balance & History
            </a>
            <a
              className={sidebar === "calender" ? "sidebar-req" : ""}
              onClick={() => {
                setSidebar("calender");
              }}
            >
              <CalendarDays />
              Team Calender
            </a>
            <a
              className={sidebar === "holidays" ? "sidebar-req" : ""}
              onClick={() => {
                setSidebar("holidays");
              }}
            >
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
