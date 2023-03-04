const express = require('express')
const mongoose = require('mongoose')
const { graphqlHTTP } = require('express-graphql')

const schema = require('./graphql/schema')

const app = express()

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/moviedb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
mongoose.connection.on(
  'error',
  console.error.bind(console, 'MongoDB connection error:')
)
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
})

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
)

app.listen(4000, () => {
  console.log('Server running on port 4000')
})
