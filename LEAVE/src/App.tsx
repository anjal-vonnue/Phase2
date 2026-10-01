import { useState } from "react";
import "./App.css";
import MainComponent from "./components/main/MainComponent";
import SideBar from "./components/sidebar/SideBar";
import TopBar from "./components/TopBar/TopBar";
import Dashboard from "./components/Dashboard/Dashboard";
import Holidays from "./components/Holidays/Holidays";

function App() {
  const [sidebar, setSidebar] = useState<string>("request");
  console.log(sidebar);

  return (
    <>
      <div className="app-layout">
        <SideBar sidebar={sidebar} setSidebar={setSidebar} />
        <div className="app-div">
          <TopBar />
          {sidebar === "request" && <MainComponent />}
          {sidebar === "dashboard" && <Dashboard />}
          {sidebar === "holidays" && <Holidays />}
        </div>
      </div>
    </>
  );
}

export default App;
