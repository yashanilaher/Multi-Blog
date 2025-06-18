import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Entertainment = () => {
  const {entertainment}=useAuth();
  
    // const devotionalBlogs=blogs?.filter((blog)=>blog?.category==="Devotion");
    return (
      <div>
        <div className="container mx-auto my-12 p-4 px-10 mt-[-8px]">
        <h1 className="text-2xl font-bold mb-6">Entertainment</h1>
        {entertainment && entertainment.length>0 ? (
          <div>
            <p className="text-center mb-8">
              Entertainment reflects the soul of culture, offering joy, escape, and connection through stories, music, and performance.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {[...entertainment].reverse().slice(0,6).map((blog, index) => (
                  <Link
                    to={`/blog/${blog._id}`}
                    key={blog._id}
                    className="relative rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      src={blog?.blogImage?.url}
                      alt={blog?.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black opacity-30"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h2 className="text-lg font-semibold">{blog?.title}</h2>
                      <p className="text-sm">{blog?.category}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>):(
          <div className="flex items-center justify-center  text-xl font-semibold text-gray-600">
            No blogs yet. Be the first to upload!
          </div>
        )}
        </div>
      </div>
    );
};

export default Entertainment;
