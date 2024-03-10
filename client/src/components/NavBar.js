import React, { useEffect, useState, useContext } from "react";
import shopLogo from "../assets/shop_logo.png";
import { Link } from "react-router-dom";
import heart from "../assets/heart-fill.png";
import burger from "../assets/burger.png";
import arrow_down from "../assets/arrow_down.png";
import shopping_basket from "../assets/shopping_basket.png";
import SearchAll from "./SearchAll";
import "../App.css";
import axios from "axios";
import order from "../assets/orders.png";
import logout from "../assets/logout.png";
import profile from "../assets/login_img.png";
import seller from "../assets/seller.png";
import { ShopContext } from "./context/ShopContext";

const NavBar = () => {
  const [client, setClient] = useState(null);
  
  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost/product_project/server/login.php?q=client")
      .then((res) => {
        if (res.data.check) {
          setClient(...res.data["data"]);
        }
      });
  }, []);
  const {getShopCart, shop, removeCart, setCategoryId, setTagId} = useContext(ShopContext)
  useEffect(()=>{
    getShopCart()
  },[])
  const [id, setId] = useState(1);

  const [categories, setCategories] = useState(null);
  const [tags, setTags] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost/product_project/server/index.php?q=get_categories")
      .then(
        (res) => {
          setCategories(res.data);
        },
        { withCredentials: false }
      );
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost/product_project/server/index.php?q=get_tags")
      .then(
        (res) => {
          setTags(res.data);
        },
        { withCredentials: false }
      );
  }, []);

  const LogoutAccount = () => {
    axios
      .get("http://localhost/product_project/server/login.php?q=logout")
      .then((res) => {
        if (res.data.check) {
          window.location.reload();
        }
      });
  };
  return (
    <div className="sticky top-0  z-40 ">
      <nav className="w-full z-20 p-2 border-gray-200 bg-gray-900 shadow-slate-700 shadow-md">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={shopLogo} className="h-8" />
            <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">
              MyStore
            </span>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          ></button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex items-center  p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  onClick={(e) => {
                    setId(e.target.id);
                  }}
                  style={{ color: id == 1 ? "rgb(29 78 216)" : "" }}
                  id={1}
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent  md:p-0 dark:text-white "
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  onClick={(e) => {
                    setId(e.target.id);
                  }}
                  style={{ color: id == 2 ? "rgb(29 78 216)" : "" }}
                  id={2}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Shop
                </Link>
              </li>
              <li>
                {client &&
                  <a
                  href="/dashboard"
                  onClick={(e) => {
                    setId(e.target.id);
                  }}
                  style={{ color: id == 3 ? "rgb(29 78 216)" : "" }}
                  id={3}
                  className="block py-2 px-3 text-yellow-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-blue-700"
                >
                  Sell
                </a>
                }
              </li>
              <li className=" flex items-center group cursor-pointer">
                {!client && (
                  <>
                    {" "}
                    <Link
                      to="/auth/login"
                      onClick={(e) => {
                        setId(e.target.id);
                      }}
                      style={{ color: id == 4 ? "rgb(29 78 216)" : "" }}
                      id={4}
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Login
                    </Link>
                    <span className="text-white">/</span>
                    <Link
                      to="/auth/register"
                      onClick={(e) => {
                        setId(e.target.id);
                      }}
                      style={{ color: id == 4 ? "rgb(29 78 216)" : "" }}
                      id={4}
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Register
                    </Link>{" "}
                  </>
                )}
                {client && (
                  <div className="relative ring-[2px] ring-gray-300 rounded-full p-[2px]">
                    <img src={client.image} className="rounded-full w-[43px]" />
                    <ul className=" group-hover:opacity-100 group-hover:h-[170px] opacity-0 h-[1px] transition-all duration-300  overflow-hidden text-left absolute mt-2 w-[200px] px-5 py-4 bg-white z-20 rounded-md">
                      <li className="hover:text-gray-400 ">
                        <Link
                          className="transition flex items-center gap-1 w-[20px] text-[18px] mb-1"
                          to="/profile"
                        >
                          <img src={profile} />
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link  to="orders"  className=" hover:text-gray-400 transition flex items-center gap-1 w-[20px] text-[18px] mb-1">
                          <img src={order} />
                          Orders
                        </Link>
                      </li>
                      <li
                        className=" hover:text-gray-400 transition flex items-center gap-1 w-[20px] text-[18px] mb-1"
                        onClick={LogoutAccount}
                      >
                        <img src={logout} />
                        logout
                      </li>
                    </ul>
                  </div>
                )}
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
      <section className="z-10 w-full px-36 py-5 bg-yellow-400 flex items-center justify-between text-white font-semibold text-lg">
        <ul className="flex items-center gap-7">
          <li className="group relative">
            <div className="burger_product px-5 py-3 border-2 border-white rounded-full flex items-center gap-1 cursor-pointer">
              <img src={burger} alt="Burger Icon" />
              <h1 className="cursor-pointer">All Products</h1>
              <img src={arrow_down} alt="Arrow Down Icon" />
            </div>
            <ul className="h-[1px] group-hover:h-[260px] overflow-auto group-hover:opacity-90 opacity-0 transition-all duration-300 absolute left-0 right-0 bg-white  mt-1 rounded-md shadow text-black text-left px-5 py-4">
              {categories?.map((cat) => {
                return (
                  <li key={cat.id}>
                    <p className="font-semibold text-[20px] capitalize">
                      {cat.famille}
                    </p>
                    <ul className="ml-2 text-gray-500">
                      <Link to="http://localhost:3000/shop">
                        {tags
                          ?.filter((tg) => tg.category_id == cat.id)[0]
                          ["tags"].map((tag) => {
                            return (
                              <Link  onClick={()=>{setCategoryId(cat.id)}} to={`shop`}>
                                <li
                                key={tag.id}
                                className="hover:ml-1 transition-hoevr duration-200 cursor-pointer"
                              >
                                -{tag.tag}
                              </li>
                              </Link>
                            );
                          })}
                      </Link>
                    </ul>
                  </li>
                );
              })}
            </ul>
          </li>
          <li className="hover:text-slate-700 transition duration-200">
            <Link to="/shop/1">Clothes</Link>
          </li>
          <li className="hover:text-slate-700 transition duration-200">
            <Link to="/shop/2">Electronics</Link>
          </li>
          <li className="hover:text-slate-700 transition duration-200">
            <Link to="/shop">Last Visited</Link>
          </li>
        </ul>
        <ul className="flex items-center gap-2">
          <li>
            <SearchAll />
          </li>
          <li>
            <img src={heart} />
          </li>
          <li className="group relative">
            <div className="absolute w-3 h-3 bg-red-500 rounded-full right-0 flex items-center justify-center text-xs">{shop?.length || 0}</div>
            <span className="cursor-pointer">
              <img src={shopping_basket} />
            </span>
            {/*   */}
            <ul className="h-[1px] group-hover:opacity-100 group-hover:h-[380px] opacity-0 transition-all duration-500 overflow-auto text-left absolute -right-0 top-9 ring ring-gray-300 mt-2 w-[300px] px-5 py-4 bg-white z-20 rounded-md">
              {shop?.map((cart)=>{
                return (
                  <li className="text-slate-600 mb-4 relative">
                    <button onClick={()=>{removeCart(cart.product_id)}} className="absolute right-0 top-0 text-sm bg-slate-200 rounded-full w-4 h-4 flex items-center justify-center cursor-pointer">x</button>
                    <div className="flex items-center gap-4">
                      <img src={cart.image} className="w-[60px]"/>
                      <div>
                        <h1 className="text-sm font-semibold max-w-[170px] max-h-[40px] overflow-hidden">{cart.designation}</h1>
                        <p className="inline-block mr-4 text-gray-400 text-sm">x{cart.qte}</p>
                        <p className="inline-block text-red-600 text-md">${cart.ttc * cart.qte}</p>
                      </div>
                    </div>
                    
                  </li>
                )
              })}
            <Link to="shoppingCart" className="border-2 border-slate-400 bg-white rounded-lg  py-2 px-10 sticky bottom-0 text-black ml-12">CheckOut</Link>
            </ul>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default NavBar;
