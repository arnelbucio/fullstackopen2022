import Blog from '../components/Blog'

const BlogList = ({ blogs, addLike }) => {
  return (
    <div>
      <h2>Blogs</h2>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike}/>
      )}
    </div>
  )
}

export default BlogList