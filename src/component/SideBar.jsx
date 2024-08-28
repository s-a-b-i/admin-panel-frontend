// import React, { useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   FiGrid,
//   FiUser,
//   FiUsers,
//   FiFolder,
//   FiCalendar,
//   FiLogOut,
//   FiX,
// } from "react-icons/fi";
// import Logo from "../content/Logo.png";

// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   const location = useLocation(); // Get the current location

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isOpen && !event.target.closest(".sidebar")) {
//         toggleSidebar();
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen, toggleSidebar]);

//   const sidebarClasses = `fixed top-0 left-0 h-full w-64 bg-white transition-transform duration-300 ease-in-out transform sidebar ${
//     isOpen ? "translate-x-0" : "-translate-x-full"
//   } xl:translate-x-0 z-30`;

//   const navItems = [
//     { icon: FiGrid, text: "Dashboard", link: "/dashboard" },
//     { icon: FiUser, text: "Supervisor", link: "/supervisor" },
//     { icon: FiUsers, text: "Members", link: "/members" },
//     { icon: FiFolder, text: "Projects", link: "/projects" },
//     { icon: FiCalendar, text: "Meetings", link: "/meetings" },
//     { icon: FiUser, text: "Profile", link: "/profile" },
//   ];

//   return (
//     <div className={sidebarClasses}>
//       <div className="h-full flex flex-col p-4 relative">
//         <button
//           className="absolute top-4 right-4 xl:hidden text-gray-700 hover:text-gray-900"
//           onClick={toggleSidebar}
//         >
//           <FiX size={24} />
//         </button>

//         <div className="mb-2">
//           <img
//             src={Logo}
//             alt="Logo"
//             className="w-60 " // Adjust the width as needed
//           />
//         </div>

//         <div className="mb-4 text-sm font-medium text-gray-500">Main Menu</div>

//         <nav className="flex-grow">
//           {navItems.map((item, index) => {
//             const isActive = location.pathname === item.link;
//             return (
//               <Link
//                 key={index}
//                 to={item.link}
//                 className={`flex items-center px-4 py-2 mb-2 rounded-md ${
//                   isActive
//                     ? "bg-[#0075FF] text-white"
//                     : "text-gray-700 hover:bg-gray-100"
//                 }`}
//               >
//                 <item.icon className="mr-2 w-5 h-5" />
//                 <span>{item.text}</span>
//               </Link>
//             );
//           })}
//         </nav>

//         <div className="mt-auto">
//           <Link
//             to="/logout"
//             className="flex items-center px-4 py-2 text-gray-700 hover:text-gray-900"
//           >
//             <FiLogOut className="mr-2" />
//             <span>Logout</span>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiGrid,
  FiUser,
  FiUsers,
  FiFolder,
  FiCalendar,
  FiLogOut,
  FiX,
} from "react-icons/fi";
import Logo from "../content/Logo.png";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation(); // Get the current location

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".sidebar")) {
        toggleSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  const sidebarClasses = `fixed top-0 left-0 h-full w-64 bg-white transition-transform duration-300 ease-in-out transform sidebar ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  } xl:translate-x-0 z-30`;

  const navItems = [
    { icon: FiGrid, text: "Dashboard", link: "/dashboard" },
    { icon: FiUser, text: "Supervisor", link: "/supervisor" },
    { icon: FiUsers, text: "Members", link: "/members" },
    { icon: FiFolder, text: "Projects", link: "/projects" },
    { icon: FiCalendar, text: "Meetings", link: "/meetings" },
    { icon: FiUser, text: "Profile", link: "/profile" },
  ];

  return (
    <div className={sidebarClasses}>
      <div className="h-full flex flex-col p-4 relative">
        {/* Close button for small screens */}
        <button
          className="absolute top-4 right-4 xl:hidden text-gray-700 hover:text-gray-900"
          onClick={toggleSidebar}
        >
          <FiX size={24} />
        </button>

        {/* Logo */}
        <div className="mb-2 flex justify-center">
          <img
            src={Logo}
            alt="Logo"
            className="w-80" // Adjust the width as needed
          />
        </div>

        {/* Main Menu */}
        <div className="mb-4 text-sm font-medium text-gray-500 uppercase tracking-wide">
          Main Menu
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.link;
            return (
              <Link
                key={index}
                to={item.link}
                className={`flex items-center px-4 py-2 mb-2 rounded-lg font-medium ${
                  isActive
                    ? "bg-[#0075FF] text-white shadow"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <item.icon className="mr-3 w-5 h-5" />
                <span>{item.text}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Link */}
        <div className="mt-auto">
          <Link
            to="/logout"
            className="flex items-center px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
          >
            <FiLogOut className="mr-3 w-5 h-5" />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
