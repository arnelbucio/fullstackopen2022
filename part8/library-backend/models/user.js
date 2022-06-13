const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 2,
  },
  favouriteGenre: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('User', schema)
