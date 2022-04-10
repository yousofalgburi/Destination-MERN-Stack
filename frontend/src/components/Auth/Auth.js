import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { signin, signup } from '../../actions/auth'
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Text, Input, Button, Container, VStack, Heading, SimpleGrid, GridItem } from '@chakra-ui/react'

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
                <VStack w="full" h="full" p={10} spacing={10} bg="gray.50" alignItems="flex-start">
                    <Heading>{ isSignup ? 'Sign in' : 'Sign up' }</Heading>

                    <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
                        { isSignup && (
                            <>
                                <GridItem colSpan={1}>
                                    <FormLabel htmlFor='firstname'>First Name</FormLabel>
                                    <Input id='firstname' placeholder='John' type='text' name='firstName' onChange={handleChange} value={form.firstName} required/> 
                                </GridItem>
                                
                                <GridItem colSpan={1}>
                                    <FormLabel htmlFor='lastname'>Last Name</FormLabel>
                                    <Input id='lastname' placeholder='Williams' type='text' name='lastName' onChange={handleChange} value={form.lastName} required/>
                                </GridItem>
                            </>
                        )}

                        <GridItem colSpan={2}>
                            <FormLabel htmlFor='email'>Email</FormLabel>
                            <Input id='email' placeholder='Example@gmail.com' type='email' name='email' onChange={handleChange} value={form.email} required/>
                        </GridItem>
                        
                        <GridItem colSpan={isSignup ? 1 : 2}>
                            <FormLabel htmlFor='password'>Password</FormLabel>
                            <Input id='password' placeholder='Password' type='password' name='password' onChange={handleChange} value={form.password} required/>
                        </GridItem>

                        {isSignup &&
                            <GridItem colSpan={1}>
                                <FormLabel htmlFor='confirmPassword'>Confirm Password</FormLabel>
                                <Input id='confirmPassword' placeholder='Password Again' type='password' name='confirmPassword' onChange={handleChange} value={form.confirmPassword} required/>
                            </GridItem>
                         }

                        <GridItem colSpan={2}>
                            <Button w="full" size="lg" type='submit'>{isSignup ? 'Signup' : 'Signin'}</Button>
                        </GridItem>

                        <GridItem colSpan={2}>
                            <Button w="full" size="lg" onClick={switchMode}>{ isSignup ? 'Sign In Instead' : 'Signup Instead'}</Button>
                        </GridItem>

                    </SimpleGrid>
                </VStack>
            </FormControl>
        </Container>
    )
}

export default Auth