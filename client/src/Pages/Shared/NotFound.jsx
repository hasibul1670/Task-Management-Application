import { Link } from "react-router-dom";
import img404 from "../../assets/home/404.png";
import NavBar from "./NavBar";

const NotFound = () => {
  return (
    <>
      <NavBar></NavBar>
      <div className="flex items-center justify-center min-h-screen">
        <div className="card w-96 glass mt-10">
          <figure>
            <img src={img404} alt="car!" />
          </figure>
          <div className="card-body items-center justify-center">
            <h2 className="card-title text-red-700 font-bold ">
              404! Not Found
            </h2>

            <div className="card-actions justify-end">
              <Link to="/">
                {" "}
                <button className="btn btn-primary">Back to Home</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
