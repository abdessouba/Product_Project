import axios, { AxiosError } from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import log_img from "../../assets/login_img.png";
const Register = () => {
  axios.defaults.withCredentials = false
  const [img, setImg] = useState(log_img);
  const HandleUpload = (e) => {
    const fileReader = new FileReader();
    const file = e.target.files[0]
    if(!file)return;
    fileReader.onload = () => {
      setImg(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };
  const [message, setMessage] = useState(null);
  const uploadRef = useRef("")

  const HandleForm = (e) => {
    e.preventDefault();
    const data = {};
    const formData = new FormData(e.target);
    for (const [name, value] of formData.entries()) {
      if (name == "pass2" && formData.get("pass1") != value) {
        alert("pass dont match");
        return;
      }
      data[name] = value;
    }
    if(img != log_img){
      data["image"] = img
    }else{
      alert("image required")
      return
    }
    axios.post("http://localhost/product_project/server/register.php", data).then((res)=>{
    if(res.data["email"]){
            setMessage(res.data)
            console.log(res.data)
        }
        if(res.data["account"]){
            setMessage(res.data)
            e.target.reset()
        }
    })
  };
  return (
    <div className="w-[400px] m-auto rounded-xl mt-20 ring ring-slate-300 shadow shadow-black px-5 py-4">
      <h1 className="text-[30px] font-bold italic mb-2">Register:</h1>
      {!message?.account && (
        <form onSubmit={HandleForm}>
          <div className="flex items-center justify-center gap-4">
            <div onClick={()=>{uploadRef.current.click()}} className="flex flex-col items-center justify-center border-2 border-black w-fit px-3 py-2 rounded-lg active:scale-95 cursor-pointer transition">
              <img src={img} className="w-[80px] rounded-full" />
              <p className={img != log_img ?"hidden" : ""}>add image</p>
              <input type="file" ref={uploadRef} hidden onChange={HandleUpload}/>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col gap-1 items-start justify-center mb-1">
                <label className="ml-1 font-semibold">First Name:</label>
                <input
                  type="text"
                  placeholder="name"
                  name="fname"
                  required
                  className="border border-slate-400 w-full px-3 py-2 rounded-md"
                />
              </div>
              <div className="flex flex-col gap-1 items-start justify-center mb-1">
                <label className="ml-1 font-semibold">Last Name:</label>
                <input
                  type="text"
                  placeholder="name"
                  name="lname"
                  required
                  className="border border-slate-400 w-full px-3 py-2 rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 items-start justify-center mb-1">
            <label className="ml-1 font-semibold">Email:</label>
            <input
              type="email"
              onChange={() => {
                setMessage("");
              }}
              placeholder="nickola@email.com"
              name="email"
              required
              className="border border-slate-400 w-full px-3 py-2 rounded-md"
            />
            {message?.email && (
              <p className="text-sm text-red-500">{message.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1 items-start justify-center mb-1">
            <label className="ml-1 font-semibold">Password:</label>
            <input
              type="password"
              placeholder="******"
              name="pass1"
              required
              className="border border-slate-400 w-full px-3 py-2 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1 items-start justify-center mb-1">
            <label className="ml-1 font-semibold">Confirm Password:</label>
            <input
              type="password"
              placeholder="******"
              name="pass2"
              required
              className="border border-slate-400 w-full px-3 py-2 rounded-md"
            />
          </div>
          <div className="flex justify-end mt-2">
            <Link
              to="/auth/login"
              className=" self-center text-gray-400 hover:text-gray-500 hover:underline transition cursor-pointer"
            >
              already have account
            </Link>
          </div>
          <input
            type="submit"
            value="Register"
            className="bg-blue-300 font-semibold py-2 px-5 ring-2 ring-slate-400 rounded-md block mr-auto hover:bg-blue-300 transition-all duration-300 active:scale-95 hover:ring-4 hover:ring-blue-200 cursor-pointer"
          />
        </form>
      )}
      {message?.account && (
        <p className="mt-2 bg-green-200 w-fit m-auto px-2 py-1 rounded">
          {message["message"]}{" "}
          <Link
            to="/auth/login"
            className="text-slate-400 hover:underline hover:text-gray-500 transition font-semibold"
          >
            login now.
          </Link>
        </p>
      )}
    </div>
  );
};

export default Register;
