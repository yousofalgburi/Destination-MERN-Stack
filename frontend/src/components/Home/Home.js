import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { getPosts, getPostsBySearch } from '../../actions/posts'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import Pagination from '../Pagination'

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

    const handleKeyPress = (e) => {
        if(e.keyCode === 13) {
            searchPost()
        }
    }

    const searchPost = () => {
        if(search.trim()) {
            dispatch(getPostsBySearch({ search }))
            history.push(`/posts/search?searchQuery=${search || 'none'}`)
        } else {
            history.push('/')
        }
    }

    return (
        <div>
            <div>
                <section>
                    <Posts setCurrentId={setCurrentId} />
                </section>

                <section>
                    <div>
                        {!searchQuery && (
                            <Pagination page={page} />
                        )}
                        <div>
                            <p>Search by title</p>
                            <input onKeyPress={handleKeyPress} name='search' value={search} onChange={(e) => {setSearch(e.target.value)}} />
                            <button onClick={searchPost}>Search</button>
                        </div>                      
                    </div>
                    <Form currentId={currentId} setCurrentId={setCurrentId} />
                </section>
            </div>
        </div>
    )
}

export default Home 