import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { ShopContext } from './context/ShopContext';
import { Link } from 'react-router-dom';
import Message from "../components/Message";
import card from "../assets/atm-card.png"

const ShoppingCart = () => {
    const [client, setClient] = useState(null)
    const { shop, removeCart, CheckOut, getShopCart, message, setMessage} = useContext(ShopContext)
    useEffect(()=>{
      if(shop?.length == 0 && message == false){
        window.location.href = "http://localhost:3000/shop"
      }
    },[shop])
    useEffect(() => {
        axios
          .get("http://localhost/product_project/server/login.php?q=client")
          .then((res) => {
            if (res.data.check) {
              setClient(...res.data["data"]);
            } else {
              window.location.href = "http://localhost:3000/";
            }
          });
      }, []);
  return (
    <div className='h-[80vh] py-10 bg-slate-300 flex items-start justify-center gap-5'>
      {message && (
        <>
          <Message setMessage={setMessage}/>
          <div className='absolute top-[190px] bottom-0 left-0 right-0 bg-black opacity-30 z-20'></div>
        </>
      )}
        <div className='w-[500px] py-4 px-5 bg-gray-200 rounded'>
            <h1 className='text-[35px] font-bold italic'>Client information:</h1>
            <form>
                <div className='flex flex-col gap-2 justify-center mb-5'>
                    <label className='font-semibold'>Email</label>
                    <input type='text' defaultValue={client?.email} readOnly className='py-2 px-3 rounded-md'/>
                </div>
                <div className='flex gap-2 justify-between items-center mb-5'>
                    <div className='flex flex-col gap-1 w-1/2'>
                        <label className='font-semibold'>First Name:</label>
                        <input type='text' defaultValue={client?.prenom} readOnly className='py-2 px-3 rounded-md'/>
                    </div>
                    <div className='flex flex-col gap-1 w-1/2'>
                        <label className='font-semibold'>Last Name:</label>
                        <input type='text' defaultValue={client?.nom} readOnly className='py-2 px-3 rounded-md'/>
                    </div>
                </div>
                <div className='flex gap-2 justify-center'>
                    <div className='flex flex-col gap-1 w-1/2'>
                        <label className='font-semibold'>Adress:</label>
                        <input type='text' defaultValue={client?.adresse} readOnly className='py-2 px-3 rounded-md'/>
                    </div>
                    <div className='flex flex-col gap-1 w-1/2'>
                        <label className='font-semibold'>Ville:</label>
                        <input type='text' defaultValue={client?.ville} readOnly className='py-2 px-3 rounded-md'/>
                    </div>
                </div>
                <Link to="/profile" className='text-sm text-slate-500 hover:underline transition ml-2'>edit information.</Link>
            </form>
            <h1 className='text-[33px] font-bold italic mt-3'>Payment Method:</h1>
            <select className='w-full px-3 py-2 my-5'>
                <option value="" selected hidden>Your Payment</option>
                <option value="" className='flex items-center'>MasterCard/Visa</option>
                <option value="">Cash on delivery</option>
            </select>
            <div className='ml-2'>
                <div className='flex items-center gap-3 text-gray-500'>
                    <input type='checkbox'/><p>I have read and accept the general conditions *</p>
                </div>
                <p className='text-sm mt-2 text-center'>Vos données personnelles seront utilisées pour le traitement de votre commande, vous accompagner au cours de votre visite du site web, et pour d’autres raisons décrites dans notre politique de confidentialité.</p>
            </div>
            
        </div>
        <div className='w-[320px] p-5 rounded bg-gray-200'>
        <h1 className='text-[35px] font-bold italic mt-5'>Articles:</h1>
        <ul className="min-h-[177px] max-h-[400px] overflow-auto text-left my-3">
              {shop?.map((cart)=>{
                return (
                  <li className="text-slate-600 mb-4 relative">
                    <button onClick={()=>{removeCart(cart.product_id)}} className="absolute right-0 top-0 text-md text-black  rounded-full w-4 h-4 flex items-center justify-center cursor-pointer">x</button>
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
              
            </ul>
            <hr className='bg-black h-1'></hr>
            <p className='text-[25px] font-semibold'>Price: <span className="inline-block text-red-600 text-md">{shop?.reduce((s, art) => {return s + parseFloat(art.ttc) * art.qte}, 0).toFixed(2)}$</span></p>
            <hr className='bg-black h-1 mb-3'></hr>
            <h1 className='font-bold text-[28px]'>Shipping :</h1>
            <div className='ml-3'>
                <p className='font-semibold'>Shipping fee: <span className=' font-normal text-gray-500'>40dh</span></p>
                <p className='font-semibold'>Shipping Time: <span className=' font-normal text-gray-500'>2-5 days</span></p>
            </div>
            <hr className='bg-black h-1 mt-4'></hr>
            <p className='text-[25px] font-semibold'>Total Price: <span className="inline-block text-red-600 text-md">{shop?.reduce((s, art) => {return s + parseFloat(art.ttc) * art.qte}, 40).toFixed(2)}$</span></p>
            <hr className='bg-black h-1'></hr>
            <button onClick={()=>{CheckOut()}} className='border-2 border-gray-400 px-3 py-2 rounded w-full mt-5 font-bold hover:bg-gray-400 transition duration-300 hover:ring-2 hover:ring-gray-100 hover:text-white'>BUY NOW</button>
        </div>
    </div>
  )
}

export default ShoppingCart