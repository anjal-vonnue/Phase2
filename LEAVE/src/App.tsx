import "./App.css";
import MainComponent from "./components/main/MainComponent";
import SideBar from "./components/sidebar/SideBar";
import TopBar from "./components/TopBar/TopBar";

function App() {
  return (
    <>
      <div className="app-layout">
        <SideBar />
        <div className="app-div">
          <TopBar />
          <MainComponent />
        </div>
      </div>
    </>
  );
}

export default App;
