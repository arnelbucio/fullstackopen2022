const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
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

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('all blogs are returned', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('id is the blogs unique identifier property', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('can create a valid blog', async () => {
  const newBlog = {
    title: 'new blog',
    author: 'Joe Doe',
    url: 'new-blog',
    likes: 42
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain(
    'new blog'
  )
})

afterAll(() => {
  mongoose.connection.close()
})