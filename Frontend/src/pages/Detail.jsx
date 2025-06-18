import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { BACKEND_URL } from "../utils";

const Detail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const {isAuthenticated}=useAuth();
  // console.log(isAuthenticated);
  const navigateTo=useNavigate();
  useEffect(() => {
    if (!isAuthenticated){
        navigateTo("/")
    }
    const fetchSelectedblogForUpdating = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/blogs/single-blog/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // console.log("Blog Detail", response);
        setBlog(response.data);
      } catch (error) {
        console.log(error);
        toast.error(
          error.response.data.error || "Please fill the required fields"
        );
      }
    };
    fetchSelectedblogForUpdating();
  }, [id]);


  return (
    <div>
      <div>
        {blog && (
          <section className="container mx-auto p-4 px-15">
            <div className="text-blue-500 uppercase text-xs font-bold mb-4">
              {blog?.category}
            </div>
            <h1 className="text-4xl font-bold mb-6">{blog?.title}</h1>
            <div className="flex items-center mb-6">
              <img
                src={blog?.adminPhoto}
                alt="author_avatar"
                className="w-12 h-12 rounded-full mr-4"
              />
              <p className="text-lg font-semibold">{blog?.adminName}</p>
            </div>

            <div className="flex flex-col md:flex-row">
              {blog?.blogImage && (
                <img
                  src={blog?.blogImage?.url}
                  alt="mainblogsImg"
                  className="md:w-1/2 w-full h-[500px] mb-6 rounded-lg shadow-lg cursor-pointer border"
                />
              )}
              <div className="md:w-1/2 w-full md:pl-6">
                <p className="text-lg mb-6">{blog?.about}</p>
                {/* Add more content here if needed */}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Detail;
