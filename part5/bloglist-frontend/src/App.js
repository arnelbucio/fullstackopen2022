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
import Navigation from './components/Navigation'

import { initializeBlogs } from './reducers/blogReducer'
import { checkUser } from './reducers/loginReducer'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(checkUser())
  }, [])

  return (
    <BrowserRouter>
      <Notification />

      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <Navigation user={user} />

          <h2>blog app</h2>

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
