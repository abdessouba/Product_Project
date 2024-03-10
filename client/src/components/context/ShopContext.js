import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [shop, setShop] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [tagId, setTagId] = useState(null);
  const [data, setData] = useState(null);
  const [bonLivraison, setBonLivraison] = useState([])
  const [client, setClient] = useState(null);
  
  // get client infos
  useEffect(()=>{
    axios.get("http://localhost/product_project/server/login.php?q=client").then((res)=>{
      if(res.data.check){
        setClient(...res.data["data"])
      }
    })
  },[])

  useEffect(() => {
    axios
      .get(
        `http://localhost/product_project/server/index.php?q=get_products&c=${
          categoryId || ""
        }&t=${tagId || ""}`
      )
      .then((res) => {
        setData(res.data);
      });
  }, [tagId, categoryId]);

  const addToShopCart = (data) => {
    axios
      .post(
        "http://localhost/product_project/server/clientinfos.php?q=addtoshopcart",
        data
      )
      .then((res) => {
        if (!res.data.check) {
          alert("you have to log in first");
        }
        getShopCart();
      });
  };
  const getShopCart = () => {
    axios
      .get(
        "http://localhost/product_project/server/clientinfos.php?q=get-shopcart"
      )
      .then((res) => {
        setShop(res.data["data"]);
      });
  };
  const removeCart = (id) => {
    axios
      .delete(
        `http://localhost/product_project/server/clientinfos.php?q=remove-shopcart&id=${id}`
      )
      .then((res) => {
        console.log(res.data.check);
        getShopCart();
      });
  };
  const [message, setMessage] = useState("");
  const CheckOut = () => {
    axios
      .post("http://localhost/product_project/server/checkout.php?q=add_bl", {
        date: Date.now(),
        prix: null,
        mode_r: null,
      })
      .then((res) => {
        if (res.data.check) {
          setMessage(true);
          getShopCart()
        }
      });
  };
  const GetBl = (id=null)=>{
    axios.get(`http://localhost/product_project/server/checkout.php?q=get_bl_details&id=${id}`).then((res)=>{
      if(res.data.check){
        setBonLivraison(res.data["data"])
      }
    })
  }
  return (
    <ShopContext.Provider
      value={{
        data,
        addToShopCart,
        getShopCart,
        shop,
        removeCart,
        setTagId,
        setCategoryId,
        categoryId,
        tagId,
        CheckOut,
        message,
        setMessage,
        GetBl,
        bonLivraison,
        client
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export { ShopContext, ShopContextProvider };
