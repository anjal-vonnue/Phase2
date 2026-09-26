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
import SingleIssue from "./components/Issues/SingleIssue";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginProtection from "./components/LoginProtection";

function App() {
  return (
    <>
      <Routes>
        <Route element={<LoginProtection />}>
          <Route element={<AuthLayout />}>
            <Route path="register" element={<RegisterCard />} />
            <Route path="login" element={<LoginCard />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<AppShell />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects" element={<ProjectDashboard />} />
            <Route path="issues" element={<IssueContainer />} />
            <Route path="profile" element={<Profile />} />
            <Route path="issues/:id" element={<SingleIssue />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
export default App;
