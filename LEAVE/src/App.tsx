import "./App.css";
import MainComponent from "./components/main/MainComponent";
import SideBar from "./components/sidebar/SideBar";

function App() {
  return (
    <>
      <div className="app-layout">
        <SideBar />
        <MainComponent />
      </div>
    </>
  );
}

export default App;
