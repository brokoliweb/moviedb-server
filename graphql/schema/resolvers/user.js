const graphql = require('graphql')

const UserModel = require('../../../db/user')

const UserType = require('../types/User')
const { userSortInputType } = require('../types/ModelFilter')

const ResourceOutputType = require('../types/ResourceOutputType')

const { GraphQLID, GraphQLString, GraphQLInt, GraphQLNonNull } = graphql

const query = {
  allUser: {
    type: ResourceOutputType(UserType, 'users'),
    args: {
      page: { type: GraphQLInt },
      limit: { type: GraphQLInt },
      sort: { type: userSortInputType },
    },
    resolve: async (parent, args, req) => {
      const { page = 1, limit = 20, sort } = args
      return await UserModel.find()
        .limit(limit)
        .skip((page - 1) * limit)
        .sort(sort)
    },
  },
}

const mutation = {
  addUser: {
    type: UserType,
    args: {
      name: { type: GraphQLString },
      email: { type: new GraphQLNonNull(GraphQLString) },
      birthyear: { type: GraphQLInt },
    },
    resolve: async (parent, args, req) => {
      return await UserModel.create({
        ...args,
      })
    },
  },
  updateUser: {
    type: UserType,
    args: {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      birthyear: { type: GraphQLInt },
    },
    resolve: async (parent, args, req) => {
      const userId = req.userId

      return await UserModel.findOneAndUpdate(
        {
          _id: userId,
        },
        {
          $set: { name, email, birthyear },
        },
        { new: true }
      )
    },
  },
}

module.exports = {
  userQuery: query,
  userMutation: mutation,
}
