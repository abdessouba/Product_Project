import React, { useContext, useState } from "react";
import "../../App.css";
import process from "../../assets/process.png";
import SideBar from "./SideBar";
import ShowProducts from "./ShowProducts";
import { ShopContext } from "../context/ShopContext";
import notification from "../../assets/notification.png";
import chat from "../../assets/chat.png";
import { DashboardContext } from "./dashContext/DashboardContext";
import Statistics from "./Statistics";

const Dashboard = () => {
  const { client } = useContext(ShopContext);
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState(false);
  const [component, setComponent] = useState("statistics");
  setTimeout(() => {
    setShow(true);
  }, 2000);
  return (
    <DashboardContext>
      <div>
        {!show && (
          <div className="fade absolute top-0 bottom-0 left-0 right-0 h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-100 via-yellow-300 to-yellow-500 z-50">
            <div className="flex item-end justify-center">
              <img src={process} className="w-[20%] animate-spin" />
              <div className="">
                <h1 className="text-6xl font-bold">SELLER</h1>
                <h1 className="text-6xl font-bold ml-3">MODE</h1>
              </div>
            </div>
          </div>
        )}
        {show && (
          <div className="flex gap-8 h-screen">
            <SideBar setComponent={setComponent} />
            <main className="w-full ">
              <nav className="w-full h-[150px] flex items-center justify-end">
                <div className="flex items-start justify-start mx-10">
                  <div className="flex flex-col justify-center items-center font-semibold mt-2 mx-2 text-lg">
                    <div>
                      <p>{client?.prenom}</p>
                      <p>{client?.nom}</p>
                    </div>
                    <div>
                      <img
                        src={notification}
                        className="w-[30px] inline ml-5 cursor-pointer animate-pulse"
                      />
                      <img
                        src={chat}
                        className="w-[30px] inline ml-2 cursor-pointer"
                      />
                    </div>
                  </div>
                  <div className="ring-2 ring-slate-500 rounded-full p-1">
                    <img
                      src={client?.image}
                      className="w-[80px] rounded-full"
                    />
                  </div>
                </div>
              </nav>
              {component == "statistics" && <Statistics />}
              {component == "showproducts" && <ShowProducts />}
            </main>
          </div>
        )}
      </div>
    </DashboardContext>
  );
};

export default Dashboard;
