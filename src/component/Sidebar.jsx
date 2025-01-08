import React from "react";
import { NavLink } from "react-router-dom";
import { FaAd, FaAddressBook, FaBlog, FaBook, FaBookmark, FaClipboard, FaCocktail, FaEnvelope, FaEnvelopeOpenText, FaHome, FaMap, FaPlus, FaTextHeight, FaTheaterMasks, FaUmbraco, FaUser, FaUtensils } from "react-icons/fa";
import LogoutBtn from "./LogoutBtn";
import { FaBowlFood, FaFaceSmileBeam, FaKitchenSet, FaRegBookmark, FaTextSlash } from "react-icons/fa6";

const Sidebar = ({ isSidebarOpen }) => {
  return (
    <div className={`bg-white text-admin_dark ${isSidebarOpen ? "w-64 p-4" : "w-22 px-3 py-4"}  relative  transition-all duration-500`}>
      <ul className="mt-0 p-0">
        <li className="mb-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center px-2 py-2 rounded-md  ${isSidebarOpen ? "w-44" : "w-auto"} no-underline text-admin_text_grey  ${
                isActive ? "bg-admin_primary text-white" : "hover:bg-admin_primary hover:text-white"
              }`
            }
          >
            <FaHome className={`${isSidebarOpen ? 'mr-4': 'mr-0'} `} size={20} />
            {isSidebarOpen && <span>Dashboard</span>}
          </NavLink>
        </li>
        <li className="mb-2">
          <NavLink
            to="/restaurants"
            className={({ isActive }) =>
              `flex items-center px-2 py-2 rounded-md ${isSidebarOpen ? "w-44" : "w-auto"} no-underline text-admin_text_grey  ${
                isActive ? "bg-admin_primary text-white" : "hover:bg-admin_primary hover:text-white"
              }`
            }
          >
            <FaUtensils className={`${isSidebarOpen ? 'mr-4': 'mr-0'} `} size={20} />
            {isSidebarOpen && <span>Restaurants</span>}
          </NavLink>
        </li>
        <li className="mb-2">
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `flex items-center px-2 py-2 rounded-md  ${isSidebarOpen ? "w-44" : "w-auto"} no-underline text-admin_text_grey  ${
                isActive ? "bg-admin_primary text-white" : "hover:bg-admin_primary hover:text-white"
              }`
            }
          >
            <FaUser className={`${isSidebarOpen ? 'mr-4': 'mr-0'} `} size={20} />
            {isSidebarOpen && <span>Users</span>}
          </NavLink>
        </li>
        <li className="mb-2">
          <NavLink
            to="/bookings"
            className={({ isActive }) =>
              `flex items-center px-2 py-2 rounded-md  ${isSidebarOpen ? "w-44" : "w-auto"} no-underline text-admin_text_grey  ${
                isActive ? "bg-admin_primary text-white" : "hover:bg-admin_primary hover:text-white"
              }`
            }
          >
            <FaClipboard className={`${isSidebarOpen ? 'mr-4': 'mr-0'} `} size={20} />
            {isSidebarOpen && <span>Bookings</span>}
          </NavLink>
        </li>
        <li className="mb-2">
          <NavLink
            to="/facilities"
            className={({ isActive }) =>
              `flex items-center px-2 py-2 rounded-md  ${isSidebarOpen ? "w-44" : "w-auto"} no-underline text-admin_text_grey  ${
                isActive ? "bg-admin_primary text-white" : "hover:bg-admin_primary hover:text-white"
              }`
            }
          >
            <FaCocktail className={`${isSidebarOpen ? 'mr-4': 'mr-0'} `} size={20} />
            {isSidebarOpen && <span>Facilities</span>}
          </NavLink>
        </li>
        <li className="mb-2">
          <NavLink
            to="/areas"
            className={({ isActive }) =>
              `flex items-center px-2 py-2 rounded-md  ${isSidebarOpen ? "w-44" : "w-auto"} no-underline text-admin_text_grey  ${
                isActive ? "bg-admin_primary text-white" : "hover:bg-admin_primary hover:text-white"
              }`
            }
          >
            <FaMap className={`${isSidebarOpen ? 'mr-4': 'mr-0'} `} size={20} />
            {isSidebarOpen && <span>Areas</span>}
          </NavLink>
        </li>
        <li className="mb-2">
          <NavLink
            to="/kitchens"
            className={({ isActive }) =>
              `flex items-center px-2 py-2 rounded-md  ${isSidebarOpen ? "w-44" : "w-auto"} no-underline text-admin_text_grey  ${
                isActive ? "bg-admin_primary text-white" : "hover:bg-admin_primary hover:text-white"
              }`
            }
          >
            <FaKitchenSet className={`${isSidebarOpen ? 'mr-4': 'mr-0'} `} size={20} />
            {isSidebarOpen && <span>Kitchens</span>}
          </NavLink>
        </li>
        <li className="mb-2">
          <NavLink
            to="/atmospheres"
            className={({ isActive }) =>
              `flex items-center px-2 py-2 rounded-md  ${isSidebarOpen ? "w-44" : "w-auto"} no-underline text-admin_text_grey  ${
                isActive ? "bg-admin_primary text-white" : "hover:bg-admin_primary hover:text-white"
              }`
            }
          >
            <FaFaceSmileBeam className={`${isSidebarOpen ? 'mr-4': 'mr-0'} `} size={20} />
            {isSidebarOpen && <span>Atmospheres</span>}
          </NavLink>
        </li>
        <li className="mb-2">
          <NavLink
            to="/menus"
            className={({ isActive }) =>
              `flex items-center px-2 py-2 rounded-md  ${isSidebarOpen ? "w-44" : "w-auto"} no-underline text-admin_text_grey  ${
                isActive ? "bg-admin_primary text-white" : "hover:bg-admin_primary hover:text-white"
              }`
            }
          >
            <FaBowlFood className={`${isSidebarOpen ? 'mr-4': 'mr-0'} `} size={20} />
            {isSidebarOpen && <span>Menus</span>}
          </NavLink>
        </li>
        <li className="mb-2">
          <NavLink
            to="/addterms"
            className={({ isActive }) =>
              `flex items-center px-2 py-2 rounded-md  ${isSidebarOpen ? "w-44" : "w-auto"} no-underline text-admin_text_grey  ${
                isActive ? "bg-admin_primary text-white" : "hover:bg-admin_primary hover:text-white"
              }`
            }
          >
            <FaBookmark className={`${isSidebarOpen ? 'mr-4': 'mr-0'} `} size={20} />
            {isSidebarOpen && <span>Add Terms</span>}
          </NavLink>
        </li>
        <li className="mb-2">
          <NavLink
            to="/newsletter"
            className={({ isActive }) =>
              `flex items-center px-2 py-2 rounded-md  ${isSidebarOpen ? "w-44" : "w-auto"} no-underline text-admin_text_grey  ${
                isActive ? "bg-admin_primary text-white" : "hover:bg-admin_primary hover:text-white"
              }`
            }
          >
            <FaEnvelope className={`${isSidebarOpen ? 'mr-4': 'mr-0'} `} size={20} />
            {isSidebarOpen && <span>Newsletter</span>}
          </NavLink>
        </li>
      </ul>
      {/* <span className={`absolute left-0 right-0 bottom-0 w-full border-t px-4 py-3 ${isSidebarOpen ? "block" : "hidden"}`}>
        <LogoutBtn />
      </span> */}
    </div>
  );
};

export default Sidebar;
 