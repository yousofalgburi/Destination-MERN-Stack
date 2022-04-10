import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../actions/posts'
import { useHistory } from 'react-router-dom'
import { Heading, HStack, Select } from '@chakra-ui/react'

const Pagination = ( { page } ) => {
    const { numberOfPages } = useSelector((state) => state.posts)
    const dispatch = useDispatch()
    const history = useHistory()

    let totalPages = []; 
    for(let i = 1; i <= numberOfPages; i++) {
        totalPages.push(i)
    }

    useEffect(() => {
        if(page) dispatch(getPosts(page))
    }, [page])

    const handleChange = (value) => {
        history.push(`/posts?page=${value}`)
    }
    
    return (
        <HStack>
            <Heading size="md">Page:</Heading>
            <Select onChange={event => handleChange(event.target.value)}>
                { totalPages.map((numberOfPages) => 
                    <option key={numberOfPages} value={numberOfPages}>{numberOfPages}</option>                    
                )}
            </Select>
        </HStack>
    )
}

export default Pagination