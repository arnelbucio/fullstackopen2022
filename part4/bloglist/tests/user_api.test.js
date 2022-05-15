const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')


beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

test('all users are returned', async () => {
  const response = await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(helper.initialUsers.length)
})

test('can create a valid user', async () => {
  const newUser = {
    username: 'joedoe',
    name: 'Joe Doe',
    password: 'hunter2'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/users')

  const usernames = response.body.map(r => r.username)

  expect(response.body).toHaveLength(helper.initialUsers.length + 1)
  expect(usernames).toContain(
    'joedoe'
  )
})

test('username is required', async () => {
  const newUser = {
    user: 'New User',
    password: 'password'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('username is required')

  const response = await api.get('/api/users')

  const users = response.body.map(r => r.user)

  expect(response.body).toHaveLength(helper.initialUsers.length)
  expect(users).not.toContain(
    'New User'
  )
})

test('password is required', async () => {
  const newUser = {
    username: 'newusername',
    user: 'newuser',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('password is required')

  const response = await api.get('/api/users')

  const usernames = response.body.map(r => r.usernames)

  expect(response.body).toHaveLength(helper.initialUsers.length)
  expect(usernames).not.toContain(
    'newusername'
  )
})

test('username must be at least 3 characters long', async () => {
  const newUser = {
    username: '12',
    user: 'newuser',
    password: 'hunter2'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('username must be at least 3 characters long')

  const response = await api.get('/api/users')

  const usernames = response.body.map(r => r.usernames)

  expect(response.body).toHaveLength(helper.initialUsers.length)
  expect(usernames).not.toContain(
    '12'
  )
})

test('password must be at least 3 characters long', async () => {
  const newUser = {
    username: 'newuser',
    user: 'newuser',
    password: '12'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('password must be at least 3 characters long')

  const response = await api.get('/api/users')

  const usernames = response.body.map(r => r.usernames)

  expect(response.body).toHaveLength(helper.initialUsers.length)
  expect(usernames).not.toContain(
    'newuser'
  )
})

afterAll(() => {
  mongoose.connection.close()
})