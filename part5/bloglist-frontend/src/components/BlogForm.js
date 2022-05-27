import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title, author, url
    }

    createBlog(blogObject)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type='text'
            value={title}
            name='Title'
            id='blog-title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type='text'
            value={author}
            name='Author'
            id='blog-author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type='text'
            value={url}
            name='Url'
            id='blog-url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='create-blog-button' type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm