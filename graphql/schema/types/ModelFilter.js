const graphql = require('graphql')

const { GraphQLInputObjectType, GraphQLEnumType } = graphql

const SortType = new GraphQLEnumType({
  name: 'SortType',
  values: {
    ASC: { value: 1 },
    DESC: { value: -1 },
  },
})

const userSortInputType = new GraphQLInputObjectType({
  name: 'userSortInputType',
  fields: () => ({
    createdAt: { type: SortType },
    updatedAt: { type: SortType },
  }),
})

module.exports = {
  userSortInputType,
}
