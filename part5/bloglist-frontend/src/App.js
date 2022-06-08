import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(
        setNotification({
          text: 'wrong username or password',
          type: 'error',
        })
      )
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
      dispatch(
        setNotification({
          text: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
          type: 'success',
        })
      )
    })
  }

  const deleteBlog = (blogObject) => {
    blogService.remove(blogObject.id).then(() => {
      setBlogs(blogs.filter((blog) => blog.id !== blogObject.id))

      dispatch(
        setNotification({
          text: `${blogObject.title} by ${blogObject.author} removed`,
          type: 'success',
        })
      )
    })
  }

  const addLike = (blogObject) => {
    blogService.like(blogObject).then((returnedBlog) => {
      const updatedBlogs = blogs.map((blog) => {
        return blog.id === returnedBlog.id
          ? {
              likes: returnedBlog.likes + 1,
              ...returnedBlog,
            }
          : blog
      })
      setBlogs(updatedBlogs)
    })
  }

  return (
    <div>
      <Notification />
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      ) : (
        <div>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>log out</button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>

          <BlogList
            blogs={blogs}
            addLike={addLike}
            deleteBlog={deleteBlog}
            user={user}
          />
        </div>
      )}
    </div>
  )
}

export default App
