const express = require('express')
const mongoose = require('mongoose')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')

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

const developmentWhitelist = ['http://localhost:3000', `http://localhost:4000`]

const origins = {
  development: (origin, callback) => {
    if (developmentWhitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
}

const corsOptions = {
  origin: origins[process.env.NODE_ENV],
  credentials: true,
}

app.use(cors(corsOptions))

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
