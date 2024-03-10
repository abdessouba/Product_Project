import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import SellProduct from './SellProduct'
import edit from "../../assets/edit.png"
import remove from "../../assets/rv.png"
import Message from './Message'
import { DashContext } from './dashContext/DashboardContext'

const ShowProducts = () => {
  const [addProducts, setAddProducts] = useState(false)
  const [message, setMessage] = useState("")
  const [upProduct, setUpProduct] = useState(null)
  const {clientProducts, getArticles} = useContext(DashContext)

  setTimeout(()=>{
    setMessage("")
  }, 4000)

  useEffect(()=>{
    getArticles()
  },[addProducts])

  const HandleUpdateClick = (id)=>{
    if(id){
      setUpProduct(...clientProducts.filter((pro)=> pro.product_id == id))
      setAddProducts(true)
    }
  }

  const DeleteProduct = (id)=>{
    axios.delete(`http://localhost/product_project/server/userarticles.php?q=remove_user_product&id=${id}`).then((res)=>{
      if(res.data.check){
        setMessage(res.data.message)
        getArticles()
      }
    })
  }

  return (
    <div className=''> 
      {message && <Message message={message}/>}
      <h1 className='text-4xl font-semibold mt-2 italic'>Manage Products:</h1>
        <button onClick={()=>{setAddProducts(true)}} className='ml-[85%] block border-2 border-slate-500 p-3 rounded mb-5 active:scale-95  transition'>
          Add New Article +
        </button>
      {addProducts && (
        <>
          <div className='absolute left-0 right-0 top-0 bottom-0 bg-black opacity-30 z-10'></div>
          <SellProduct setAddProducts={setAddProducts} setMessage={setMessage} upProduct={upProduct} setUpProduct={setUpProduct}/>
        </>
      )}
      <div className='max-h-[490px] overflow-auto w-[90%] m-auto shadow-md'>
        <table className='relative w-full '>
          <tr className='bg-slate-200 sticky top-0'>
            <th className='p-3'>Product</th>
            <th className='p-3'>Title</th>
            <th className='p-3'>Category</th>
            <th className='p-3'>Price (HT)</th>
            <th className='p-3'>TVA(%)</th>
            <th className='p-3'>Stock</th>
            <th className='p-3'>Status</th>
            <th className='p-3'>Actions</th>
          </tr>
          {clientProducts.map((art)=>{
            return (
              <tr>
                <td className=' '><img src={art.image} className='w-[70px] m-auto p-2'/></td>
                <td className='font-semibold max-w-[100px]'>{art.designation}</td>
                <td className='text-center capitalize'>{art.famille}</td>
                <td className='text-center '>${art.prix_ht}</td>
                <td className='text-center '>{art.tva}%</td>
                <td className='text-center '>{Math.trunc(art.stock)}</td>
                <td>
                  {art.stock > 0 && (
                    <p className='rounded text-green-600 w-fit p-1 m-auto'>
                      Available
                    </p>
                  )}
                  {art.stock == 0 && (
                    <p className='rounded text-red-600 w-fit p-1 m-auto'>
                      out of stock
                    </p>
                  )}
                </td>
                <td className='text-center flex gap-2 items-center justify-center mt-7'>
                  <button onClick={()=>DeleteProduct(art.product_id)}><img src={remove} className='w-[28px]'/></button>
                  <button onClick={()=>HandleUpdateClick(art.product_id)}><img src={edit} className='w-[22px]'/></button>
                </td>
              </tr>
            )
          })}
        </table>
      </div>
    </div>
  )
}

export default ShowProducts