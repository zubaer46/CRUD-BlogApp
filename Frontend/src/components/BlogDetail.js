import { Button, InputLabel, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
const labelStyles = { mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' }

const BlogDetail = () => {
  const navigate = useNavigate()
  const [blog, setBlog] = useState()
  
  const id = useParams().id
  console.log(id)

  const [inputs, setInputs] = useState({})

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:3000/api/news/${id}`)
      .catch((err) => console.log(err))
    const data = await res.data
     
    return data
  }
  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.data)
      
      setInputs({
        title: data.data[0].title,
        description: data.data[0].description,
        image: data.data[0].image,
      })
      
    })
   
  }, [id])
  
  const sendRequest = async () => {
     
    const res = await axios
      .put(`http://localhost:3000/api/news/update/${id}`, {
        blog_id:id,
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
       
      })
      .catch((err) => console.log(err))

    const data = await res.data
   
    return data
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs)
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate('/myBlogs/'))
  }
  return (
    <div>
      {inputs &&
      <form onSubmit={handleSubmit}>
        <Box
          border={3}
          borderColor="linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={'auto'}
          marginTop={3}
          display="flex"
          flexDirection={'column'}
          width={'80%'}
        >
          <Typography
            fontWeight={'bold'}
            padding={3}
            color="grey"
            variant="h2"
            textAlign={'center'}
          >
            Edit Your Blog
          </Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField
            name="title"
            onChange={handleChange}
            value={inputs.title}
            margin="auto"
            variant="outlined"
          />
          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField
            name="description"
            onChange={handleChange}
            value={inputs.description}
            margin="auto"
            variant="outlined"
          />
          <InputLabel sx={labelStyles}>ImageURL</InputLabel>
          <TextField
            name="image"
            onChange={handleChange}
            value={inputs.image}
            margin="auto"
            variant="outlined"
          />
          <Button sx={{ mt: 2, borderRadius: 4 }} variant="contained" color="warning" type="submit">
            Submit
          </Button>
        </Box>
      </form>
}
    </div>
  )
}

export default BlogDetail
