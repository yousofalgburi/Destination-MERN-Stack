import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { signin, signup } from '../../actions/auth'
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Text, Input, Button, Container, VStack } from '@chakra-ui/react'

const Auth = () => {
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' })
    const [isSignup, setIsSignup] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
  
    const switchMode = () => {
      setForm({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' })
      setIsSignup(prevIsSignup => !prevIsSignup)
    }
  
    const handleSubmit = (e) => {
      e.preventDefault()
  
      if (isSignup) {
        dispatch(signup(form, history))
      } else {
        dispatch(signin(form, history))
      }
    }

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

    const isError = form < 1

    return (
        <Container p={0}>
            <FormControl onSubmit={handleSubmit} isInvalid={isError} py={20}>
                <VStack w="full" h="full" p={10} spacing={5} bg="gray.50">
                    <Text>{ isSignup ? 'Sign in' : 'Sign up' }</Text>
                    <div>
                        { isSignup && (
                            <>
                                <div>
                                    <FormLabel htmlFor='firstname'>First Name</FormLabel>
                                    <Input id='firstname' placeholder='first name' type='text' name='firstName' onChange={handleChange} required/>  
                                </div>

                                <div>
                                    <FormLabel htmlFor='lastname'>Last Name</FormLabel>
                                    <Input id='lastname' placeholder='last name' type='text' name='lastName' onChange={handleChange} required/>
                                </div>
                            </>
                        )}
                        <div>
                            <label htmlFor='email'>Email</label>
                            <Input id='email' placeholder='email' type='email' name='email' onChange={handleChange} required/>
                        </div>

                        <div>
                            <label htmlFor='password'>Password</label>
                            <Input id='password' placeholder='password' type='password' name='password' onChange={handleChange} required/>
                        </div>
                    </div>

                    <Button type='submit'>{isSignup ? 'Signup' : 'Signin'}</Button>
                    <Button onClick={switchMode}>{ isSignup ? 'Sign In Instead' : 'Signup Instead'}</Button>
                </VStack>
            </FormControl>
        </Container>
    )
}

export default Auth