import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import userRoute from "./routes/user.route.js"
import blogRoute from "./routes/blog.route.js"
import fileUpload from "express-fileupload"
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from "cookie-parser"

import cors from "cors"



dotenv.config()

const app=express()
const port=process.env.PORT;


//middleware for inputting json data
app.use(express.json());
// app.use(express.urlencoded({ extended: true })); // For parsing form-data (not file uploads, but text fields in form-data)
app.use(cookieParser());

//allow requests from frontend 
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true, // only if needed for cookies/auth
    methods:["GET","POST","PUT","DELETE"]
}))


//file upload middleware
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}))

// DB Code
connectDB();

//cloudinary_setup Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLUD_SECRET_KEY 
});

//defining routes
app.use("/api/users",userRoute);
app.use("/api/blogs",blogRoute);



app.listen(port,()=>{
    console.log(`Server is Running on port ${port}`)
})

