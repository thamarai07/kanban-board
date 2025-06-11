import "./App.css";
import Navbar from "./components/Navbar";
import MainRouter from "./components/Router";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <MainRouter />
        <Outlet />
      </div>
    </>
  );
}

export default App;
