import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Shop from "./components/Shop";
import NavBar from "./components/NavBar";
import ShowProduct from "./components/ShowProduct";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Profile from "./components/auth/Profile.js";
import ShoppingCart from "./components/ShoppingCart.js";
import Orders from "./components/Orders.js";
import { ShopContextProvider} from "./components/context/ShopContext.js";
import Dashboard from "./components/dashboard/Dashboard.js";
import { useEffect, useState } from "react";
const App = () => {
  const [show, setShow] = useState(true)
  useEffect(()=>{
    const lastIndex = window.location.href.lastIndexOf("/")
    if(window.location.href.slice(lastIndex+1) == "dashboard"){
      setShow(false)
    }
  })

  return (
    <div className="App w-screen relative">
      <ShopContextProvider>
        <Router>
          {show && <NavBar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop/:category?/:tag?" element={<Shop />} />
            <Route path="/item/:id" element={<ShowProduct />} />
            <Route path="/auth/register" element={<Register/>} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/shoppingCart" element={<ShoppingCart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
};

export default App;