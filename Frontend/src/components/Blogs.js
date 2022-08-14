import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Blog from './Blog'
import { Grid } from '@mui/material'

const Blogs = () => {
  const [blogs, setBlogs] = useState()
  const sendRequest = async () => {
    const res = await axios.get('http://localhost:3000/api/news').catch((err) => console.log(err))
    const data = await res.data
    return data
  }
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.data))
  }, [])
  //console.log(blogs)
  return (
    <div>
      
      <Grid container justify="flex-start"  columnSpacing={16} rowSpacing={10}>
        {blogs &&
          blogs.map((blog, index) => (
            <Grid key={index} item xs="4"  spacing={2}>
              <Blog
                blog_id={blog.blog_id}
                user_id={blog.user_id}
                isUser={localStorage.getItem('user_id') == blog.user_id}
                title={blog.title}
                description={blog.description}
                image={blog.image}
                name={blog.name}
              />
            </Grid>
          ))}
      </Grid>
    </div>
  )
}

export default Blogs
