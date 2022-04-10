import { useDispatch } from 'react-redux'
import moment from 'moment'
import { likePost, deletePost } from '../../../actions/posts'
import { useHistory } from 'react-router-dom'

const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const history = useHistory()

    const openPost = () => {
      history.push(`/posts/${post._id}`)
    }

    const Likes = () => {
        if (post.likes.length > 0) {
          return post.likes.find((like) => like === (user?.result?._id))
            ? (
              <>{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <>{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <>Like</>
      }

    return (
        <div>
          <div onClick={openPost}>
            <img src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png' } />
            <div>
              <h3>Created by {post.name}</h3>
              <p>{moment(post.createdAt).fromNow()}</p>
            </div>
          </div>
          
          <div>
            <section><h3>{post.title}</h3></section>
            <section><p>{post.message}</p></section>

            <div>
              <button onClick={() => dispatch(likePost(post._id))}><Likes/></button>
              {(user?.result?._id === post?.creator) && (
                <button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>Delete</button>
              )}
              {(user?.result?._id === post?.creator) && (
                  <button onClick={() => setCurrentId(post._id)}>Edit</button>
              )}
            </div>
          </div>
        </div>
    )
}

export default Post