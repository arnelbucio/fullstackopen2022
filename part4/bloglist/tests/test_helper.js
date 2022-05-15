const Blog = require('../models/blog')
const User = require('../models/user')

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

const initialUsers = [
  {
    username: 'root',
    name: 'Superadmin',
    password: 'root',
  },
  {
    username: 'admin',
    name: 'Admin',
    password: 'hunter2',
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, initialUsers, usersInDb
}