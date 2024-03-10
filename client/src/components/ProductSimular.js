import React, { useEffect, useRef, useState } from "react";
import Article from "./Article";
import arrow_slidder from "../assets/arrow_slidder.png";
import electro from "../assets/electro.png";
import json from "../db.json";
import { Link } from "react-router-dom";

const ProductSimular = () => {
  const [data, setData] = useState(null);
  const sliderDiv = useRef("");
  useEffect(() => {
    // axios.get("https://fakestoreapi.com/products").then((res) => {
    setData(json);
    // });
  }, []);
  let scrollx = window.scrollX;
  const Slide = (to) => {
    if (to === "right") scrollx += 300;
    if (to === "left") scrollx -= 300;
    sliderDiv.current.scroll({
      left: scrollx, // Scroll to the specified horizontal position
      behavior: "smooth",
    });
  };
  return (
    <section className="flex items-center justify-center">
      <div
        className="relative flex justify-center gap-5 overflow-hidden w-[1700px] p-5"
      >
        <div className="relative w-[1700px] flex items-center justify-center">
          <img
            onClick={() => Slide("right")}
            src={arrow_slidder}
            className="absolute right-0 mb-5 w-[90px] opacity-60 hover:opacity-100  z-20 cursor-pointer transition-all"
          />
          <div>
            <h1 className="text-[40px] text-left font-semibold italic">
            Products Simular
            </h1>
            <div
              ref={sliderDiv}
              className="relative flex justify-center gap-5 overflow-hidden w-[1700px] p-5"
            >
              {data
                ?.filter((art) => art.category == "electronics")
                .map((art) => (
                  <Link to={`/item/${art.id}`}>
                    <Article
                      title={art.title}
                      image={art.image}
                      price={art.price}
                    />
                  </Link>
                ))}
            </div>
          </div>
          <img
            onClick={() => Slide("left")}
            src={arrow_slidder}
            className="absolute left-1 mb-5 w-[90px] opacity-60 hover:opacity-100 rotate-180 z-20 cursor-pointer transition-all"
          />
        </div>
      </div>
    </section>
  );
};

export default ProductSimular;
