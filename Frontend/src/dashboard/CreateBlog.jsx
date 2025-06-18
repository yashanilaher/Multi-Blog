import React,{ useState } from 'react'
import axios from "axios";
import toast from 'react-hot-toast';

const CreateBlog = () => {
  const [title,setTitle]=useState("");
  const [category,setCategory]=useState("");
  const [about,setAbout]=useState("");
  const [blogImage,setBlogImage]=useState("");
  const [blogImagePreview,setBlogImagePreview]=useState("");

  const changePhotoHandler=(e)=>{
    console.log(e);
    const file=e.target.files[0];
    const reader=new FileReader(); 
    reader.readAsDataURL(file); //ye asynchronous hai //reads the file and convert it into a DataURL (this url can be directly used as a src link)
    // console.log(reader);
    // used a callback approach (onload), not async/await. as fileReader does not use Promises
    reader.onload=()=>{ //When the file is successfully read, the onload function runs.
      // console.log(reader.result);  //asynchronous hai , that why onload ke baad ayega
      setBlogImagePreview(reader.result);    //reader.result now contains the Data URL.
      setBlogImage(file)
    }
  };  

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    // ✅ Validate before request
    if (about.trim().split(" ").length < 50) {
      toast.error("About section should be at least 50 words");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("blogImage", blogImage);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/blogs/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message || "Blog created successfully");
      setTitle("");
      setCategory("");
      setAbout("");
      setBlogImage({});
      setBlogImagePreview({});
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Please fill required fields");
    }
  };

  return (
    <div>
      <div className="min-h-screen  py-15 px-10 sm:pl-70">
        <div className="max-w-4xl mx-auto p-6 border  rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-8">Create Blog</h3>
          <form onSubmit={handleCreateBlog} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-lg">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              >
                <option value="">Select Category</option>
                <option value="Devotion">Devotion</option>
                <option value="Sports">Sports</option>
                <option value="Coding">Coding</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Business">Business</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-lg">Title</label>
              <input
                type="text"
                placeholder="Enter your blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400   rounded-md outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg">Blog Image</label>
              <div className="flex items-center justify-center">
                <img
                  src={blogImagePreview ? `${blogImagePreview}` : "/imgPL.webp"}
                  alt="Image"
                  className="w-full max-w-sm h-auto rounded-md object-cover"
                />
              </div>
              <input
                type="file"
                onChange={changePhotoHandler}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none 
                              file:mr-4 file:py-2 file:px-4 file:rounded-md 
                              file:border-0 file:text-sm file:font-semibold 
                              file:bg-blue-600 file:text-white 
                              hover:file:bg-blue-700"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg">About</label>
              <textarea
                rows="5"
                placeholder="Write something about your blog"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full px-3 py-2  border border-gray-400  rounded-md outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
            >
              Post Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateBlog


