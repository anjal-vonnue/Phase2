import "./App.css";
import AppShell from "./components/AppShell/AppShell";
import IssueContainer from "./components/Issues/IssueContainer";
import ProjectContainer from "./components/Project/ProjectContainer";

function App() {
  return (
    <>
      <AppShell>
        <div className="main-container">
          <ProjectContainer />
          <IssueContainer />
        </div>
      </AppShell>
    </>
  );
}

export default App;
