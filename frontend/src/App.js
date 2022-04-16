import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom"
import theme from "./theme"
import { ChakraProvider } from "@chakra-ui/provider"

// PAGE COMPONENETS
import Home from "./components/Home"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Auth from "./components/Auth"
import PostDetails from "./components/PostDetails"

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"))

  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Navigate to="/posts" />} />
          <Route path="/posts" exact element={<Home />} />
          <Route path="/posts/search" exact element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route
            path="/auth"
            exact
            element={!user ? <Auth /> : <Navigate to="/posts" />}
          />
        </Routes>
        <Footer />
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
