import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import cart from "../assets/cart.png"
import { useContext } from "react";
import { ShopContext } from "./context/ShopContext";
const Article = ({title, price, image, id}) => {
  const {addToShopCart, added, setAdded} = useContext(ShopContext)
  const refLink = useRef("")
  const goTo = ()=>{
    refLink.current.click()
  }
  return (
    <div className="relative flex-shrink-0 w-[260px] h-[400px] flex flex-col items-center justify-around gap-5 shadow border rounded-lg px-4 py-3 hover:scale-105 transition-all duration-300 cursor-pointer">
      <Link ref={refLink} to={`/item/${id}`}></Link>
      <div onClick={goTo} className="w-[70%] overflow-hidden ">
        <img src={image} className="w-full"/>
      </div>
      <h1 className=" max-w-[300px] max-h-[50px] overflow-ellipsis font-semibold" >{title}</h1>
      <div className="w-full flex items-center justify-between">
        <p className="text-[25px] font-semibold">${price}</p>
        <div className="group flex items-center rounded-full w-[50px] h-[50px] py-2 px-2 border border-black hover:w-[134px] transition-all duration-300 overflow-hidden cursor-pointer active:scale-95">
          <img src={cart} className="hover:"/>
          <button className="opacity-0 group-hover:opacity-100 text-black text-[20px] font-semibold transition-all duration-200 cursor-pointer" onClick={()=>{
            addToShopCart({product_id:id,qte:1,prix:price})
          }}>ShopCart</button>
        </div>
      </div>
    </div>
    
  );
};

export default Article;
