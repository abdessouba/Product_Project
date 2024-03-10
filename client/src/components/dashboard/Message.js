import React from 'react'
import style from "./style.css"

const Message = ({message}) => {
    
  return (
    <div className='toggle absolute right-2 top-[140px] min-w-[200px] m-auto'>
        <div className='flex gap-3 items-center justify-between bg-green-500 text-green-200 px-4 py-1 rounded-t font-semibold'>
        <p>{message}</p>
        <button className='font-semibold text-lg'>x</button>
        </div>
        <hr className='hr bg-green-200 h-[5px]'/>
  </div>
  )
}

export default Message