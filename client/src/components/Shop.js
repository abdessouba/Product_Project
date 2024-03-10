import React, { useContext, useEffect, useRef, useState } from "react";
import Article from "./Article";
import search_icon from "../assets/find.png";
import x from "../assets/close.png";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import loading from "../assets/loading.png";
import { ShopContext } from "./context/ShopContext";

const Shop = () => {
  const { tag, category } = useParams();
  const [range, setRange] = useState(0);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState(null);
  const [tags, setTags] = useState(null);
  axios.defaults.withCredentials = true;
    
  const { data, setTagId, setCategoryId, categoryId, tagId } = useContext(ShopContext);

  useEffect(() => {
    setCategoryId(category);
    setTagId(tag);
  }, [tag, category]);

  useEffect(() => {
    axios
      .get("http://localhost/product_project/server/index.php?q=get_categories")
      .then((res) => {
        setCategories(res.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost/product_project/server/index.php?q=get_tags")
      .then((res) => {
        setTags(res.data);
      });
  }, []);
  const styleActive = { marginLeft: "1rem", fontWeight: "600" };

  useEffect(() => {
    setTagId(null);
  }, [categoryId]);

  return (
    <div className="w-[80%] m-auto px-10 flex gap-20 my-20">
      <section className="text-left w-[300px] h-[600px] bg-gray-100 shadow border  rounded-lg px-5 py-4">
        <h1 className="text-4xl font-bold mb-2">Categories:</h1>
        <ul className=" ml-3 text-2xl">
          {categories?.map((cat) => {
            return (
              <li
                className="text-slate-600 cursor-pointer capitalize"
                onClick={() => {
                  setCategoryId(cat.id);
                }}
              >
                <span
                  className="w-2 h-2 rotate-45 inline-block mr-1"
                  style={{
                    backgroundColor: categoryId == cat.id ? "orange" : "black",
                  }}
                ></span>
                <span
                  className={
                    categoryId == cat.id ? "font-semibold underline" : ""
                  }
                >
                  {cat.famille}
                </span>
                {categoryId == cat.id && (
                  <ul className="text-gray-500 text-[18px]  transition-all duration-300">
                    {tags
                      ?.filter((tg) => tg.category_id == cat.id)[0]
                      ["tags"].map((tag) => {
                        return (
                          <li
                            className="ml-2 cursor-pointer hover:font-semibold hover:ml-4 transition-all duration-300"
                            onClick={() => {
                              setTagId(tag.id);
                            }}
                            style={tagId == tag.id ? styleActive : null}
                          >
                            +{tag.tag}
                          </li>
                        );
                      })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
        <h1 className="text-4xl font-bold my-2">Filter By:</h1>
        <div className="flex items-center justify-center gap-1">
          <span className="font-semibold">{range}$</span>
          <input
            type="range"
            onChange={(e) => {
              setRange(e.target.value);
            }}
            value={range}
            max={1000}
            className="w-[65%]"
          />
          <span className="font-semibold">1000$</span>
        </div>
        <h1 className="text-4xl font-bold my-2">Colors:</h1>
        <ul className="flex justify-center items-center gap-5">
          <li className="rounded-full bg-yellow-300 w-9 h-9 cursor-pointer"></li>
          <li className="rounded-full bg-blue-300 w-9 h-9 cursor-pointer"></li>
          <li className="rounded-full bg-red-300 w-9 h-9 cursor-pointer"></li>
          <li className="rounded-full bg-slate-300 w-9 h-9 cursor-pointer"></li>
          <li>
            <div className="rounded-full w-9 h-9 overflow-hidden flex justify-center items-center">
              <input
                type="color"
                className="w-10 h-10 cursor-pointer scale-125"
              />
            </div>
          </li>
        </ul>
      </section>
      <section className="flex justify-center items-center gap-3 flex-wrap">
        <div className="flex justify-between items-end w-full px-5 mb-1">
          <ul className="flex items-center justify-center gap-5 text-[23px] italic font-semibold text-gray-500">
            {(categoryId && (
              <li className="bg-gray-400 py-1 px-2 rounded flex items-center gap-2">
                <span className="text-white capitalize">
                  {categories?.filter((ctg) => ctg.id == categoryId)[0].famille}
                  {tagId && ":"}{" "}
                </span>
                <span className="underline text-black">
                  {
                    tags
                      ?.filter((obj) => obj.category_id == categoryId)[0]
                      ["tags"].filter((tag) => tag.id == tagId)[0]?.tag
                  }
                </span>
                <button
                  onClick={() => {
                    setCategoryId(null);
                  }}
                >
                  <img src={x} className="w-[10px] mb-4 cursor-pointer" />
                </button>
              </li>
            )) ||
              ""}
            <li className="hover:text-gray-400 transition duration-200 cursor-pointer ">
              Trending
            </li>
            <li className="hover:text-gray-400 transition duration-200 cursor-pointer ">
              New Arrived
            </li>
            <li className="hover:text-gray-400 transition duration-200 cursor-pointer ">
              Top Rated
            </li>
          </ul>
          <div className="relative ">
            <input
              type="text"
              placeholder="Search Clothes..."
              className="w-[300px] px-3 py-2 rounded-lg text-black border border-yellow-400 shadow"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <img
              src={search_icon}
              width={25}
              className="absolute top-[0.60rem] right-1"
            />
          </div>
        </div>
        <div className="w-full">
          <div className="relative grid grid-cols-4 gap-5 min-h-[300px]">
            {!data && (
              <div className="w-[100px] absolute left-1/2 -translate-x-1/2 ">
                <img src={loading} className="w-[60%] animate-spin" />
              </div>
            )}
            {Array.isArray(data) &&
              data
                ?.filter((art) =>
                  art.designation.toLowerCase().includes(search.toLowerCase())
                )
                .filter((art)=>art.prix_ttc >= range)
                .map((art) => (
                  <Article
                    title={art.designation}
                    image={art.image}
                    price={art.prix_ttc}
                    id={art.id}
                  />
                ))}
          </div>
          <ul className="grid grid-cols-4 w-[120px]  bg-black ml-auto text-white">
            <li className="w-[30px] bg-slate-600 h-[30px] p-2 border border-yellow-400 flex items-center justify-center hover:bg-slate-500 transition-all duration-200 cursor-pointer">
              1
            </li>
            <li className="w-[30px] bg-slate-600 h-[30px] p-2 border border-yellow-400 flex items-center justify-center hover:bg-slate-500 transition-all duration-200 cursor-pointer">
              2
            </li>
            <li className="w-[30px] bg-slate-600 h-[30px] p-2 border border-yellow-400 flex items-center justify-center hover:bg-slate-500 transition-all duration-200 cursor-pointer">
              3
            </li>
            <li className="w-[30px] bg-slate-600 h-[30px] p-2 border border-yellow-400 flex items-center justify-center hover:bg-slate-500 transition-all duration-200 cursor-pointer">
              4
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Shop;
