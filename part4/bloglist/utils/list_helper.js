const _ = require('lodash')


const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length ===  0) return 0

  return blogs.reduce((previous, current) => {
    return previous + current.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  const favorite = blogs.reduce((previous, current) => {
    return (previous.likes > current.likes)
      ? previous
      : current
  }, {})

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const result = _.chain(blogs)
    .countBy('author')
    .map((blogs, author) => ({
      author: author,
      blogs: blogs
    }))
    .maxBy('blogs')
    .value()

  console.log(result)
  return result
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const result = _.chain(blogs)
    .groupBy('author')
    .map((blog, author) => ({
      author: author,
      likes: _.sumBy(blog, 'likes')
    }))
    .maxBy('likes')
    .value()

  console.log(result)
  return result
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}