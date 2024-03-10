import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import data from "../db.json"
import star from "../assets/star.png"
import location from "../assets/location.png"
import box from "../assets/box.png"
import plus from "../assets/plus.png"
import minus from "../assets/minus.png"
import heart from "../assets/heart.png"
import share from "../assets/share.png"
import ReviewsSection from './ReviewsSection'
import ProductSimular from './ProductSimular'
import Footer from './Footer'
import axios from 'axios'
import { ShopContext } from './context/ShopContext'

const ShowProduct = () => {
    const {id} = useParams()
    const [product, setProduct] = useState(null)
    const [qte, setQte] = useState(1)
    window.scroll({
        top:0
    })

    const {client, addToShopCart} = useContext(ShopContext)

    useEffect(()=>{
        axios.get(`http://localhost/product_project/server/index.php?q=get_products&id=${id}`).then((res)=>{
            setProduct(...res.data)
        })
      },[])
  return (
    <div>
        <div className='h-[81vh] flex items-center justify-center'>
        <section className='flex justify-center gap-10'>
            <div className='border-4 border-slate-700 py-7 px-10 rounded-md'>
                <img src={product?.image} className='w-[300px]'/>
            </div>
            <div>
                <h1 className='font-semibold text-[20px] mb-3 max-w-[400px] text-left'>{product?.designation}</h1>
                <p className='text-left text-[28px] font-semibold text-red-600'>${product?.prix_ttc}</p>
                <hr className='w-[80%] h-1 bg-slate-300 m-auto my-3'></hr>
                <p className='font-semibold text-left'>Description:</p>
                <p className='w-[355px] text-left mb-2 text-[17px] text-slate-600 ml-2 max-h-[100px] overflow-auto'>{product?.description}</p>
                <div className='flex justify-start items-center gap-2'>
                    <div className='flex items-center'>
                        <img src={star} className='w-[30px]'/>
                        <img src={star} className='w-[30px]'/>
                        <img src={star} className='w-[30px]'/>
                        <img src={star} className='w-[30px]'/>
                        <img src={star} className='w-[30px]'/>
                        <p className='ml-1 font-semibold'>5</p>
                    </div>
                    <div className='flex items-center font-semibold'>
                        <p className='cursor-pointer'>10 Reviews</p>
                        <p className='h-4 w-[1px] bg-black mx-2'></p>
                        <p>0+ sold</p>
                    </div>
                </div>
                <div>
                    <p className='text-left font-semibold mt-2 mb-1'>Color:</p>
                    <div className='flex items-center gap-2'>
                        <div className='w-10 h-10 bg-black rounded-md border-2 border-gray-200 cursor-pointer'></div>
                        <div className='w-10 h-10 bg-blue-200 rounded-md border-2 border-gray-200 cursor-pointer'></div>
                        <div className='w-10 h-10 bg-orange-500 rounded-md border-2 border-gray-200 cursor-pointer'></div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <p className='text-left font-semibold mt-2 mb-1'>Size:</p>
                        <select>
                            <option>2XL</option>
                            <option>XL</option>
                            <option selected>MD</option>
                            <option>SM</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='px-6 py-5 border border-gray-200 shadow w-[300px] h-[420px]'>
                <div className='flex items-center justify-between gap-2'>
                    <p className='font-semibold'>Ship To</p>
                    <div className='flex items-center '>
                        <img src={location}/> 
                        <p className='flex items-center justify-between text-gray-500 w-full cursor-pointer hover:text-gray-400 hover:underline transition-all'>{client?.adresse || <Link to="/profile">Add Your Adress</Link>}</p>
                    </div>
                </div>
                <hr className='w-full h-1 bg-slate-500 m-auto my-3'></hr>
                <div className='text-left'>
                    <h1 className='font-semibold text-[19px] italic py-1'>Delivery:</h1>
                    <p className='flex items-center'><img src={box} className='w-[20px] mr-1'/> Free Shipping -<span className='ml-1 text-gray-600'>By Dec 22</span></p>
                    <p className='text-gray-600 ml-3'>+Return Available</p>
                    <p className='text-gray-600 ml-3'>+30 day Buyer Protection</p>
                </div>
                <hr className='w-full h-1 bg-slate-500 m-auto my-3'></hr>
                <div>
                    <h1 className='text-left font-semibold text-[18px] mb-1'>Quantite:</h1>
                    <div className='flex items-center gap-2 ml-1'>
                        <button onClick={()=>{setQte((prev)=>prev>0 && prev-1 || 0)}}><img src={minus}/></button>
                        <input type='text' value={qte} onChange={(e)=>{setQte(+e.target.value)}} className='w-[30px] p-1 font-semibold text-[18px]'/>
                        <button onClick={()=>{setQte((prev)=> prev< product?.stock && prev+1 || prev)}}><img src={plus}/></button>
                    </div>
                    <p className='text-sm text-gray-500 text-left my-1'>Max <span>{Math.trunc(product?.stock)}</span> in Stock</p>
                </div>
                <div>
                    <Link to="/shoppingcart" onClick={()=>{addToShopCart({product_id:product.id,qte:qte,prix:product.prix_ttc})}} className='text-center inline-block border-2 border-red-600 px-3 py-2 w-full text-red-700 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition duration-300'>Buy Now</Link>
                    <div className='flex items-center justify-center gap-2 my-3'>
                        <button className='flex items-center justify-center gap-1 border-2 border-black font-semibold px-4 py-2 w-1/2 rounded-full ' ><img src={share}/>Share</button>
                        <button className='flex items-center justify-center gap-1 border-2 border-black font-semibold px-4 py-2 w-1/2 rounded-full ' ><img src={heart}/>12</button>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <ProductSimular/>
    <ReviewsSection/>
    <Footer/>
    </div>
  ) 
}

export default ShowProduct