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

  return _.chain(blogs)
    .countBy('author')
    .transform((result, value, key) => {
      result.push({ 'author': key, 'blogs': value })
    }, [])
    .maxBy('blogs')
    .value()
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}