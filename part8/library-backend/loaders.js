const Dataloader = require('dataloader')
const Book = require('./models/book')

const loaders = {
  bookCounter: new Dataloader(async authorIds => {
    const books = await Book.find({ author: { $in: authorIds } })
    return authorIds.map(
      authorId =>
        books.filter(book => {
          return String(book.author) === authorId
        }).length
    )
  }),
}

module.exports = loaders
