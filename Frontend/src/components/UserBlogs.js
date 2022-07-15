import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Blog from './Blog'

function UserBlogs() {
  
  const [blogs, setBlogs] = useState()
  const id = localStorage.getItem('user_id')
  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:3000/api/news/user/${id}`)
      .catch((err) => console.log(err))
    const data = await res.data
    
    return data
  }
  
   useEffect(() => {
     sendRequest().then((data) => setBlogs(data.data))
   }, []);
   console.log(blogs)
  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            blog_id={blog.blog_id}
            isUser={localStorage.getItem('user_id') == blog.user_id}
            user_id={blog.user_id}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            name={blog.name}
          />
        ))}
    </div>
  )
}

export default UserBlogs
