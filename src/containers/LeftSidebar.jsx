import routes from "../routes/sidebar";
import { NavLink, Routes, Link, useLocation } from "react-router-dom";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import Logo from "../assets/others/lotte-logo.png"

function LeftSidebar() {
  const location = useLocation();

  const close = (e) => {
    document.getElementById("left-sidebar-drawer").click();
  };

  return (
    <div className="drawer-side">
      <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
      <ul className="menu pt-2 pr-4 w-52 bg-base-100 text-base-content">
        <button
          className="btn btn-ghost bg-base-300 btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden"
          onClick={() => close()}
        >
          <XMarkIcon className="h-5 inline-block w-5" />
        </button>

        <div className="m-2 font-semibold text-xl w-full mb-4">
          <div className="flex flex-row">
            <img
              className="mask mask-squircle w-10"
              src={Logo}
              alt="DashWind Logo"
            />
            <span className="mt-1 ml-2">Lotte Food</span>
          </div>{" "}
        </div>
        {routes.map((route, k) => {
          return (
            <li className="" key={k}>
              <NavLink
                end
                to={route.path}
                className={({ isActive }) =>
                  `${isActive ? "font-semibold  bg-base-200 " : "font-normal"} rounded-lg m-2`
                }
              >
                {route.icon} {route.name}
                {location.pathname === route.path ? (
                  <span
                    className="absolute inset-y-0 left-0 w-2 rounded-tr-md rounded-br-md bg-red "
                    aria-hidden="true"
                  ></span>
                ) : null}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default LeftSidebar;
