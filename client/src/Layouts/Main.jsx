import { Outlet } from "react-router-dom";
import Footer from "./../Pages/Shared/Footer";
import NavBar from "./../Pages/Shared/NavBar";

const Main = () => {
  return (
    <div>
      <NavBar/>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Main;
