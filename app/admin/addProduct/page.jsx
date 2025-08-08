'use client'

import { assets } from "@/public/Assets/assets"
import axios from "axios"
import Image from "next/image"
import { useState } from "react"
import { toast } from "react-toastify"

const page = () => {

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Ayush Panwar",
    authorImg: "/author_img.png"
  })

  const onChangeHandler = (e) => {

    setData({ ...data, [e.target.name]: e.target.value });

  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('author', data.author);
    formData.append('authorImg', data.authorImg);
    formData.append('image', image);

    const response = await axios.post('/api/blog',
      formData
    )

    if (response.data.success) {
      toast.success(response.data.msg);
      setImage(false)
      setData({
        title: "",
        description: "",
        category: "Startup",
        author: "Ayush Panwar",
        authorImg: "/author_img.png"
      });
    }
    else {
      toast.error("Error");
    }


  }

  return (
    <>
      <form onSubmit={handleOnSubmit} className="pt-5 px-5 sm:pt-12 sm:pl-16">
        <p className="text-xl">Upload thumbnail</p>
        <label htmlFor="image">
          <Image className="mt-4" src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="logo" width={140} height={70} />
        </label>
        <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        <p className="text-xl mt-4">Blog Title</p>
        <input name="title" value={data.title} onChange={onChangeHandler} type="text" placeholder="Type here..." required className="rounded-2xl outline-none w-full sm:w-[500px] mt-4 px-4 py-3 border" />
        <p className="text-xl mt-4">Blog Description</p>
        <textarea name="description" value={data.description} onChange={onChangeHandler} type="text" placeholder="Write content here..." rows={6} required className="rounded-2xl outline-none w-full sm:w-[500px] mt-4 px-4 py-3 border" />
        <p className="text-xl mt-4">Blog category</p>
        <select name="category" value={data.category} onChange={onChangeHandler} className="w-40 mt-4 px-4 py-3 border text-gray-500 rounded-2xl">
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />
        <button type="submit" className="mt-8 w-40 h-12 bg-black text-white rounded-2xl">Add Blog</button>
      </form>
    </>
  )
}

export default page
