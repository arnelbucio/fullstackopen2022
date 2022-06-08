const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    id: 1,
    name: 1,
    username: 1,
  })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  const newBlog = await blog.save()
  user.blogs = user.blogs.concat(newBlog._id)
  await user.save()

  response.status(201).json(newBlog)
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const id = request.params.id
  // const user = request.user
  const blog = await Blog.findById(id)
  const body = request.body

  const data = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  // if (blog && blog.user.toString() === user.id.toString()) {
  if (blog) {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, data, {
      new: true,
    })
    response.json(updatedBlog)
  } else {
    return response.status(403).json({ error: 'not authorized' })
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const id = request.params.id
  const user = request.user
  const blog = await Blog.findById(id)

  if (blog && blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(id)

    user.blogs = user.blogs.filter((blog) => blog.id !== id)
    await user.save()

    response.status(204).end()
  } else {
    return response.status(403).json({ error: 'not authorized' })
  }
})

module.exports = blogsRouter
