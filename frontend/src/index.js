import { createRoot } from "react-dom/client"
import App from "./App"
import "./index.css"
import { ColorModeScript } from "@chakra-ui/react"

// REDUX
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import { reducers } from "./reducers"

const store = createStore(reducers, {}, compose(applyMiddleware(thunk)))

const root = createRoot(document.getElementById("root"))
root.render(
  <Provider store={store}>
    <ColorModeScript />
    <App />
  </Provider>
)
