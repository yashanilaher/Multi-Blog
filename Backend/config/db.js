import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDb")
    }catch(error){
        console.error(`Error Connecting to MongoDB ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;
