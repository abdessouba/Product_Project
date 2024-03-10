import React, { useContext } from "react";
import cart from "./assets/cart.png";
import view from "./assets/view.png";
import arrowup from "./assets/arrow-up.png";
import shopping_bag from "./assets/shopping-bag.png";
import { DashContext } from "./dashContext/DashboardContext";

const Statistics = () => {
  const { } = useContext(DashContext)
  return (
    <div className=" w-[80%] m-auto flex gap-6 items-start">
      <div>
        <section className="flex gap-10 items-center">
          <div className="relative bg-slate-300 w-[300px] py-4 px-6 flex-col items-center gap-4 rounded-md hover:ring hover:ring-indigo-300 transition-all duration-300">
            <div className="bg-slate-200 p-5 rounded-full w-fit border-[2.5px] border-black hover:bg-white/70 transition-all duration-200 cursor-pointer">
              <img src={view} className="w-[25px]" />
            </div>
            <div className="ml-1">
              <p className="text-3xl font-bold font-mono">00</p>
              <p className="text-xl font-semibold text-gray-600">Total Views</p>
            </div>
            <p className="text-[#91bb7d] absolute right-4 bottom-7 font-semibold text-lg">
              20%
              <img src={arrowup} className="inline mb-2" />
            </p>
          </div>
          <div className="relative bg-slate-300 w-[300px] py-4 px-6 flex-col items-center gap-4 rounded-md hover:ring hover:ring-indigo-300 transition-all duration-300">
            <div className="bg-slate-200 p-5 rounded-full w-fit border-[2.5px] border-black hover:bg-white/70 transition-all duration-200 cursor-pointer">
              <img src={cart} className="w-[25px]" />
            </div>
            <div className="ml-1">
              <p className="text-3xl font-bold font-mono">$00</p>
              <p className="text-xl font-semibold text-gray-600">Total Sells</p>
            </div>
            <p className="text-[#91bb7d] absolute right-4 bottom-7 font-semibold text-lg">
              20%
              <img src={arrowup} className="inline mb-2" />
            </p>
          </div>
          <div className="relative bg-slate-300 w-[300px] py-4 px-6 flex-col items-center gap-4 rounded-md hover:ring hover:ring-indigo-300 transition-all duration-300">
            <div className="bg-slate-200 p-5 rounded-full w-fit border-[2.5px] border-black hover:bg-white/70 transition-all duration-200 cursor-pointer">
              <img src={shopping_bag} className="w-[25px]" />
            </div>
            <div className="ml-1">
              <p className="text-3xl font-bold font-mono">{}</p>
              <p className="text-xl font-semibold text-gray-600">
                Total Products
              </p>
            </div>
            <p className="text-[#91bb7d] absolute right-4 bottom-7 font-semibold text-lg">
              20%
              <img src={arrowup} className="inline mb-2" />
            </p>
          </div>
        </section>
        <section>
          <div className="w-[980px] rounded-lg my-5 h-[400px] bg-slate-300 hover:ring hover:ring-indigo-300 transition-all duration-300"></div>
        </section>
      </div>
      <section className="bg-slate-300 w-full h-[590px] rounded-lg hover:ring hover:ring-indigo-300 transition-all duration-300">
        
      </section>
    </div>
  );
};

export default Statistics;
