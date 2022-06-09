import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { Button, TextField, Box } from '@mui/material'

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
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
      >
        <form onSubmit={addBlog}>
          <div>
            <TextField
              label="title"
              size="small"
              type="text"
              name="title"
              id="blog-title"
            />
          </div>
          <div>
            <TextField
              label="author"
              size="small"
              type="text"
              name="author"
              id="blog-author"
            />
          </div>
          <div>
            <TextField
              label="url"
              size="small"
              type="text"
              name="url"
              id="blog-url"
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            id="create-blog-button"
            type="submit"
          >
            create
          </Button>
        </form>
      </Box>
    </div>
  )
}

export default BlogForm
