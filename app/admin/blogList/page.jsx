'use client'

import BlogTableItem from "@/Components/AdminComponents/BlogTableItem"
import axios from "axios";
import { useEffect, useMemo, useState } from "react"
import { toast } from "react-toastify";

const page = () => {

  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get('/api/blog');
    setBlogs(response.data.blogs);

  }

  const handleOnDelete = async (id) => {

    const response = await axios.delete('/api/blog', {
      params: {
        id: id
      }
    });

    if (response.data.success) {
      toast.success(response.data.msg);
      fetchBlogs();
    }
    else {
      toast.error(response.data.msg);
    }
  }

  useEffect(() => {
    const getBlogs = () => {
      fetchBlogs();
    }
    getBlogs();
  }, [])

  const reversedBlogs = useMemo(() => blogs.slice().reverse(), [blogs]);

  return (
    <div className="flex-1 pt-5 sm:pt-12 sm:pl-16">
      <h1>All blogs</h1>
      <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-sm text-gray-700 text-left uppercase bg-gray-50">
            <tr>
              <th scope="col" className="hidden sm:block px-6 py-3">
                Author Name
              </th>
              <th scope="col" className=" px-6 py-3">
                Blog Title
              </th>
              <th scope="col" className=" px-6 py-3">
                Date
              </th>
              <th scope="col" className=" px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>

            {reversedBlogs.map((item, index) => {
              return <BlogTableItem key={index} handleOnDelete={handleOnDelete} id={item._id} authorImg={item.authorImg} title={item.title} author={item.author} date={item.date} />
            })}

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default page
