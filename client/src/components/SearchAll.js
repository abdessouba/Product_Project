import React, { useState, useContext, useEffect } from "react";
import rech from "../assets/find.png";
import { Link } from "react-router-dom";
import axios from "axios";
const SearchAll = () => {
  const [data, setData] = useState(null)
  const [search, setSearch] = useState("")

  useEffect(()=>{
    axios.get("http://localhost/product_project/server/article.php?q=get-products").then((res)=>{
      setData(res.data)
    })
  },[])

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="w-[300px] px-3 py-2 rounded-lg text-black"
          value={search}
          onChange={(e)=>{setSearch(e.target.value.toLocaleLowerCase())}}
        />
        <img
          src={rech}
          width={25}
          className="absolute top-[0.69rem] right-1"
        />
      </div>
      {search && (
        <div className="flex flex-col gap-5 items-start justify-start absolute w-full max-h-[300px] overflow-auto bg-white mt-1 rounded-md py-2 px-3">
            {data?.filter((art)=>art.designation.toLowerCase().includes(search.trim())).map((art)=>{
                return (
                    <Link onClick={()=>{window.location.href = `/item/${art.id}`}} to={`/item/${art.id}`} className="flex gap-1">
                        <img src={art.image} className="w-[50px] cursor-pointer"/>
                        <div className=" text-left cursor-pointer">
                            <h1 className="text-black text-sm max-w-[200px] overflow-ellipsis">{art.designation}</h1>
                            <p className="text-red-600 ml-1">${art.ttc}</p>
                        </div>
                    </Link>
                )
            })}
            {!data && <p className="text-gray-400 text-center w-full">no data found</p>}
        </div>
      )}
    </div>
  );
};

export default SearchAll;
