import { Container, GridItem, SimpleGrid } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import Post from "./Post/Post"

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts)

  if (!posts.length && !isLoading) return <h1>no posts to load</h1>
  return isLoading ? (
    <h1>Loading</h1>
  ) : (
    <Container maxW="container.xl">
      <SimpleGrid columns={3} mt={10} spacing={5}>
        {posts.map((post) => (
          <GridItem key={post._id} colSpan={[3, 2, 1]}>
            <Post post={post} setCurrentId={setCurrentId} />
          </GridItem>
        ))}
      </SimpleGrid>
    </Container>
  )
}

export default Posts
