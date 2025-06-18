import React from 'react'
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import Footer from './components/Footer.jsx'
import { Toaster } from 'react-hot-toast';

import { Navigate, Route,Routes, useLocation } from "react-router-dom"

import Blogs from "./pages/Blogs.jsx"
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Creators from './pages/Creators.jsx'
import UpdateBlog from './dashboard/UpdateBlog.jsx';
import Detail from './pages/Detail.jsx';
import { useAuth } from './context/AuthProvider.jsx'
import NotFound from './pages/NotFound.jsx';

const App = () => {
  const location =useLocation()
  // console.log(location.pathname) //jis route pe hai , vo uska location print krega
  const hideNavbarFooter=["/dashboard","/login","/register"].includes(location.pathname)

  const {blogs,isAuthenticated,loading}=useAuth()
  console.log("App",isAuthenticated,loading);

  if (loading) {
    return <div className="text-center mt-10 font-semibold text-lg">Loading...</div>;
  }


  return (
    <div>
      {!hideNavbarFooter && <Navbar/>}
      <Routes>
        {/* protected route like this */}
        <Route exact 
          path="/" 
          element={isAuthenticated===true ? <Home/> : <Navigate to={"/login"}/>} />  
        <Route exact path="/blogs" element={<Blogs/>} />
        <Route exact path="/about" element={<About/>} />
        <Route exact path="/contact" element={<Contact/>} />
        <Route exact path="/creators" element={<Creators/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/dashboard" element={<Dashboard/>} />

        {/* Single page route */}
        <Route exact path="/blog/:id" element={<Detail/>} />

        {/* update Page Route */}
        <Route exact path="/blog/update/:id" element={<UpdateBlog/>} />

        {/* universal Route */}
        <Route  path="*" element={<NotFound/>}/>
      </Routes>
      <Toaster/>
      {!hideNavbarFooter && <Footer/>}
    </div>
  )
}

export default App


