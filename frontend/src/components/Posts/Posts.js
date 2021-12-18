import { useSelector } from 'react-redux'
import Post from './Post/Post'
import styles from './Posts.module.css'

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts)

  if(!posts.length && !isLoading) return <h1 style={{ color: 'white' }}>no posts to load</h1>

    return (
        isLoading ? <h1 style={{ color: 'white' }}>Loading</h1> : (
            <div className={styles.posts_container}>
                {posts.map((post) => (
                    <Post key={post._id} post={post} setCurrentId={setCurrentId} />
                ))}
            </div>
        )
    )
}

export default Posts