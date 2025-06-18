import React,{ useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthProvider';
import { BACKEND_URL } from '../utils';

const Login = () => {
  const {isAuthenticated,setIsAuthenticated,setProfile}=useAuth();
  const navigateTo=useNavigate();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [role,setRole]=useState("");


  const handleRegister=async(e)=>{
    e.preventDefault()

    //as will automatically go in catch
    // if (!email || !password || !role){
    //   toast.error("please fill required fields")
    //   return;
    // }

    try{
      const {data}=await axios.post(
        `${BACKEND_URL}/api/users/login`,
        {email:email,password:password,role:role},  
        {
          headers:{
            "Content-Type":"multipart/form-data",   //if files also sended , for normal test (ie in backedn we used application/json ) so this axios hadles automatically unline fetch
          },
          withCredentials:true,
        }
      );

      // console.log("from logged in",data);
      // localStorage.setItem("jwt",data.token);
      toast.success(data.message || "User Login Successfully");
      setProfile(data.user); //as inside this role is there , so profile will be set as logged in so no delay for context api and conditional rendering of buttons 
      setIsAuthenticated(true);
      setEmail("");
      setPassword("");
      setRole("");
      navigateTo("/");

    }
    catch(error){
      console.log(error);
      toast.error(error.response.data.message || "Please fill required fields");
    }
  }

  return (
    <div>
      <div className='min-h-screen flex items-center justify-center bg-gray-100 text-[11.5px]'>
        <div className='w-full max-w-md bg-white shadow-md rounded-lg p-4 px-8'>
          <form onSubmit={handleRegister}>
            <div className="font-semibold text-xl items-center text-center">
                Multi<span className="text-blue-500">Blog</span>
            </div>
            <h1 className='text-xl font-semibold mb-6'>Login</h1>
            <select value={role} onChange={(e)=>setRole(e.target.value)} className='w-full p-2 mb-4 border rounded-md'>
              <option value="" >Select Role</option>
              <option value="user" >User</option>
              <option value="admin" >Admin</option>
            </select>
            <div className='mb-4'>
              <input 
                type="email" 
                placeholder='Your Email Address' 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)}
                className='w-full p-2 border rounded-md'/>
            </div>
            <div className='mb-4'>
              <input 
                type="password" 
                placeholder='Your Password' 
                value={password} 
                onChange={(e)=>setPassword(e.target.value)}
                className='w-full p-2 border rounded-md'/>
            </div>
            <p className='text-center mb-4'>
              New User? 
              <Link to={"/register"} className='text-blue-600'> Register Now</Link>
            </p>
            <button 
              type="submit"
             className='w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white'>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login

