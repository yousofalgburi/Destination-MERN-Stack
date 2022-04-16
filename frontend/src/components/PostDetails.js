import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useParams, useHistory } from 'react-router-dom'
import { getPost } from '../actions/posts'

const PostDetails = () => {
    const { post, posts, isLoading } = useSelector((state) => state.posts)
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getPost(id))
    }, [id])

    if(!post) return null
    if(isLoading) return <h1 style={{ color: 'white' }}>Loading</h1>

    return (
        <div>
            <img src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} />
            <section>
                <p>Title: {post.title}</p>
                <p>Description: {post.message}</p>
                <p>Created by: {post.name}</p>
                <p>Created: {moment(post.createdAt).fromNow()}</p>
            </section>
        </div>
    )
}

export default PostDetails