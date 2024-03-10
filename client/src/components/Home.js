import React, { useEffect, useRef, useState, useContext } from "react";
import Article from "./Article";
import Footer from "./Footer";
import arrow_slidder from "../assets/arrow_slidder.png";
import mocks from "../assets/mocks.png";
import electro from "../assets/electro.png";
import loading from "../assets/loading.png";
import "../App.css";
import { Link } from "react-router-dom";
import { ShopContext } from "./context/ShopContext";
const Home = () => {
  const {data, setTagId, setCategoryId} = useContext(ShopContext)
  useEffect(()=>{
    setTagId("")
    setCategoryId("")
  },[])
  const sliderDiv = useRef("");
  const sliderDiv2 = useRef("");
 
  let scrollx = window.scrollX;
  const Slide = (to) => {
    if (to === "right") scrollx += 300;
    if (to === "left") scrollx -= 300;
    sliderDiv.current.scroll({
      left: scrollx, // Scroll to the specified horizontal position
      behavior: "smooth",
    });
  };
  const Slide2 = (to) => {
    if (to === "right") scrollx += 300;
    if (to === "left") scrollx -= 300;
    sliderDiv2.current.scroll({
      left: scrollx, // Scroll to the specified horizontal position
      behavior: "smooth",
    });
  };
  return (
    <main>
      <section className="my-10 w-[90%] m-auto">
        <div className="absolute right-20 ">
          <img src={mocks} className="rounded-lg w-[450px] ml-auto" />
          <p className="absolute w-[80%] left-1/2 -translate-x-1/2 text-center font-semibold bottom-4 border-2 border-white text-white px-4 py-3 rounded-lg hover:scale-110 transition-all duration-500 cursor-pointer">
            See All Clothes
          </p>
        </div>
        <div className="">
          <h1 className="text-[40px] text-left font-semibold italic">Trending</h1>
          <div className="relative my-10 w-[1230px] flex items-center justify-center">
            <img
              onClick={() => Slide("right")}
              src={arrow_slidder}
              className="absolute right-0 mb-5 w-[90px] opacity-60 hover:opacity-100 z-20 cursor-pointer transition-all"
            />
            <div
              ref={sliderDiv}
              className="relative flex gap-5 overflow-hidden w-[1100px] min-h-[450px] p-5"
            >
              {data?.filter((art) => art.category_id == "1")
                ?.map((art) => (
                  <Article
                    title={art.designation}
                    image={art.image}
                    price={art.prix_ttc}
                    id={art.id}
                  />
                ))}
                {!data && <img src={loading} className="w-[70px] m-auto animate-spin"/>}
            </div>
            <img
              onClick={() => Slide("left")}
              src={arrow_slidder}
              className="absolute left-5 mb-5 w-[90px] opacity-60 hover:opacity-100 rotate-180 z-20 cursor-pointer transition-all"
            />
          </div>
        </div>
      </section>
      <section className="h-screen flex items-center justify-center">
        <div className="relative">
          <img src={electro} className="w-[800px] rounded-lg" />
          <p className="absolute w-[40%] ml-7 text-center font-semibold bottom-4 border-2 border-white text-white px-4 py-3 rounded-lg hover:scale-110 transition-all duration-500 cursor-pointer">
            See All Electorincs
          </p>
        </div>
        <div
          // ref={sliderDiv}
          className="relative flex gap-5 overflow-hidden w-[1050px] p-5"
        >
          <div className="relative w-[1130px] flex items-center justify-center">
            <img
              onClick={() => Slide2("right")}
              src={arrow_slidder}
              className="absolute right-0 mb-5 w-[90px] opacity-60 hover:opacity-100  z-20 cursor-pointer transition-all"
            />
            <div>
              <h1 className="text-[40px] text-left font-semibold italic">New Products</h1>
              <div
                ref={sliderDiv2}
                className="relative flex gap-5 overflow-hidden w-[900px] min-h-[450px] p-5"
              >
                {data
                  ?.filter((art) => art.category_id == "2")
                  .map((art) => (
                    <Article
                    title={art.designation}
                    image={art.image}
                    price={art.prix_ttc}
                    id={art.id}
                  />
                  ))}
                {!data && <img src={loading} className="w-[70px] m-auto animate-spin"/>}
              </div>
            </div>
            <img
              onClick={() => Slide2("left")}
              src={arrow_slidder}
              className="absolute left-1 mb-5 w-[90px] opacity-60 hover:opacity-100 rotate-180 z-20 cursor-pointer transition-all"
            />
          </div>
        </div>
      </section>
      {/* <SideBar /> */}
      {/* <section className="my-20">
        <div className="w-[90%] m-auto">
          <div className="relative ml-[81%] w-[240px] mb-10">
            <input
              type="text"
              placeholder="Search Article..."
              className="border border-slate-600 px-3 py-2 rounded-md w-full focus:ring focus:ring-slate-300"
            />
            <img src={search} width={25} className="absolute top-2 right-1" />
          </div>
          <div>
            <h1 className="text-5xl ml-2 font-semibold">New Arrived</h1>
            <hr className="bg-slate-600 p-[2px] my-2 rounded-lg" />
            <div className="flex items-center justify-evenly gap-2 flex-wrap">
              <Article />
              <Article />
              <Article />
              <Article />
              <Article />
              <Article />
              <Article />
              <Article />
              <Article />
            </div>
          </div>
          <div>
            <h1 className="text-5xl ml-2 font-semibold pt-10">Trending</h1>
            <hr className="bg-slate-600 p-[2px] my-2 rounded-lg mb-4" />
            <div className="flex items-center justify-evenly gap-2 flex-wrap">
              <Article />
              <Article />
              <Article />
              <Article />
              <Article />
              <Article />
              <Article />
              <Article />
              <Article />
            </div>
          </div>
        </div>
      </section> */}
      <Footer />
    </main>
  );
};

export default Home;
