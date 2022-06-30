const { GraphQLSchema, GraphQLInputObjectType, GraphQLObjectType } = require('graphql')

const queries = require('./queries');
const mutations = require('./mutations');

const QueryType = new GraphQLObjectType(
    {
        name: 'QueryType',
        description: 'Queries',
        fields : queries
    }
)

const MutationsType = new GraphQLObjectType(
    {
        name: 'MutationType',
        description: 'Mutations',
        fields: mutations
    }
)

module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationsType
})