import axios from "axios"
import React, { createContext, useContext, useEffect, useState } from 'react'
import Cookies from "js-cookie";
import { BACKEND_URL } from "../utils";

export const AuthContext=createContext()

export const AuthProvider=({children})=>{

    const [blogs,setBlogs]=useState();
    const [profile,setProfile]=useState();
    const [isAuthenticated,setIsAuthenticated]=useState(false);
    const [loading,setLoading]=useState(true);
    const [devotional,setDevotional]=useState({});
    const [coding,setCoding]=useState({});
    const [sports,setSports]=useState({});
    const [entertainment,setEntertainment]=useState({});
    const [business,setBusiness]=useState({});
    // const [coding,setCoding]=useState({});

    useEffect(()=>{
        const fetchProfile=async()=>{
            try{
                // let token=localStorage.getItem("jwt");
                let token=Cookies.get("jwt");
                // const parsedToken=token?JSON.parse(token):undefined; //not requried as our token is in string
                console.log("token",token);
                if (token){
                    const response = await axios.get(
                        `${BACKEND_URL}/api/users/my-profile`,
                        { 
                            withCredentials: true,
                            // headers:{"Content-Type":"application/json"} ,(done automatically from axios side)
                        }
                    );
                    // console.log("Response:from context", response.data);
                    // console.log("res")
                    setProfile(response.data);
                    setIsAuthenticated(true);
                }
                else{
                    setIsAuthenticated(false);
                    setProfile(null);
                }
            }catch(error){
                // console.log("error")
                console.log(error);
                setIsAuthenticated(false);
                setProfile(null);
            }finally{
                setLoading(false);//end of auth check
            }
        }

        const fetchBlogs=async()=>{
            try{
                const response = await axios.get(
                    `${BACKEND_URL}/api/blogs/all-blogs`,
                    { withCredentials: true }
                );
                // console.log("Response:", response);
                // console.log("res")
                const allBlogs=response.data;
                setBlogs(allBlogs);
                setDevotional(allBlogs.filter(blog=>blog?.category==="Devotion"))
                setSports(allBlogs.filter(blog=>blog?.category==="Sports"))
                setCoding(allBlogs.filter(blog=>blog?.category==="Coding"))
                setEntertainment(allBlogs.filter(blog=>blog?.category==="Entertainment"))
                setBusiness(allBlogs.filter(blog=>blog?.category==="Business"))
            }catch(error){
                // console.log("error")
                console.log(error);
            }
        }

        fetchProfile();
        fetchBlogs();
    },[])

    return(
        <AuthContext.Provider value={{ blogs,profile,isAuthenticated,setIsAuthenticated,setProfile,loading, devotional,coding,entertainment,sports,business }}>{children}</AuthContext.Provider>
    )
}

export const useAuth= () =>useContext(AuthContext);


