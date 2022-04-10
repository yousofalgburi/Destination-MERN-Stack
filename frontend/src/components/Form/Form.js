import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FileBase from 'react-file-base64'
import { createPost, updatePost } from '../../actions/posts'
import { Box, Button, FormLabel, Heading, Input, Text, Textarea } from '@chakra-ui/react'

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ title: '', message: '', selectedFile: '' })
    const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null))
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const history = useHistory()
  
    useEffect(() => {
      if (post) setPostData(post)
    }, [post])
  
    const clear = () => {
      setCurrentId(0)
      setPostData({ title: '', message: '', selectedFile: '' })
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault()
  
      if (currentId === 0) {
        dispatch(createPost({ ...postData, name: user?.result?.name }, history))
        clear()
      } else {
        dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }))
        clear()
      }
    }

    if (!user?.result?.name) {
        return (
          <Text>Please Sign In to create a post or like/comment on a post.</Text>
        )
      }

    return (
      <Box>
          <form onSubmit={handleSubmit}>
              <Heading size="md">{currentId ? `Editing "${post.title}"` : 'Create a Post'}</Heading>

              <FormLabel mt={3} htmlFor='title'>Title</FormLabel>
              <Input maxLength={20} required type='text' name='title' id='title' value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value})} />

              <FormLabel htmlFor='message'>Message</FormLabel>
              <Textarea mb={2} maxLength={150} required type='text' name='message' id='message' value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value})} />
              
              <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />

              <Button mt={2} colorScheme="green" w="full" type='submit'>Submit</Button>
          </form>

          <Button mt={2} colorScheme="red" w="full" onClick={clear}>Clear</Button>
        </Box>
    )
}

export default Form