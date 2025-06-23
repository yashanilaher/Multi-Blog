import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

const createTokenSaveCookies=async(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET_KEY);

    //so here tooken is a long string 

    res.cookie("jwt",token,{
        httpOnly:true, //xss
        secure:true,
        sameSite:"none", //csrf
        maxAge:60 * 60 * 1000 // 7 days in milliseconds
    })

    await User.findByIdAndUpdate(userId,{token:token})
    return token;
}

export default createTokenSaveCookies;
