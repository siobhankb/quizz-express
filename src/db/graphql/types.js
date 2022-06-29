// import built in graphQL types
const { GraphQLObjectType, GraphQLInputObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLInt, GraphQLBoolean, GraphQLFloat } = require('graphql')

// import our models
const { User, Quiz, Question, Submission } = require('../models');

// set up types

const UserType = new GraphQLObjectType(
    {
        name: 'User',
        description: 'user type',
        fields: () => ({
            id: { type: GraphQLID },
            username: { type: GraphQLString },
            email: { type: GraphQLString },
            quizzes: {
                type: GraphQLList(QuizType),
                resolve(parent, args) {
                    return Quiz.find({ userId: parent.id })
                }
            },
            submissions: {
                type: GraphQLList(submissionType),
                resolve(parent, args) {
                    return Submission.find({userId:parent.id})
                }
            }
        })
    }
)