import React from "react";
import { FaGithub } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="border py-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-10">
          <div className=" text-center md:text-start">
            <h2 className="text-lg font-semibold mb-4">Tech Stack</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  MongoDB
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  ExpressJs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  React
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Nodejs
                </a>
              </li>
            </ul>
          </div>
          <div className=" text-center md:text-start">
            <h2 className="text-lg font-semibold mb-4">Design to code</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Figma plugin
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Templates
                </a>
              </li>
            </ul>
          </div>

          <div className=" text-center md:text-start">
            <h2 className="text-lg font-semibold mb-4">Product</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Create & Manage Blogs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Explore Public Blogs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Responsive UI(Mobile/Desktop)
                </a>
              </li>
            </ul>
          </div>
          <div className=" text-center md:text-start">
            <h2 className="text-lg font-semibold mb-4">Personal</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  About Me
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact Me
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Career
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className=" container mx-auto  flex flex-col md:flex-row justify-between items-center px-10">
        <div className="text-xl font-semibold hidden md:flex">
          Multi<span className="text-blue-500 font-bold">Blog</span>
        </div>
        <div className="text-gray-400 text-sm hidden md:flex">
          <p>&copy; 2024 MultiT. All rights reserved</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-4">
          <a href="#">
            <FaGithub className="h-6" />
          </a>
          <a href="#">
            <BsYoutube className="h-6" />
          </a>

          <a href="#">
            <FaLinkedin className="h-6" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;