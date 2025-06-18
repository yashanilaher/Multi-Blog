import React,{ useEffect, useState } from "react"
// import { useAuth } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar=()=>{
    const [Role,setRole]=useState("");
    const {profile,isAuthenticated,setIsAuthenticated}=useAuth();
    // console.log("nav")
    // console.log(profile)  //but as we have set loading state , we will get profile after auth only , like from login we will get but will be rerendered from auth and after that we will be routing see app.jsx
    // console.log(isAuthenticated)
    const navigateTo=useNavigate();
    
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

    const [show,setShow]=useState(false);

    return(
        <div>
        <nav className="shadow-lg py-2 px-2">
            <div className="container mx-auto flex items-center justify-between px-10">
                <div className="font-semibold">
                    Multi<span className="text-blue-500">Blog</span>
                </div>
                {/* Desxtop */}
                <div className="mx-3">
                    <ul className="space-x-6 hidden md:flex">
                        <Link to="/" className="hover:text-blue-500">HOME</Link>
                        <Link to="/blogs" className="hover:text-blue-500">BLOGS</Link>
                        <Link to="/creators" className="hover:text-blue-500">CREATORS</Link>
                        <Link to="/about" className="hover:text-blue-500">ABOUT</Link>
                        <Link to="/contact" className="hover:text-blue-500">CONTACT</Link>
                    </ul>
                    <div className="md:hidden" onClick={()=>setShow(!show)}>
                        {show ? <IoCloseSharp size={24}/> : <AiOutlineMenu size={24}/>}
                    </div>
                </div>
                <div className="space-x-2 flex flex-wrap gap-2 sm:flex-nowrap sm:gap-1 ">

                    {isAuthenticated && profile?.role==="admin" ? (
                        <Link to="/dashboard" className="bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 px-4 py-1 rounded">DASHBOARD</Link>
                    ):(
                        ""
                    )}

                    {!isAuthenticated ? (
                        <Link to="/login" className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-1 rounded">LOGIN</Link>
                    ) : (
                       <div>
                        {/* logout ka koi route nhi hai api hai isliye using function */}
                            <button onClick={handleLogout} className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-1 rounded">  
                                LOGOUT
                            </button>
                       </div>
                    )}
                </div>  
            </div>
            {/* mobile navbar */}
            {show && (
                <div>
                    <ul className="flex flex-col h-[94vh] items-center justify-center space-y-3 md:hidden text-xl">
                        <Link to="/" onClick={()=>setShow(!show)} smooth="true" duration={5000} offset={-70} activeClass="active" className="hover:text-blue-500">HOME</Link>
                        <Link to="/blogs" onClick={()=>setShow(!show)} smooth="true" duration={5000} offset={-70} activeClass="active" className="hover:text-blue-500">BLOGS</Link>
                        <Link to="/creators" onClick={()=>setShow(!show)} smooth="true" duration={5000} offset={-70} activeClass="active" className="hover:text-blue-500">CREATORS</Link>
                        <Link to="/about" onClick={()=>setShow(!show)} smooth="true" duration={5000} offset={-70} activeClass="active" className="hover:text-blue-500">ABOUT</Link>
                        <Link to="/contact" onClick={()=>setShow(!show)} smooth="true" duration={5000} offset={-70} activeClass="active" className="hover:text-blue-500">CONTACT</Link>
                    </ul>
                </div>
            )}

        </nav>
        </div>
    )
}

export default Navbar;