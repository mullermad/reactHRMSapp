import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import CustomizedDialogs from "./BootstrapingDialog";
import LoginCustomizedDialogs from "./LoginCustomizedDialogs";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const location = useLocation();
  const handleopenClose = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-screen flex flex-wrap items-center lg:h-[70px] justify-between bg-[#f7f7f7] shadow-md mb-1 z-[1]">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between items-center lg:w-auto lg:static lg:block lg:justify-start">
            <NavLink
              exact
              to="/"
              className={`text-lg font-bold flex justify-center items-center mr-4 py-2 whitespace-nowrap uppercase text-center brand ${
                location.pathname === "/" ? "text-gray-400" : ""
              }`}
            >
              <div className="flex justify-center items-center gap-5">
                <img
                  className="w-[80px] h-[60px] object-cover rounded-xl p-2"
                  src={logo}
                  alt="hrms"
                />
                HRMS
              </div>
            </NavLink>
            <button
              className="text-black cursor-pointer absolute top-[0px] right-[0px] text-3xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent lg:hidden outline-none focus:outline-none h-full flex justify-center items-center"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              {navbarOpen ? (
                <AiOutlineClose className="closeIcon" />
              ) : (
                <GiHamburgerMenu className="menuBar" />
              )}
            </button>
          </div>
          <div
            className={`lg:flex flex-grow items-center${
              navbarOpen ? " flex" : " hidden"
            }`}
            id="example-navbar-danger"
          >
            <ul className="flex text-black flex-col lg:flex-row list-none lg:ml-auto items-center">
              <li className="flex items-center">
                <NavLink
                  onClick={handleopenClose}
                  exact
                  to="/"
                  className={`px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:text-gray-400 hover:opacity-75 ${
                    location.pathname === "/" ? "text-gray-400" : ""
                  }`}
                >
                  Home
                </NavLink>
              </li>
              <li className="flex items-center">
                <NavLink
                  onClick={handleopenClose}
                  to="/vacancy"
                  className={`px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:text-gray-400 hover:opacity-75 ${
                    location.pathname === "/vacancy" ? "text-gray-400" : ""
                  }`}
                >
                  Vaccancy
                </NavLink>
              </li>
              <li
                onClick={handleopenClose}
                className="flex items-center m-[10px]"
              >
                <CustomizedDialogs text="Sign Up" />
              </li>
              <li
                onClick={handleopenClose}
                className="flex items-center m-[10px]"
              >
                <LoginCustomizedDialogs text="Log In" />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
