import ProjectContainer from "../Project/ProjectContainer";
import IssueContainer from "../Issues/IssueContainer";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <ProjectContainer />
      <IssueContainer />
    </div>
  );
};

export default Dashboard;
