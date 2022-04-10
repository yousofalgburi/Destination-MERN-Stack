import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { getPosts, getPostsBySearch } from '../../actions/posts'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import Pagination from '../Pagination'
import { Box, Button, Center, Container, GridItem, Input, SimpleGrid, Text } from '@chakra-ui/react'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const [currentId, setCurrentId] = useState(0)
    const dispatch = useDispatch()
    const query = useQuery()
    const history = useHistory()
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')
    const [search, setSearch] = useState('')

    const searchPost = () => {
        if(search.trim()) {
            dispatch(getPostsBySearch({ search }))
            history.push(`/posts/search?searchQuery=${search || 'none'}`)
        } else {
            history.push('/')
        }
    }

    return (
        <Container maxW="container.2xl" mt={3}>
            <Center>
                <Box border='1px' borderColor='gray.200' boxShadow='lg' rounded='md' p={5}>
                    <SimpleGrid columns={2} spacing={10}>
                        <GridItem colSpan={[2, 2, 1]}>
                            {!searchQuery && (<Pagination page={page} />)}
                            <Text mt={3}>Search by title</Text>
                            <Input mt={1} name='search' value={search} onChange={(e) => {setSearch(e.target.value)}} />
                            <Button mt={3} w="full" onClick={searchPost}>Search</Button>
                        </GridItem>

                        <GridItem colSpan={[2, 2, 1]}>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                        </GridItem>
                    </SimpleGrid>
                </Box>
            </Center>

            <Posts setCurrentId={setCurrentId} />
        </Container>
    )
}

export default Home 