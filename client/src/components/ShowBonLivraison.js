import React,{useEffect, useState, useContext} from 'react'
import remove from "../assets/remove.png"
import { ShopContext } from './context/ShopContext'
import "../App.css"

import "../App.css"
const ShowBonLivraison = ({bl_id, setBl_id}) => {
    const {bonLivraison} = useContext(ShopContext)
    const [bon, setBon] = useState(null)
    useEffect(()=>{
        setBon(()=>{
            return bonLivraison.filter((b)=> b.id == bl_id)
        })
    },[])
  return (
    <div className="show w-[1000px] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 shadow-lg shadow-black p-10 bg-gray-100 z-20 rounded-lg ring-2 ring-gray-900 ">
        {bon && (
            <>
                <button onClick={()=>{setBl_id(null)}}>
            <img src={remove} width={40} className='absolute right-4 top-3 hover:opacity-80 transition cursor-pointer'/>
        </button>
        <h1 className='text-[35px] font-bold'>Detail Bon de Livraison:</h1>
        <article className='flex justify-between p-4 text-lg font-semibold text-gray-900'>
            <div>
                <p>Date Achat: <span className='text-gray-500 text-md'>{bon[0]?.date}</span></p>
                <p>Mode Reglement: <span className='text-gray-500 text-md'>{bon[0]?.mode || "visa"}</span></p>
                <p>Seller: <span className='text-md text-red-300'>{bon[0]?.caissier || "MyStore"}</span></p>
            </div>
            <div>
                <p>Client: <span className='text-gray-500 text-md capitalize'>{bon[0]?.user}</span></p>
                <p>Adresse: <span className='text-gray-500 text-md'>{bon[0]?.adresse}</span></p>
                <p>Ville: <span className='text-gray-500 text-md'>{bon[0]?.ville}</span></p>
            </div>
        </article>
        <h1 className='text-[35px] font-bold'>Les Achats:</h1>
        <table className='w-[870px] m-auto p-5'>
            <tr className='font-semibold'>
                <td>Designation</td>
                <td>Famille</td>
                <td>Quantite</td>
                <td>Prix</td>
            </tr>
            {bon?.map((bl)=>{
                return(
                    <tr className='even:bg-gray-300'>
                        <td className=' px-3 py-2'>{bl.designation}</td>
                        <td className=' px-3 py-2'>{bl.famille}</td>
                        <td className=' px-3 py-2'>x{bl.qte}</td>
                        <td className=' px-3 py-2'>{bl.ttc} <span className='font-semibold'>$</span></td> 
                    </tr>
                )
            })}
        </table>
            </>
        )}
    </div>
  )
}

export default ShowBonLivraison