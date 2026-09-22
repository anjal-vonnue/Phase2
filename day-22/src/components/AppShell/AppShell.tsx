import type React from "react";
import HeaderComponent from "../Header/Header";
import SidebarComponent from "../Sidebar/Sidebar";
import "./AppShell.css";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <>
      <div>
        <HeaderComponent />
        <div className="home-layout">
          <SidebarComponent />
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}
