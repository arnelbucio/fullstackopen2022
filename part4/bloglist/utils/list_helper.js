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

module.exports = {
  dummy, totalLikes, favoriteBlog
}