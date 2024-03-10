import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import logout from "../../assets/logout.png";
import { Link } from "react-router-dom";

const Profile = () => {
  axios.defaults.withCredentials = true;
  const [client, setClient] = useState(null);
  const [img, setImg] = useState("");
  const [selected, setSelected] = useState(1);
  const uploadRef = useRef("");
  const HandleUpload = (e) => {
    const fileReader = new FileReader();
    const file = e.target.files[0];
    if (!file) return;
    fileReader.onload = () => {
      setImg(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };
  const HandleForm = (e) => {
    e.preventDefault();
    const data = {id: client.id};
    const formData = new FormData(e.target);
    for (const [name, value] of formData.entries()) {
      if(value == ""){
        alert(name+" empty")
      }
      data[name] = value;
    }
    data["image"] = img || client?.image
    axios.defaults.withCredentials = false;
        axios.put("http://localhost/product_project/server/index.php?q=update-client", data).then((res)=>{
        if(res.data.check){
            window.location.reload()
        }
    })
    if(client){
        setImg(client.image)
    }

  };

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
  const notActive =
    "text-[23px] text-center text-gray-600 font-semibold border border-white rounded-r-lg py-1 w-[80%] m-auto mb-2 hover:border-l-yellow-400 hover:border-l-8 transition-all cursor-pointer";
  const active =
    "text-[23px] text-center text-gray-600 font-semibold border border-white rounded-r-lg py-1 w-[80%] m-auto mb-2 hover:border-l-yellow-400 hover:border-l-8 transition-all cursor-pointer border-l-yellow-400 border-l-8";
  return (
    <div className="w-full h-[78vh] flex items-center justify-center">
      <div className="flex items-center justify-center w-[800px] h-[600px] px-2 py-2 ring ring-slate-200 rounded">
        {/* <img src={client.image} className='rounded-full w-[120px]'/> */}
        <section className="flex flex-col justify-between w-[300px] h-full bg-gray-400 border-r-[5px] border-r-gray-100">
          <div>
            <h1 className="text-white text-[25px] italic font-semibold text-left px-4 py-5">
              Account
            </h1>
            <ul>
              <li
                className={selected == 1 ? active : notActive}
                onClick={() => {
                  setSelected(1);
                }}
              >
                Infos
              </li>
              <li
                className={selected == 2 ? active : notActive}
                onClick={() => {
                  setSelected(2);
                }}
              >
                Edit
              </li>
              <li className="text-[23px] text-center text-gray-600 font-semibold border border-white rounded-r-lg py-1 w-[80%] m-auto mb-2 hover:border-l-yellow-400 hover:border-l-8 transition-all cursor-no-drop">
                Payment
              </li>
              {/* <li className='text-[23px] text-center text-gray-600 font-semibold border border-white rounded-r-lg py-1 w-[80%] m-auto mb-2 hover:border-l-yellow-400 hover:border-l-8 transition-all cursor-pointer'>Remove Account</li> */}
            </ul>
          </div>
          {/* <div className='flex items-center ml-[50%] mb-5 '>
                    <img src={logout} className='w-[30px]'/>
                    <p className='text-[23px] font-semibold text-slate-700'>logout</p>
                </div> */}
        </section>
        <section className="w-full h-full bg-slate-600 py-10 px-10">
          {selected == 1 && (
            <>
            <h1 className="text-white text-[30px] font-semibold italic mb-6">Account Information:</h1>
              <div className="flex gap-2 items-start">
                <div className="w-[120px] p-1 border-4 rounded-full border-white">
                  <img src={client?.image} className="w-[120px] rounded-full" />
                </div>
                <div className="mt-4">
                  <p className="text-white text-[20px] capitalize">
                    {client?.prenom}
                  </p>
                  <p className="text-white text-[20px] capitalize">
                    {client?.nom}
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <h2 className="font-semibold text-[20px] mb-1 text-gray-300">
                  Email
                </h2>
                <p className="text-[18px] text-slate-200 ml-2">
                  {client?.email}
                </p>
                <h2 className="font-semibold text-[20px] mb-1 text-gray-300">
                  City
                </h2>
                <p className="text-[18px] text-slate-200 ml-2">
                  {client?.ville || "no such data..."}
                </p>
                <h2 className="font-semibold text-[20px] mb-1 text-gray-300">
                  Adress
                </h2>
                <p className="text-[18px] text-slate-200 ml-2">
                  {client?.adresse || "no such data..."}
                </p>
              </div>
            </>
          )}

          {selected == 2 && (
            <div className="w-full">
              <h1 className="text-[30px] font-bold italic mb-2 text-white">Update:</h1>
              <form onSubmit={HandleForm} className="w-[70%] m-auto">
                <div className="flex items-center justify-between gap-2">
                  <div
                    onClick={() => {
                      uploadRef.current.click();
                    }}
                    className=" w-[140px] flex flex-col items-center justify-center border-2 border-white px-3 py-2 rounded-lg active:scale-95 cursor-pointer transition"
                  >
                    <img src={!img ? client.image : img} className="w-[80px] rounded-full" />
                    <input
                      ref={uploadRef}
                      type="file"
                      onChange={HandleUpload}
                      hidden
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="flex flex-col gap-1 items-start justify-center mb-1">
                      <label className="ml-1 font-semibold">First Name:</label>
                      <input
                        type="text"
                        placeholder="first name"
                        name="fname"
                        defaultValue={client.prenom}
                        required
                        className="border border-slate-400 w-full px-3 py-2 rounded-md"
                      />
                    </div>
                    <div className="flex flex-col gap-1 items-start justify-center mb-1">
                      <label className="ml-1 font-semibold">Last Name:</label>
                      <input
                        type="text"
                        placeholder="last name"
                        name="lname"
                        defaultValue={client.nom}
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
                    placeholder="nickola@email.com"
                    name="email"
                    defaultValue={client.email}
                    required
                    readOnly
                    className="border border-slate-400 w-full px-3 py-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-1 items-start justify-center mb-1">
                  <label className="ml-1 font-semibold">Adress:</label>
                  <input
                    type="text"
                    placeholder="adress"
                    name="adress"
                    defaultValue={client.adresse}
                    required
                    className="border border-slate-400 w-full px-3 py-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-1 items-start justify-center mb-1">
                  <label className="ml-1 font-semibold">
                    City:
                  </label>
                  <input
                    type="text"
                    placeholder="ville"
                    name="ville"
                    defaultValue={client.ville}
                    required
                    className="border border-slate-400 w-full px-3 py-2 rounded-md"
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="mt-3 bg-blue-300 font-semibold py-2 px-5 ring-2 ring-slate-400 rounded-md block mr-auto hover:bg-blue-300 transition-all duration-300 active:scale-95 hover:ring-4 hover:ring-blue-200 cursor-pointer"
                />
              </form>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Profile;
