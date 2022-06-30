const { GraphQLString, GraphQLNonNull, GraphQLList } = require('graphql');
const { User, Quiz, Question, Submission } = require('../models');
const { QuestionInputType, AnswerInputType } = require('./types');
const { createToken } = require('../utils/auth')

const register = {
    type: GraphQLString,
    args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: {type: GraphQLString}
    },
    async resolve(parent, args) {
        const checkUser = await User.findOne({ email: args.email })
        if (checkUser) {
            throw new Error('User with this email already exists');
        }
        const { username, email, password } = args
        const user = new User({ username, email, password })
        user.save();

        const token = createToken(user);

        return token;
    }
}

const login = {
    type: GraphQLString,
    args: {
        email: { type: GraphQLString },
        password: {type: GraphQLString}
    },
    async resolve(parent, args) {
        const user = await User.findOne({ email: args.email })
        if (!user || args.password !== user.password) {
            throw new Error('Invalid Credentials')
        }
        const token = createToken(user);
        return token
    }
}

const createQuiz = {
    type: GraphQLString,
    args: {
        questions: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(QuestionInputType)))
        },
        title: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        userId: {
            type: GraphQLString
        }
    },
    async resolve(parent, args) {
        let slugify = args.title.toLowerCase().replace(/[^\w]+/g, '').replace(/ +/g, '-');
        let fullSlug;

        while (true) {
            let slugId = Math.floor(Math.random() * 10000);
            fullSlug = `${slugify}-${slugId}`;

            const existingQuiz = await Quiz.findOne({ slug: fullSlug });

            if (!existingQuiz){break}
        }

        const quiz = new Quiz({
            title: args.title,
            slug: fullSlug,
            description: args.description,
            userId: args.userId
        })

        await quiz.save();

        for (const question of args.questions){
        const questionItem = new Question({
            title: question.title,
            correctAnswer: question.correctAnswer,
            order: Number(question.order),
            quizId: quiz.id
        })
        questionItem.save()
        }
        return quiz.slug;
    }

}

const submitQuiz = {
    type: GraphQLString,
    args: {
        answers: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(AnswerInputType)))
        },
        userId: { type: GraphQLString },
        quizId: { type: GraphQLString}
    },
    async resolve(parent, args) {
        try {
            let correct = 0
            let totalPossibleScore = args.answers.length;
            for (const answ of args.answers) {
                const questionAnser = await Question.findById(answer.quesionId)
                if (answ.answer.trim().toLowerCase() === questionAnswer.correctAnswer.trim().toLowerCase()) {
                    correct++
                }
            }
            const finalScore = (correct / totalPossibleScore) * 100
            const submission = new Submission({
                userId: args.userId,
                quizId: args.quizId,
                score: finalScore
            })
            submission.save()
            return submission.id
        } catch(e){
            console.log(e);
            return ''
        }
    }
}

module.exports = { register, login, createQuiz, submitQuiz };