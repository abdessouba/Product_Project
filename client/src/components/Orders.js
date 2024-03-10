import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from './context/ShopContext'
import ShowBonLivraison from './ShowBonLivraison'
const Orders = () => {
  const [bl_id, setBl_id] = useState(null)
  const {GetBl, bonLivraison} = useContext(ShopContext)
  useEffect(()=>{
    GetBl()
  },[])
  return (
    <div className='flex flex-col justify-center items-center w-full h-[78vh] relative'>
            {/* <h1 className='text-4xl font-bold mb-4 mr-[50%]'>Delivery Note:</h1> */}
        <div className='w-[60%] max-h-[500px] overflow-auto shadow-lg '>
            <table className='w-full'>
                <tr className='font-bold uppercase sticky top-0 bg-white'>
                    <td className='py-3 px-4'>image</td>
                    <td className='py-3 px-4'>Date</td>
                    <td className='py-3 px-4'>Payment</td>
                    <td className='py-3 px-4'>Actions</td>
                </tr>
                {bonLivraison?.map((bl)=>{
                    return (
                    <tr className='even:bg-gray-300 even:rounded-lg'>
                        <td className='py-3 px-4'><img src={bl.image} className='max-w-[60px] rounded-md'/></td>
                        <td className='py-3 px-4'>{bl.date}</td>
                        <td className='py-3 px-4'>Visa</td>
                        <td className='py-3 px-4'>
                            <button onClick={()=>{setBl_id(bl.id)}} className='py-2 px-3 border-2 border-gray-700 rounded-lg hover:text-gray-600 hover:border-gray-400 transition active:ring-1 active:ring-blue-500'>Details</button>
                        </td>
                    </tr>
                    )
                })}
            </table>
        </div>
            {bl_id && <ShowBonLivraison bl_id={bl_id} setBl_id={setBl_id}/>}
    </div>
  )
}

export default Orders