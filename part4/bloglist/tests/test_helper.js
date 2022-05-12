const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Hello world',
    author: 'Arnel Bucio',
    url: 'hello-world',
    likes: 42
  },
  {
    title: 'Lorem ipsum',
    author: 'John Doe',
    url: 'Lorem-ipsum',
    likes: 33
  },
]


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}