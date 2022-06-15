require('dotenv').config()
const { UserInputError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const JWT_SECRET = process.env.JWT_SECRET

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate('author')
      }
      const byAuthor = args.author ? { name: { $eq: args.author } } : {}
      const byGenre = args.genre ? { genres: { $in: [args.genre] } } : {}

      const filteredBooks = await Book.find(byGenre).populate({
        path: 'author',
        match: byAuthor,
      })

      return filteredBooks.filter(book => book.author)
    },
    allAuthors: async () => Author.find({}),
    me: async (root, args, context) => {
      return context.currentUser
    },
  },
  Author: {
    bookCount: async root => {
      const author = await Author.findOne({ name: root.name })
      return Book.countDocuments({ author })
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new ForbiddenError('unathorized')
      }

      try {
        const author = await Author.findOneAndUpdate(
          { name: args.author },
          {},
          {
            new: true,
            upsert: true,
            runValidators: true,
          }
        )
        // save the author to run the validators
        // as the runValidators option doesn't seem to work
        // https://mongoosejs.com/docs/validation.html#update-validators
        await author.save()

        const book = new Book({ ...args, author })

        await book.save()

        pubsub.publish('BOOK_ADDED', { bookAdded: book })

        return book
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new ForbiddenError('unathorized')
      }

      try {
        const author = await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo },
          { new: true, runValidators: true }
        )
        await author.save()

        return author
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: async (root, { username, favouriteGenre }) => {
      if (await User.findOne({ username })) {
        throw new UserInputError('user already exists')
      }
      const user = new User({ username, favouriteGenre })

      return user.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'hunter2') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}

module.exports = resolvers
