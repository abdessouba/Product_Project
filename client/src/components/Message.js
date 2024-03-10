import React from 'react'
import check from "../assets/checkmark.png"
import { Link } from 'react-router-dom'
const Message = ({setMessage}) => {
  return (
    <div className='fixed top-[210px] left-1/2 -translate-x-1/2 w-[330px] min-h-[230px] z-30 p-6 flex flex-col items-start justify-start bg-white ring ring-gray-300 rounded-md shadow-black shadow-lg'>
      <div className='flex items-center'>
        <img src={check}/><p className='font-semibold text-xl'>Congrats</p>
      </div>
      <p className='m-auto text-lg'>Thanks For Shopping With us</p>
      <div className='ml-auto'>
        <Link onClick={()=>{setMessage("")}} to="/orders" className='text-center inline-block border-2 border-green-500 font-semibold text-lg w-[100px] py-2 x-2 rounded mr-2 hover:bg-green-500 hover:ring hover:ring-slate-300 hover:text-white active:scale-95 transition-all duration-200'>Order</Link>
        <button onClick={()=>{window.location.href = "http://localhost:3000/shop"}} className='border-2 border-red-500 font-semibold text-lg w-[100px] py-2 x-2 rounded hover:bg-red-500 hover:ring hover:ring-slate-300 hover:text-white active:scale-95 transition-all duration-200'>Back</button>
      </div>
    </div>
  )
}

export default Message