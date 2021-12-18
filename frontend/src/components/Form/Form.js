import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FileBase from 'react-file-base64'
import { createPost, updatePost } from '../../actions/posts'
import styles from './Form.module.css'

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
          <h1 style={{ color: 'white'}}>Please Sign In to create your own memories and like other's memories.</h1>
        )
      }

    return (
      <div className={styles.form}>
          <form onSubmit={handleSubmit}>
              <h2 className={styles.heading}>{currentId ? `Editing "${post.title}"` : 'Creating a Post'}</h2>
              <div>
                  <label htmlFor='title'>Title</label>
                  <input maxLength={20} required type='text' name='title' id='title' value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value})} />
              </div>

              <div>
                  <label htmlFor='message'>Message</label>
                  <textarea maxLength={150} required type='text' name='message' id='message' value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value})} />
              </div>
              
              <div>
                  <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
              </div>

              <button className={styles.button} type='submit'>Submit</button>
          </form>

          <button style={{ width: '50%', backgroundColor: 'red' }} className={styles.button} onClick={clear}>Clear</button>
        </div>
    )
}

export default Form