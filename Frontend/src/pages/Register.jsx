import React,{ useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthProvider';

const Register = () => {
  const {isAuthenticated,setIsAuthenticated,setProfile}=useAuth();
  const navigateTo=useNavigate();
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [phone,setPhone]=useState("");
  const [password,setPassword]=useState("");
  const [role,setRole]=useState("");
  const [education,setEducation]=useState("");
  const [photo,setPhoto]=useState("");
  const [photoPreview,setPhotoPreview]=useState({}); //file object

  const changePhotoHandler=(e)=>{
    // console.log(e);
    const file=e.target.files[0];
    const reader=new FileReader(); 
    reader.readAsDataURL(file); //ye asynchronous hai //reads the file and convert it into a DataURL (this url can be directly used as a src link)
    // console.log(reader);
    // used a callback approach (onload), not async/await. as fileReader does not use Promises
    reader.onload=()=>{ //When the file is successfully read, the onload function runs.
      // console.log(reader.result);  //asynchronous hai , that why onload ke baad ayega
      setPhotoPreview(reader.result);    //reader.result now contains the Data URL.
      setPhoto(file)
    }
  };  

  const handleRegister=async(e)=>{
    e.preventDefault()
    // console.log(photo);
    const formData=new FormData();
    // email,name,password,phone,education,role
    formData.append("name",name);
    formData.append("email",email);
    formData.append("password",password);
    formData.append("phone",phone);
    formData.append("education",education);
    formData.append("role",role);
    formData.append("photo",photo);
    try{
      const {data}=await axios.post(
        "http://localhost:4000/api/users/register",
        formData,  
        {
          headers:{
            "Content-Type":"multipart/form-data",   //if files also sended , for normal test (ie in backedn we used application/json ) so this axios hadles automatically unline fetch
          },
          withCredentials:true
        }
      );
      //formdata is not a plain js object: to print it
      // console.log(formData);
      // console.log(formData.entries());
      // for(let [k,v] of formData.entries()){
      //   console.log(k,v);
      // }
      // localStorage.setItem("jwt", data.token);
      console.log(data);
      toast.success(data.message || "User Registered Successfully");
      setProfile(data);
      setIsAuthenticated(true);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setEducation("");
      setRole("");
      setPhoto({});
      setPhotoPreview({});
      navigateTo("/");
    }
    catch(error){
      console.log(error);
      toast.error(error.response.data.message || "Please fill required fields");
    }
  }

  return (
    <div>
      <div className='min-h-screen flex items-center justify-center bg-gray-100 text-[11.5px]'>
        <div className='w-full max-w-md bg-white shadow-md rounded-lg p-4 px-8'>
          <form onSubmit={handleRegister}>
            <div className="font-semibold text-xl items-center text-center">
                Multi<span className="text-blue-500">Blog</span>
            </div>
            <h1 className='text-xl font-semibold mb-6'>Register</h1>
            <select value={role} onChange={(e)=>setRole(e.target.value)} className='w-full p-2 mb-4 border rounded-md'>
              <option value="" >Select Role</option>
              <option value="user" >User</option>
              <option value="admin" >Admin</option>
            </select>
            <div className='mb-4'>
              <input 
                type="text" 
                placeholder='Your Name' 
                value={name} 
                onChange={(e)=>setName(e.target.value)}
                className='w-full p-2 border rounded-md'/>
            </div>
            <div className='mb-4'>
              <input 
                type="email" 
                placeholder='Your Email Address' 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)}
                className='w-full p-2 border rounded-md'/>
            </div>
            <div className='mb-4'>
              <input 
                type="number" 
                placeholder='Your Phone Number' 
                value={phone} 
                onChange={(e)=>setPhone(e.target.value)}
                className='w-full p-2 border rounded-md'/>
            </div>
            <div className='mb-4'>
              <input 
                type="password" 
                placeholder='Your Password' 
                value={password} 
                onChange={(e)=>setPassword(e.target.value)}
                className='w-full p-2 border rounded-md'/>
            </div>
            <select value={education} onChange={(e)=>setEducation(e.target.value)} className='w-full p-2 mb-4 border rounded-md'>
              <option value="">Select Your Education</option>
              <option value="Student">Student</option>
              <option value="Working Profession">Working Profession</option>
            </select>
            <div className='flex items-center mb-4'>
              <div className='photo w-20 h-20 mr-4'>
                <img src={photoPreview ? `${photoPreview}` : "photo"} alt="photo" />
              </div>
              <input type="file" onChange={changePhotoHandler}
                className='w-full p-2 border rounded-md text-gray-800  file:bg-blue-500 file:text-white file:border-none file:px-4 file:py-2 file:rounded-md'
                />
            </div>
            <p className='text-center mb-4'>
              Already Registered? 
              <Link to={"/login"} className='text-blue-600'> Login Now</Link>
            </p>
            <button 
              type="submit"
             className='w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white'>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register


{/* <div>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit deleniti aperiam accusantium distinctio, eaque voluptatem explicabo tempora rem praesentium exercitationem enim aliquam inventore provident modi a amet corporis soluta suscipit quos saepe optio corrupti consequatur. Accusantium nostrum totam consequuntur repudiandae ad recusandae velit consectetur suscipit minus. Nihil voluptas similique nisi.
</div> */}