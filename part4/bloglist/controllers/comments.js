const commentsRouter = require('express').Router({ mergeParams: true })
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.post('/', async (request, response) => {
  const body = request.body
  const blog = await Blog.findById(request.params.blogId)

  const comment = new Comment({
    text: body.text,
    blog: blog._id,
  })

  const newComment = await comment.save()
  blog.comments = blog.comments.concat(newComment._id)
  await blog.save()

  response.status(201).json(newComment)
})

module.exports = commentsRouter
