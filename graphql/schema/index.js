const graphql = require('graphql')

const { GraphQLObjectType, GraphQLSchema } = graphql

const { userMutation, userQuery } = require('./resolvers/user')

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    ...userQuery,
  }),
})

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: () => ({
    ...userMutation,
  }),
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
})
