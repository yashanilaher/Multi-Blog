import { User } from "../models/user.model.js";
import { v2 as cloudinary } from 'cloudinary';
import bcrypt from "bcryptjs"
import createTokenSaveCookies from "../jwt/AuthToken.js";

export const register=async (req,res)=>{

    try{
        if (!req.files || Object.keys(req.files).length==0){  //means user not giving any file
            return res.status(400).json({message:"User Photo is required"});
        }
        const {photo}=req.files;

        const allowedFormat=["image/jpeg","image/png","image/webp"];
        if (!allowedFormat.includes(photo.mimetype)){
            return res.status(400).json({message:"Invalid Photo Format"});
        }

        const {email,name,password,phone,education,role}=req.body;

        if (!email || email.trim()===""
            || !name || name.trim()===""
            || !password || password.trim()===""
            || !phone 
            || !education || education.trim()===""
            || !role || role.trim()===""
        ){
            return res.status(400).json({message:"Please fill required fields"})
        }
        const user=await User.findOne({
            $or:[{email:email},{phone:phone}]  //if same phone or email
        });

        if (user){
            return res.status(400).json({message:"User already exists"});
        }

        // console.log(photo)
        
        //so first upload image sended by user on cloudinary and then take key and url and save it in particular users database
        const cloudinaryResponse=await cloudinary.uploader.upload(
            photo.tempFilePath
        )

        // console.log(cloudinaryResponse);

        if (!cloudinaryResponse || cloudinaryResponse.error){
            console.log(cloudinaryResponse.error);
        }
        
        //hashing password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newuser=await User.create({
            email,
            name,
            password:hashedPassword,
            phone,
            education,
            role,
            photo:{
            public_id:cloudinaryResponse.public_id,
            url:cloudinaryResponse.url
            }
        });

        if (newuser){

            const token=await createTokenSaveCookies(newuser._id,res);
            // console.log(token);
            res
            .status(201)
            .json({message:"User Saved Succefully",newuser,token:token});
        }

    }catch(err){
        console.log(err);
        return res.status(500).json({error:"Internal Server Error"});
    }

}

export const login=async (req,res)=>{

    const {email,password,role}=req.body;
    try{
        if (!email || !password || !role){
            return res.status(400).json({message:"Please fill required fields"});
        }

        const user=await User.findOne({email:email}).select("+password");
        if (!user){
            return res.status(400).json({message:"Invalid email or password"});
        }

        const passmatch=await bcrypt.compare(password,user.password);
        if (!passmatch){
            return res.status(400).json({message:"Invalid email or password"});
        }

        if (role!=user.role){
            return res.status(400).json({message:`Given role ${role} not found`})
        }

        const token=await createTokenSaveCookies(user._id,res);
        res.status(200).json({message:"User Loged In successfully",user:{
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
            },
            token:token
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({error:"Internal Server error"});
    }
}

export const logout =(req,res)=>{
    try{
        //condition if user is logged in is remaining -- so middleware dal diya
        res.clearCookie("jwt",{httpOnly:true});
        return res.status(200).json({message:"User logged out successfully"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:"Internal Server Error"});
    }
}

export const getMyprofile=async (req,res)=>{
    const user=req.user;
    res.status(200).json(user);
}

export const getAdmin=async(req,res)=>{
    const admins=await User.find({role:"admin"});
    res.status(200).json(admins);
}