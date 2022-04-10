import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'

// REDUX 
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { reducers } from './reducers'

const store = createStore(reducers, {}, compose(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store={store}>
        <ChakraProvider>
            <App />
        </ChakraProvider>
    </Provider>
, document.getElementById('root'))