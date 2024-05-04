import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";


const App = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;