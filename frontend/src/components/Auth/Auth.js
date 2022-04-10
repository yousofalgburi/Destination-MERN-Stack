import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { signin, signup } from '../../actions/auth'

const Auth = () => {
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' })
    const [isSignup, setIsSignup] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
  
    const switchMode = () => {
      setForm({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' })
      setIsSignup((prevIsSignup) => !prevIsSignup)
    };
  
    const handleSubmit = (e) => {
      e.preventDefault()
  
      if (isSignup) {
        dispatch(signup(form, history))
      } else {
        dispatch(signin(form, history))
      }
    }

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>{ isSignup ? 'Sign up' : 'Sign in' }</h1>
                <div>
                    { isSignup && (
                        <>
                            <div>
                                <label htmlFor='firstname'>First Name</label>
                                <input id='firstname' placeholder='first name' type='text' name='firstName' onChange={handleChange} required/>  
                            </div>

                            <div>
                                <label htmlFor='lastname'>Last Name</label>
                                <input id='lastname' placeholder='last name' type='text' name='lastName' onChange={handleChange} required/>
                            </div>
                        </>
                    )}
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input id='email' placeholder='email' type='email' name='email' onChange={handleChange} required/>
                    </div>

                    <div>
                        <label htmlFor='password'>Password</label>
                        <input id='password' placeholder='password' type='password' name='password' onChange={handleChange} required/>
                    </div>
                </div>

                <button type='submit'>{isSignup ? 'Signup' : 'Signin'}</button>
                <button onClick={switchMode}>{ isSignup ? 'Sign In Instead' : 'Signup Instead'}</button>
            </form>
        </div>
    )
}

export default Auth