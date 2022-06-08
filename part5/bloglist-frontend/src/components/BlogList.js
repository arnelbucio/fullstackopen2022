import { useSelector, useDispatch } from 'react-redux'
import Blog from '../components/Blog'
import { removeBlog, likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogList = ({ user }) => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => {
    return [...state.blogs].sort((a, b) => b.votes - a.votes)
  })

  const deleteBlog = (blog) => {
    dispatch(removeBlog(blog.id))
    dispatch(
      setNotification({
        text: `${blog.title} by ${blog.author} removed`,
        type: 'success',
      })
    )
  }

  const addLike = (blog) => {
    dispatch(likeBlog(blog))
  }

  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          addLike={addLike}
          deleteBlog={deleteBlog}
          user={user}
        />
      ))}
    </div>
  )
}

export default BlogList
