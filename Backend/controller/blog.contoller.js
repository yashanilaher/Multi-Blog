import mongoose from "mongoose";
import { Blog } from "../models/blog.model.js"
import { v2 as cloudinary } from "cloudinary";

export const createBlog=async (req,res)=>{
    try{
        // console.log(req.body);
        // console.log(req.files);

        if (!req.files || Object.keys(req.files).length==0){
            return res.status(400).json({message:"Blog Image is required"});
        }
        // console.log("got image")
        
        const { blogImage } = req.files;
        const allowedFormat=["image/jpeg","image/png","image/webp"];
        if (!allowedFormat.includes(blogImage.mimetype)){
            return res.status(400).json({message:"Invalid photo format. Only jpg and png are allowed"});
        };

        const {title,category,about}=req.body;
        // if (!title || title.trim()==="" || !category || category.trim()==="" || !about || about.trim()==="" ){
            // return res.status(400).json({message:"title, category and about are required fields"});
            // };
        if (!title || !category || !about){
            return res.status(400).json({message:"title, category and about are required fields"});

        }

        const adminName = req?.user?.name;
        const adminPhoto= req?.user?.photo?.url;  //this is passing as string in collection created for this blog so directly pass url
        const createdBy= req?.user?._id;

        //uploading on cloudinary and then saving in database
        const cloudinaryResponse = await cloudinary.uploader.upload(
            blogImage.tempFilePath
        );

        if (!cloudinaryResponse || cloudinaryResponse.error){
            console.log(cloudinaryResponse.error);
        }

        const blogData=await Blog.create({
            title,
            about,
            category,
            adminName,
            adminPhoto,
            blogImage:{
                public_id:cloudinaryResponse.public_id,
                url:cloudinaryResponse.url
            },
            createdBy
        });

        res.status(201).json({
            message:"BLog created Successfully",
            blogData,
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Internal Server Error"});
    }
}

export const deleteBlog=async(req,res)=>{
    const {id}=req.params;   //same id ka spelling jo route me ie (/id) hai
    const blog=await Blog.findById({_id:id});
    if (!blog){
        return res.status(404).json({message:"blog not found"});
    }
    await blog.deleteOne();
    return res.status(200).json({message:"blog deleted successfully"})
}

export const getAllBlogs=async(req,res)=>{
    const allBlogs=await Blog.find();
    return res.status(200).json(allBlogs);
}

export const getSingleBlog=async (req,res)=>{
    const { id }=req.params;
    if (!mongoose.Types.ObjectId.isValid(id)){  //id ka format check krta hai
        return res.status(400).json({message:"Invalid Blog id"});
    }
    const blog=await Blog.findById({_id:id});
    if (!blog){
        return res.status(404).json({message:"Blog not found"});
    }
    return res.status(200).json(blog);
}

export const getMyBlogs=async (req,res)=>{
    const createdBy=req.user._id;
    const myBlogs=await Blog.find({createdBy});
    res.status(200).json(myBlogs)

}
//updating just textual data, if want images do take image from req.fles thru clodinary take url and comobine in object and give it to updation

export const updateBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Blog id" });
  }

  const { title, category, about } = req.body;

  let blogImageData = null;

  if (req.files && req.files.blogImage) {
    const blogImage = req.files.blogImage;
    const allowedFormat = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedFormat.includes(blogImage.mimetype)) {
      return res.status(400).json({ message: "Invalid photo format. Only jpg and png are allowed" });
    }

    try {
      const cloudinaryResponse = await cloudinary.uploader.upload(blogImage.tempFilePath);
      blogImageData = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      };
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      return res.status(500).json({ message: "Image upload failed" });
    }
  }

  const updateData = {
    title,
    category,
    about,
    ...(blogImageData && { blogImage: blogImageData }),
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed" });
  }
};


