import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import theme from './theme';
import { ChakraProvider } from '@chakra-ui/provider';

// PAGE COMPONENETS
import Home from './components/Home/Home';
import Footer from './components/Footer';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails'

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'))

  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Navbar />
        <Switch>
          <Route path='/' exact component={() => <Redirect to='/posts' /> } />
          <Route path='/posts' exact component={Home}/>
          <Route path='/posts/search' exact component={Home}/>
          <Route path='/posts/:id' component={PostDetails} />
          <Route path='/auth' exact component={() => (!user ? <Auth /> : <Redirect to='/posts' />)} />
        </Switch>
        <Footer />
      </ChakraProvider>
  </BrowserRouter>
  )
}

export default App
