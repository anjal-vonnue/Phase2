import ProjectContainer from "../Project/ProjectContainer";
import IssueContainer from "../Issues/IssueContainer";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard-container">
        <ProjectContainer />
        <IssueContainer />
      </div>
    </>
  );
};

export default Dashboard;
