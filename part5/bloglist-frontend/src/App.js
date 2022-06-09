import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'

import { Container } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

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

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Container>
          {user === null ? (
            <LoginForm />
          ) : (
            <div>
              <Navigation user={user} />
              <Notification />
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
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
