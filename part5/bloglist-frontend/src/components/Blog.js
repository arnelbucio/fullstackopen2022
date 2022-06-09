import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { removeBlog, likeBlog, initializeBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import CommentList from './CommentList'
import CommentForm from './CommentForm'

const Blog = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const id = useParams().blogid
  const blog = useSelector((state) => state.blogs.find((u) => u.id === id))

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const remove = () => {
    const message = `Remove blog ${blog.title} by ${blog.author}`
    if (window.confirm(message)) {
      deleteBlog(blog)
    }
  }

  const deleteBlog = (blog) => {
    dispatch(removeBlog(blog.id))
    dispatch(
      setNotification({
        text: `${blog.title} by ${blog.author} removed`,
        type: 'success',
      })
    )
  }

  const like = () => {
    dispatch(likeBlog(blog))
  }

  return (
    <div>
      {blog && (
        <div className="blog">
          <h2>
            {blog.title} {blog.author}
          </h2>
          <div className="blog-details">
            {blog.url}
            <br />
            {blog.likes} <button onClick={like}>like</button>
            <br />
            {blog.author}
            {user && user.username === blog.user.username && (
              <button onClick={remove}>remove</button>
            )}
          </div>
          <div>
            <CommentForm blog={blog} />
            <CommentList comments={blog.comments} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog
