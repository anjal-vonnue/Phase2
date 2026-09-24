import { Route, Routes } from "react-router";
import "./App.css";
import AppShell from "./components/AppShell/AppShell";
import Dashboard from "./components/Dashboard/Dashboard";
import ProjectDashboard from "./components/Dashboard/ProjectDashboard";
import IssueContainer from "./components/Issues/IssueContainer";
import NotFound from "./components/NotFound/NotFound";
import { Profile } from "./components/Profile/Profile";
import { AuthLayout } from "./components/Auth/AuthLayout";
import RegisterCard from "./components/Auth/RegisterCard";
import LoginCard from "./components/Auth/LoginCard";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="register" element={<RegisterCard />} />
          <Route path="login" element={<LoginCard />} />
        </Route>

        <Route path="/" element={<AppShell />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<ProjectDashboard />} />
          <Route path="/issues" element={<IssueContainer />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
