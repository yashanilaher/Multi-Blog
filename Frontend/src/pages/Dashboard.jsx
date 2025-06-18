import React , { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import Sidebar from '../dashboard/Sidebar';
import MyProfile from '../dashboard/MyProfile';
import CreateBlog from "../dashboard/CreateBlog";
import UpdateBlog from "../dashboard/UpdateBlog";
import MyBlogs from "../dashboard/MyBlogs";
import { useNavigate,Navigate } from "react-router-dom"

const Dashboard = () => {
  const [component,setComponent]=useState("My Blogs");
  const {profile,isAuthenticated }=useAuth();

  //option-1
  // const navigate = useNavigate(); // ✅ hook called at top level
  // console.log(profile);
  // console.log(isAuthenticated);
  // useEffect(()=>{
  //   if (!isAuthenticated){
  //     navigate("/")
  //   }
  // },[isAuthenticated]);

  //option-2
  if (!isAuthenticated){
    <Navigate to={"/"}/>
  }

  return (
    <div>
      <Sidebar component={component} setComponent={setComponent}/>
      {component==="My Profile" ? 
      (<MyProfile/>) : 
      component==="Create Blog" ? 
      (<CreateBlog/>) : 
      component==="Update Blog" ?
      (<UpdateBlog/>) :
      (<MyBlogs/>)
      }
    </div>
  )
}

export default Dashboard
