/* eslint-disable no-use-before-define */
const graphql = require('graphql')
const { capitalize } = require('../../../helpers')

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = graphql

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve(parent) {
        return parent._id || parent.id
      },
    },
    name: {
      type: GraphQLString,
      async resolve(parent) {
        return capitalize(parent.name)
      },
    },
    email: { type: new GraphQLNonNull(GraphQLString) },
    birthyear: { type: GraphQLInt },
  }),
})
module.exports = UserType
