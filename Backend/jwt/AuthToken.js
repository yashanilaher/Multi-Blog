import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

const createTokenSaveCookies=async(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET_KEY,{
        expiresIn:"7d"
    });

    //so here tooken is a long string 

    res.cookie("jwt",token,{
        httpOnly:true, //xss
        secure:true,
        samesite:"none" //csrf
    })

    await User.findByIdAndUpdate(userId,{token:token})
    return token;
}

export default createTokenSaveCookies;
