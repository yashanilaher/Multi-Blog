import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'
import { BACKEND_URL } from '../utils';

const UpdateBlog = () => {
  const navigateTo=useNavigate();
  const {id}=useParams();

  const [title,setTitle]=useState("");
  const [category,setCategory]=useState("");
  const [about,setAbout]=useState("");

  const [blogImage,setBlogImage]=useState({});
  const [blogImagePreview,setBlogImagePreview]=useState("");

  const changePhotoHandler=(e)=>{
    console.log(e);
    const file=e.target.files[0];
    const reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onload=()=>{
      // console.log("files",reader.result,file);
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  useEffect(()=>{
    const fetchSelectedblogForUpdating=async()=>{
      try{
        const response=await axios.get(`${BACKEND_URL}/api/blogs/single-blog/${id}`,
          {
            withCredentials:true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        // console.log(response);
        setTitle(response?.data?.title);
        setCategory(response?.data?.category);
        setAbout(response?.data?.about);
        setBlogImagePreview(response?.data?.blogImage?.url);
      }
      catch(error){
        console.log(error);
        toast.error(error.response.data.error  || "Please fill the required fields")
      }
    }
    fetchSelectedblogForUpdating();
  },[id]);


  const handleUpdate=async (e)=>{
    e.preventDefault();
    // ✅ Validate before request
    if (about.trim().split(" ").length < 50) {
      toast.error("About section should be at least 50 words");
      return;
    }
    const formData=new FormData();
    formData.append("title",title);
    formData.append("category",category);
    formData.append("about",about);
    formData.append("blogImage",blogImage);
    // console.log("hello");

    try{
      const {data}=await axios.put(`${BACKEND_URL}/api/blogs/update/${id}`,
        formData,
        {
          withCredentials:true,
          headers:{
            "Content-Type":"multipart/form-data",
          },
        }
      );
      // console.log("after updating",data);
      toast.success("Blog Updated Successfully");
      navigateTo("/dashboard");
    }
    catch(error){
      console.log(error);
      toast.error("Please fill require fields");
    }
  }

  return (
    <div>
      <div className="container mx-auto my-12 p-4">
        <section className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-6">UPDATE BLOG</h3>
          <form>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Category</label>
              <select
                className="w-full p-2 border rounded-md"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Devotion">Devotion</option>
                <option value="Sports">Sports</option>
                <option value="Coding">Coding</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Business">Business</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="BLOG MAIN TITLE"
              className="w-full p-2 mb-4 border rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="mb-4">
              <label className="block mb-2 font-semibold">BLOG IMAGE</label>
              <img
                src={
                  blogImagePreview
                    ? blogImagePreview
                    : blogImage
                    ? blogImage
                    : "/imgPL.webp"
                }
                alt="Blog Main"
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <input
                type="file"
                onChange={changePhotoHandler}
                className="w-full p-2 border rounded-md
                            file:mr-4 file:py-2 file:px-4 file:rounded-md 
                              file:border-0 file:text-sm file:font-semibold 
                              file:bg-blue-600 file:text-white 
                              hover:file:bg-blue-700"
              />
            </div>
            <textarea
              rows="6"
              className="w-full p-2 mb-4 border rounded-md"
              placeholder="Something about your blog atleast 200 characters!"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />

            <button
              className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={handleUpdate}
            >
              UPDATE
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}

export default UpdateBlog
