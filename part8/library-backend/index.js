require('dotenv').config()

const { ApolloServer, gql } = require('apollo-server')
const { v4: uuid } = require('uuid')
const mongoose = require('mongoose')

const Book = require('./models/book')
const Author = require('./models/author')

const MONGODB_URI = process.env.MONGODB_URI

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if (!args.author && !args.genre) {
        return books
      }
      const byAuthor = book => book.author === args.author
      const byGenre = book => book.genres.includes(args.genre)
      let filteredBooks = [...books]
      if (args.author) filteredBooks = filteredBooks.filter(byAuthor)
      if (args.genre) filteredBooks = filteredBooks.filter(byGenre)
      return filteredBooks
    },
    allAuthors: () => authors,
  },
  Author: {
    bookCount: root => {
      return books.filter(book => book.author === root.name).length
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOneAndUpdate(
        { name: args.author },
        {},
        {
          new: true,
          upsert: true,
        }
      )
      const book = new Book({ ...args, author })
      return book.save()
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true }
      )
      return author
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
