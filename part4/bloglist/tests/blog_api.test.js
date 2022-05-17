const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('all blogs are returned', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('id is the blogs unique identifier property', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})


describe('when user is logged in', () => {
  let token = ''

  beforeAll(async () => {
    const { username, user, password } = helper.initialUsers[0]

    // Create user
    await api.post('/api/users')
      .send({ username, user, password })

    // Log in
    const response = await api.post('/api/login')
      .send({ username, password })

    token = response.body.token
  })

  afterAll(async () => {
    await User.deleteMany({})
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
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain(
      'new blog'
    )
  })

  test('returns error 401 when no token is provided', async () => {
    const newBlog = {
      title: 'new blog',
      author: 'Joe Doe',
      url: 'new-blog',
      likes: 42
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
    expect(titles).not.toContain(
      'new blog'
    )
  })

  test('responds with status 400 when title and url are missing', async () => {
    const newBlog = {
      author: 'Joe Doe',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('default likes is zero', async () => {
    const newBlog = {
      title: 'new blog',
      author: 'Joe Doe',
      url: 'new-blog'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body[helper.initialBlogs.length].likes).toBe(0)
  })

  test('can delete a blog successfully', async () => {
    const newBlog = {
      title: 'new blog',
      author: 'Joe Doe',
      url: 'new-blog'
    }

    // Create a blog to delete
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)

    const blogToDelete = response.body

    // Delete the new blog
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})



test('can update a blog successfully', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const newBlogData = { title: 'New title', ...blogToUpdate }
  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlogData)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length
  )

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).toContain(newBlogData.title)
})

afterAll(() => {
  mongoose.connection.close()
})