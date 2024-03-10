import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Login = () => {
    const [message, setMessage] = useState("")
    axios.defaults.withCredentials = true // to force session in cookies
    useEffect(()=>{
        axios.get("http://localhost/product_project/server/login.php?q=client").then((res)=>{ 
            if(res.data["check"]){ window.location.href = "http://localhost:3000"; } 
        })
    },[])
    const HandleForm = (e)=>{
        e.preventDefault()
        const form = e.target
        const data = {
            email: form["email"].value,
            password: form["password"].value
        }
        axios.post("http://localhost/product_project/server/login.php?q=login", data).then((res)=>{
            if(res.data.check){
                window.location.href = "http://localhost:3000"
            }else{
                setMessage(res.data.message)
            }
        })
    }
    
  return (
    <div className='relative w-[400px] min-h-[350px]  m-auto rounded-xl mt-20 ring ring-slate-500 shadow shadow-black px-5 py-4'>
        <h1 className='text-[30px] font-bold italic mb-2'>Login:</h1>
        {message && <p className=' px-1 text-red-500 rounded'>{message}</p>}
        <form onSubmit={HandleForm}>
            <div className='flex flex-col gap-1 items-start justify-center mb-1'>
                <label className='ml-1 font-semibold'>Email:</label>
                <input type='email' placeholder='nickola@email.com' name='email' required className='border border-slate-400 w-full px-3 py-2 rounded-md' onChange={()=>{setMessage("")}}/>
            </div>
            <div className='flex flex-col gap-1 items-start justify-center mb-1'>
                <label className='ml-1 font-semibold'>Password:</label>
                <input type='password' placeholder='******' name='password' required className='border border-slate-400 w-full px-3 py-2 rounded-md' onChange={()=>{setMessage("")}}/>
            </div>
            
            <div className='flex justify-between my-2'>
            <Link to="" className=' self-center text-gray-400 hover:text-gray-500 hover:underline transition cursor-pointer'>forget password</Link>
            <Link to="/auth/register" className=' self-center text-gray-400 hover:text-gray-500 hover:underline transition cursor-pointer'>I don't have account</Link>
        </div>
        <input type='submit' value="Login" className='bg-blue-300 font-semibold py-2 px-5 ring-2 ring-slate-400 rounded-md block mr-auto hover:bg-blue-300 transition-all duration-300 active:scale-95 hover:ring-4 hover:ring-blue-200 cursor-pointer'/>
        </form>
    </div>
  )
}

export default Login