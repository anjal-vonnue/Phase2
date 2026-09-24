import HeaderComponent from "../Header/Header";
import SidebarComponent from "../Sidebar/Sidebar";
import "./AppShell.css";
import { Outlet } from "react-router";

export default function AppShell() {
  return (
    <>
      <div>
        <HeaderComponent />
        <div className="home-layout">
          <SidebarComponent />
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
