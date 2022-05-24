import { useState } from 'react'

const Blog = ({ blog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [toggleButtonText, setToggleButtonText] = useState('view')

  const detailsStyle = { display: detailsVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible)
    setToggleButtonText(toggleButtonText === 'view' ? 'hide' : 'view')
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>{toggleButtonText}</button>
      </div>
      <div style={detailsStyle}>
        {blog.url}<br />
        {blog.likes} <button>like</button><br />
        {blog.author}
      </div>
    </div>
  )
}

export default Blog