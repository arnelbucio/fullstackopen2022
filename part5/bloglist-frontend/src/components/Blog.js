import { useState } from 'react'
import { useSelector } from 'react-redux'

const Blog = ({ blog, addLike, deleteBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [toggleButtonText, setToggleButtonText] = useState('view')
  const user = useSelector((state) => state.user)

  const detailsStyle = { display: detailsVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible)
    setToggleButtonText(toggleButtonText === 'view' ? 'hide' : 'view')
  }

  const like = () => {
    addLike(blog)
  }

  const remove = () => {
    const message = `Remove blog ${blog.title} by ${blog.author}`
    if (window.confirm(message)) {
      deleteBlog(blog)
    }
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>{toggleButtonText}</button>
      </div>
      <div style={detailsStyle} className="blog-details">
        {blog.url}
        <br />
        {blog.likes} <button onClick={like}>like</button>
        <br />
        {blog.author}
        {user && user.username === blog.user.username && (
          <button onClick={remove}>remove</button>
        )}
      </div>
    </div>
  )
}

export default Blog
