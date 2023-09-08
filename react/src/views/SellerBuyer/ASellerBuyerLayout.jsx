import { Navigate, Outlet, useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../context/ContextProvider.jsx";
import { useState } from "react";

export default function ASellerBuyerlayout() {
  const {
    currentUserID,
    token,
    userType,
    userName,
    setToken,
    setCurrentUserID,
    setUserName,
    setUserType,
  } = useStateContext();

  if (!token) {
    localStorage.clear();
    setToken(null);
    setCurrentUserID(null);
    setUserName(null);
    setUserType(null);
    return <Navigate to="/login" />;
  }
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // const [showMenu, setShowMenu] = useState(false);

  const onLogoutConfirm = () => {
    const isConfirmed = window.confirm("Are you sure you want to logout?");
    if (isConfirmed) {
      axiosClient.post("/logout").then(() => {
        setToken(null);
        setUserName(null);
        setCurrentUserID(null);
        setUserType(null);
        return <Navigate to="/login" />;
      });
    }
  };

  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post("/logout").then(() => {
      setToken(null);
      setUserName(null);
      setCurrentUserID(null);
      setUserType(null);
      navigate("/login");
    });
  };

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div>
      <div className="dark:bg-gray-900 bg-green-300">
        <div className="container mx-auto relative ">
          <div className="bg-green-300 p-2">
            <div className="container mx-auto flex items-center justify-between">
              {/* Left side of the navigation */}
              <div className="relative group">
                {/* Title */}
                <p
                  className={`text-white text-md ${
                    isDropdownOpen ? "group-hover:text-gray-200" : ""
                  }`}
                >
                  <button
                    onClick={toggleDropdown}
                    className="ml-2 text-white focus:outline-none"
                    title="MENU"
                  >
                    {isDropdownOpen ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        height="2em"
                        width="2em"
                      >
                        <path d="M15 11h7v2h-7zm1 4h6v2h-6zm-2-8h8v2h-8zM4 19h10v-1c0-2.757-2.243-5-5-5H7c-2.757 0-5 2.243-5 5v1h2zm4-7c1.995 0 3.5-1.505 3.5-3.5S9.995 5 8 5 4.5 6.505 4.5 8.5 6.005 12 8 12z" />
                      </svg>
                    ) : (
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        height="2em"
                        width="2em"
                      >
                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <path d="M13 7 A4 4 0 0 1 9 11 A4 4 0 0 1 5 7 A4 4 0 0 1 13 7 z" />
                        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                      </svg>
                    )}
                  </button>
                  <span className="text-center items-center">&nbsp;Role</span>
                </p>
                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <div className="absolute mt-6 w-48 bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href="/buyer-seller/role/buyer"
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-200"
                    >
                      Buyer Mode
                    </a>
                    <a
                      href="http://127.0.0.1:3000/buyer-seller/dashboard"
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-200"
                    >
                      Seller Mode
                    </a>
                    {/* Add more dropdown items as needed */}
                  </div>
                )}
              </div>

              {/* Center logo */}
              <div className=" items-center ">
                <p className="text-xl text-white font-bold mt-0 mb-0">
                  {" "}
                  E-Tabo
                  <span className="text-xs text-black">&nbsp;Seller Mode</span>
                </p>
              </div>

              {/* Right side of the navigation */}
              <div className="flex items-center space-x-4">
                {/* Logout button */}
                <a
                  href="/buyer-seller/dashboard "
                  className="dark:text-white dark:hover:text-gray-300 text-base text-right text-gray-800  hover:text-white"
                >
                  Dashboard
                </a>
                &nbsp; |
                <a
                  href="/seller/center"
                  className="dark:text-white dark:hover:text-gray-300 text-base text-right text-gray-800  hover:text-white"
                >
                  Seller Center
                </a>
                &nbsp; | &nbsp;
                <button
                  onClick={onLogoutConfirm}
                  className="text-gray-800 hover:text-white focus:outline-none"
                  title="Logout"
                >
                  <svg
                    viewBox="0 0 1024 1024"
                    fill="currentColor"
                    height="2em"
                    width="2em"
                  >
                    <path d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 01-112.7 75.9A352.8 352.8 0 01512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 01-112.7-75.9 353.28 353.28 0 01-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 000-12.6z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-0">
        <div className="p-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

// <div className="py-4 mx-4 md:mx-6">
// <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 py-4">
//   <div>

//       <p className="text-md text-slate-100 ">Seller & Buyer DASHBOARD</p>

//   </div>
//   <div className="hidden md:block">
//     <ul className="flex items-center space-x-6">
//       <li>
//         <a
//           href="/buyer-seller/dashboard"
//           className="dark:text-white  text-base text-right text-gray-800 focus:outline-none  hover:text-white"
//         >
//           Dashboard
//         </a>
//       </li>
//       <li>
//         <a
//           href="/buyer-seller/order/products"
//           className="dark:text-white dark:hover:text-gray-300 text-base text-right text-gray-800  hover:text-white"
//         >
//           Buy Goods
//         </a>
//       </li>
//       <li>
//         <a
//           href="/buyer-seller/farmers/product/"
//           className="dark:text-white dark:hover:text-gray-300 text-base text-right text-gray-800  hover:text-white"
//         >
//           Farms
//         </a>
//       </li>
{
  /* <li>
        <a
          href="/buyer-seller/orders"
          className="dark:text-white dark:hover:text-gray-300 text-base text-right text-gray-800  hover:text-white"
        >
          Orders
        </a>
      </li> */
}
{
  /* <li>
        <a
          href="/seller/center"
          className="dark:text-white dark:hover:text-gray-300 text-base text-right text-gray-800  hover:text-white"
        >
          Seller Center
        </a>
      </li>
    </ul>
  </div>
  <div className="hidden md:flex items-center space-x-4">
    <a
      onClick={onLogoutConfirm}
      className=" p-0.5 rounded"
    >
      hhh
      <svg
        className="fill-stroke text-gray-800 dark:text-white"
        width={18}
        height={20}
        viewBox="0 0 18 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17 19V17C17 15.9391 16.5786 14.9217 15.8284 14.1716C15.0783 13.4214 14.0609 13 13 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 9C11.2091 9 13 7.20914 13 5C13 2.79086 11.2091 1 9 1C6.79086 1 5 2.79086 5 5C5 7.20914 6.79086 9 9 9Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>

    <a
      title="Cart"
      href="/buyer-seller/orders"
      className=" p-0.5 rounded"
    >
      <svg
        className="fill-stroke text-gray-800 dark:text-white"
        width={20}
        height={22}
        viewBox="0 0 20 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 1L1 5V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V5L16 1H4Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1 5H19"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 9C14 10.0609 13.5786 11.0783 12.8284 11.8284C12.0783 12.5786 11.0609 13 10 13C8.93913 13 7.92172 12.5786 7.17157 11.8284C6.42143 11.0783 6 10.0609 6 9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  </div>
  <div className="md:hidden">
    <button
      aria-label="open menu"
      onClick={() => setShowMenu(true)}
      className=" rounded"
    >
      <svg
        className="fill-stroke text-gray-800 dark:text-white"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 6H20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 12H20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 18H20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  </div>
</div>
</div> */
}
