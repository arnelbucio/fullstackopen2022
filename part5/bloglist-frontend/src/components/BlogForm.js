import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    blogFormRef.current.toggleVisibility()

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    const blog = { title, author, url }
    dispatch(createBlog(blog))
    dispatch(
      setNotification({
        text: `a new blog ${blog.title} by ${blog.author} added`,
        type: 'success',
      })
    )
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input type="text" name="title" id="blog-title" />
        </div>
        <div>
          author
          <input type="text" name="author" id="blog-author" />
        </div>
        <div>
          url
          <input type="text" name="url" id="blog-url" />
        </div>
        <button id="create-blog-button" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
