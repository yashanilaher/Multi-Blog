//jo login and registration me token diya hai vo user ke request pe verify krkre 
//usse uske route pe bhjege

//authenticating and autherizing user
import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"

//to create blog he/she must be adming and logged in

//Authetication (looged in)
export const isAuthenticated = async(req,res,next) => {
    try{
        // console.log(req.cookies);
        const token=req.cookies.jwt;  //also used in logout and no cookies so undefined so will go in catch
        // console.log(req.cookies.jwt);
        console.log("token",token);
        if (!token){
            return res.status(401).json({error:"User not authenticateddddd"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        console.log(decoded); //we will get payload we gave whiel making cookie
        const user=await User.findById(decoded.userId);
        if (!user){
            return res.status(404).json({error:"User not found"});
        }
        req.user=user;
        // console.log("passed on");
        next(); //so create pe jayega or jo bhi next function hoga uspe jayega
    }
    catch(err){
        console.log("Error Occur in Authentication "+ err);
        return res.status(401).json({error:"User not authenticated"});
    }
}

//Authorization (to create blog must be admin)
// export const isAdmin=async (req,res,next)=>{
//     try{
//         const token=res.cookies.jwt;
//         if (!token){ //actually check when autheticated so no need as after that req will come here

//         }
//         const user=await User.findById(req.user._id);
//         const role=user.role;
//         if (role=="user"){
//             res.status(400).json({error:"Users not allowed to Create and Post Blog"});
//         }
//         next();

//     }
//     catch(err){
//         console.log("Error Occur in Autherization "+err);
//         return res.status(401).json({error:"User not authorized"});
//     }
// }

export const isAdmin= (...roles)=>{
    return (req,res,next)=>{
        if (!roles.includes(req.user.role)){
            return res.status(403).json({error:`User with given role ${req.user.role} not allowed`})
        }
        next();
    }
}
