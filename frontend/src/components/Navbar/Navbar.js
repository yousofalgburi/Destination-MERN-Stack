import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'
import * as actionType from '../../constants/actionTypes'

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()

    const logout = () => {
        dispatch({ type: actionType.LOGOUT })
        setUser(null)
        history.push('/auth')
    }
    
    useEffect(() => {
        const token = user?.token
        if (token) {
          const decodedToken = decode(token)
          if (decodedToken.exp * 1000 < new Date().getTime()) logout()
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
        <>
            <ul>
                <li><Link to='/'>Destination</Link></li>
                
                <div style={{ float: 'right'}}>
                    { user?.result ? (
                        <>
                            <h2>Welcome! {user?.result.name}</h2>
                            <button onClick={logout}>logout</button>
                        </>
                    ) : <li><Link to='/auth'>login/register</Link></li>}
                </div>
            </ul>
        </>
    )
}

export default Navbar