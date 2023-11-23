/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const NavBar = ({ onSearchChange }) => {
  const [searchInput, setSearchInput] = useState("");
  const handleSearchInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchInput(searchTerm);
    onSearchChange(searchTerm);
  };

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const { user, logOut } = useContext(AuthContext);

  const navOptions = (
    <>
      <li className=" ">
        <div className="form-control">
          <input
            type="text"
            className="input input-bordered  h-10 w-48 md:w-auto"
            placeholder="Search bt title,category,description..."
            value={searchInput}
            onChange={handleSearchInputChange}
          />
        </div>
      </li>
    </>
  );

  const handleLogOut = () => {
    logOut();
  };

  const email = localStorage.getItem("email");

  return (
    <div className="bg-gray-700 h-20">
      <div
        className="navbar  
 z-20   container mx-auto 	 "
      >
        <div className="navbar-start">
          <div className="dropdown ">
            {!isDropdownOpen ? (
              <label
                tabIndex={0}
                onClick={toggleDropdown}
                className="btn btn-ghost  text-white  lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5  "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
            ) : (
              <label
                tabIndex={0}
                onClick={toggleDropdown}
                className="btn btn-ghost  text-white lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/1990/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </label>
            )}

            {isDropdownOpen && (
              <div>
                <ul
                  tabIndex={0}
                  className="menu menu-compact bg-black  dropdown-content mt-3 p-2 text-primary font-bold shadow  rounded-box w-52 z-50"
                >
                  <div className="navbar-end">
                    {user?.email ? (
                      <>
                        <Link
                          to="/"
                          className="ml-3 font-bold text-sm text-white  mr-2 "
                        ></Link>

                        <button
                          onClick={handleLogOut}
                          className="btn btn-sm btn-outline "
                        >
                          <span className="text-white text-xs">logout</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <Link to="/login">
                          {" "}
                          <button className="btn btn-sm btn-primary">
                            Sign In
                          </button>
                        </Link>
                      </>
                    )}
                  </div>
                </ul>
              </div>
            )}
          </div>

          <Link
            to="/"
            className="btn btn-ghost normal-case  hidden sm:inline text-white text-xl"
          >
            Notes{" "}
          </Link>
        </div>

        <div className="navbar-end">
          {user?.email ? (
            <>
              <div className="navbar-center   lg:flex">
                <ul className="menu font-bold menu-horizontal   px-1 ">
                  {navOptions}
                </ul>
              </div>

              <Link to="/login">
                <button
                  onClick={handleLogOut}
                  className="btn btn-sm btn-outline  hidden  lg:block"
                >
                  <span className="text-white text-xs">logout</span>
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                {" "}
                <button className="btn btn-sm btn-primary">Sign In</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
