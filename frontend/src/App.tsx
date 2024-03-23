import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Blog, Signin, Signup, Blogs } from "./pages"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/blog/:id" element={<Blog/>}/>
        <Route path="/blogs" element={<Blogs/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App