import { IoHome } from "react-icons/io5";
import { GrProjects } from "react-icons/gr";
import { RiIssuesReopenLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import "./Sidebar.css";
import { NavLink } from "react-router";

export default function SidebarComponent() {
  return (
    <>
      <div className="container">
        <NavLink to="/dashboard">
          <div className="link">
            <IoHome size={25} />
            <h2>Dashboard</h2>
          </div>
        </NavLink>
        <NavLink to="/projects">
          <div className="link">
            <GrProjects size={25} />
            <h2>Projects</h2>
          </div>
        </NavLink>
        <NavLink to="/issues">
          <div className="link">
            <RiIssuesReopenLine size={25} />
            <h2>Issues</h2>
          </div>
        </NavLink>
        <NavLink to="/profile">
          <div className="link">
            <CgProfile size={25} />
            <h2>Profile</h2>
          </div>
        </NavLink>
      </div>
    </>
  );
}
