import React,{ useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import { AiOutlineMenu } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import toast from 'react-hot-toast';


const Sidebar = ({component , setComponent}) => {
  const {profile,isAuthenticated,setIsAuthenticated}=useAuth();
  // console.log("profile",profile);
  // console.log(isAuthenticated);
  const [show,setShow]=useState(false);
  const navigateTo=useNavigate(); //useNavigate is a hook see more about it

  const handleComponents=(value)=>{
    setComponent(value);
  } 

  const gotoHome=()=>{
    navigateTo("/")
  }

  const handleLogout=async(e)=>{
    e.preventDefault();
    try{
      const response=await axios.get("http://localhost:4000/api/users/logout",
        {
          withCredentials:true
        }
      )
      // console.log(response);
      setIsAuthenticated(false);
      toast.success(response.data.message)
      navigateTo("/");
    }catch(error){
      console.log(error);
      toast.error(error.response.data.message || "Failed to logout")
    }
  }

  return (
    <>
      <div className='sm:hidden fixed top-4 left-4 z-50' onClick={()=>setShow(!show)}>
        <AiOutlineMenu className='text-2xl'/>
      </div>
      <div className={`w-64 h-full shadow-lg fixed top-0 left-0 bg-gray-50 transition-transform duration-300  sm:translate-x-0 ${show ? "translate-x-0" : "-translate-x-full"}`}>
        <div className='sm:hidden absolute top-4 right-4 text-xl cursor-pointer' onClick={()=>setShow(!show)}>
          <FaArrowLeft className='text-2xl'/>
        </div>
        <div className='text-center'>
          <img className="w-24 h-24 rounded-full mx-auto mb-2" src={profile?.photo?.url} alt="" />
          <p className="text-large font-semibold">{profile?.name}</p>
        </div>
        <ul className="space-y-6 mx-4">
          <button onClick={()=>handleComponents("My Blogs")} className="w-full px-4 py-2 bg-green-500 rounded-lg hover:bg-green-700 transition duration-300 cursor-pointer">MY BLOGS</button>
          <button onClick={()=>handleComponents("Create Blog")} className="w-full px-4 py-2 bg-blue-400 rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer">CREATE BLOGS</button>
          <button onClick={()=>handleComponents("My Profile")} className="w-full px-4 py-2 bg-pink-500 rounded-lg hover:bg-pink-700 transition duration-300 cursor-pointer">MY PROFILE</button>
          <button onClick={gotoHome} className="w-full px-4 py-2 bg-red-500 rounded-lg hover:bg-red-700 transition duration-300 cursor-pointer">HOME</button>
          <button onClick={handleLogout} className="w-full px-4 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-700 transition duration-300 cursor-pointer">LOGOUT</button>
        </ul>
      </div>
    </>
  )
}

export default Sidebar
