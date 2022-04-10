import { useSelector } from 'react-redux'
import Post from './Post/Post'

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts)

  if(!posts.length && !isLoading) return <h1>no posts to load</h1>

    return (
        isLoading ? <h1>Loading</h1> : (
            <div>
                {posts.map((post) => (
                    <Post key={post._id} post={post} setCurrentId={setCurrentId} />
                ))}
            </div>
        )
    )
}

export default Posts