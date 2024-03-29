import React, { useContext, useEffect, useState } from "react";
import shop from "../../assets/shop_logo.png";
import logout from "../../assets/logout_.png";
import { DashContext } from "./dashContext/DashboardContext";

const SideBar = ({ setComponent }) => {
  const [showProduct, setShowProduct] = useState(false);
  const [showDash, setShowDash] = useState(false);
  const [option, setOption] = useState(0);
  const active = " text-indigo-400 ml-3";

  return (
    <aside className="w-[350px] m-3 rounded-xl bg-slate-700 p-5 shadow">
      <div className="flex items-center justify-center gap-2">
        <img src={shop} className="w-[30px]" />
        <h1 className="text-white font-bold text-2xl">Store Managment</h1>
      </div>
      <hr className="h-1 bg-white my-3 rounded-lg" />
      <ul className="text-xl text-white ml-4 flex flex-col justify-center gap-2">
        <li>
          <div
            onClick={() => {
              setShowDash((prev) => !prev);
              setOption(0);
              setShowProduct(false);
            }}
            className="flex items-center gap-2 font-semibold hover:bg-slate-500 py-1 px-2 rounded-md transition duration-200 cursor-pointer"
          >
            <svg
              class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 21"
            >
              <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
              <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
            </svg>
            <p className="cursor-pointer" 
            onClick={() => {
              setComponent("statistics")
            }}
            >Dashboard</p>
            <svg
              class="w-3 h-3 ml-auto"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </div>
          {showDash && (
            <ul className="transition-all ml-10">
              <li
                onClick={() => {
                  setOption(1);
                }}
                className={`text-lg font-semibold p-1 italic cursor-pointer ${
                  option == 1 && active
                } transition-all duration-200`}
              >
                Sells
              </li>
              <li
                onClick={() => {
                  setOption(2);
                }}
                className={`text-lg font-semibold p-1 italic cursor-pointer ${
                  option == 2 && active
                } transition-all duration-200`}
              >
                Show Products
              </li>
            </ul>
          )}
        </li>
        <li>
          <div
            onClick={() => {
              // setShowProduct((prev) => !prev);
              setComponent("showproducts")
              setOption(0);
              setShowDash(false);
            }}
            className="flex items-center gap-2 font-semibold hover:bg-slate-500 py-1 px-2 rounded-md transition duration-200 cursor-pointer"
          >
            <svg
              class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
            </svg>
            <p className="cursor-pointer">Products</p>
            {/* <svg
              class="w-3 h-3 ml-auto"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg> */}
          </div>
          {/* {showProduct && (
            <ul className="transition-all ml-10">
              <li
                onClick={() => {
                  setOption(3);
                }}
                className={`text-lg font-semibold p-1 italic cursor-pointer ${
                  option == 3 && active
                } transition-all duration-200`}
              >
                Manage Products
              </li>
              <li
                onClick={() => {
                  setOption(4);
                  setComponent("showproducts");
                }}
                className={`text-lg font-semibold p-1 italic cursor-pointer ${
                  option == 4 && active
                } transition-all duration-200`}
              >
                Show Products
              </li>
            </ul>
          )} */}
        </li>
        <li>
          <a
            href="/"
            className="flex items-center gap-2 font-semibold hover:bg-slate-500 py-1 px-2 rounded-md transition duration-200 cursor-pointer"
          >
            <img src={logout} />
            <p className="font-semibold text-xl cursor-pointer">Store</p>
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
