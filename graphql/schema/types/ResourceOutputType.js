const graphql = require('graphql')

const { GraphQLObjectType, GraphQLInt, GraphQLList } = graphql

const ResourceOutputType = (resource, typeName, extraField) =>
  new GraphQLObjectType({
    name: typeName,
    fields: () => ({
      [typeName]: { type: new GraphQLList(resource) },
      totalPages: { type: GraphQLInt },
      currentPage: { type: GraphQLInt },
      totalCount: { type: GraphQLInt },
      ...extraField,
    }),
  })

module.exports = ResourceOutputType
