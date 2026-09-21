import { IoHome } from "react-icons/io5";
import { GrProjects } from "react-icons/gr";
import { RiIssuesReopenLine } from "react-icons/ri";
import "./Sidebar.css";

export default function SidebarComponent() {
  return (
    <>
      <div className="container">
        <div className="link">
          <IoHome size={20} />
          <h2>Dashboard</h2>
        </div>
        <div className="link">
          <GrProjects size={20} />
          <h2>Projects</h2>
        </div>
        <div className="link">
          <RiIssuesReopenLine size={20} />
          <h2>Issues</h2>
        </div>
      </div>
    </>
  );
}
