import type React from "react";
import HeaderComponent from "../Header/Header";
import SidebarComponent from "../Sidebar/Sidebar";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <>
      <div>
        <HeaderComponent />
        <div>
          <SidebarComponent />
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}
