import ProjectContainer from "../Project/ProjectContainer";
import IssueContainer from "../Issues/IssueContainer";
import "./Dashboard.css";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const Dashboard = () => {
  useDocumentTitle("Dashboard | Project Management");

  return (
    <div className="dashboard">
      <ProjectContainer />
      <IssueContainer />
    </div>
  );
};

export default Dashboard;
