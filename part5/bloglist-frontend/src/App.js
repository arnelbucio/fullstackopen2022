import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import UserList from './components/UserList'
import User from './components/User'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import { initializeBlogs } from './reducers/blogReducer'
import { setUser, logoutUser } from './reducers/loginReducer'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      dispatch(setUser(JSON.parse(loggedUserJSON)))
    }
  }, [])

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(logoutUser())
  }

  return (
    <BrowserRouter>
      <h2>blogs</h2>
      <Notification />

      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>log out</button>
          </p>

          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <Togglable buttonLabel="new blog" ref={blogFormRef}>
                    <BlogForm blogFormRef={blogFormRef} />
                  </Togglable>
                  <BlogList />
                </div>
              }
            />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:userid" element={<User />} />
            <Route path="/blogs/:blogid" element={<Blog />} />
          </Routes>
        </div>
      )}
    </BrowserRouter>
  )
}

export default App
