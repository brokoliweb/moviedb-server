const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: false,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    birthyear: {
      type: Number,
      required: true,
    },
  },

  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
