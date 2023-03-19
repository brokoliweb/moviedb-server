const express = require('express')
const mongoose = require('mongoose')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')

const schema = require('./graphql/schema')

const app = express()

const LOCAL_DB_URI = `mongodb://localhost:${process.env.DB_PORT}/moviedb`
const DB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.av114cv.mongodb.net/test`

// Connect to MongoDB
mongoose.connect(DB_URI, {
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

const corsOptions = {
  origin: developmentWhitelist,
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
