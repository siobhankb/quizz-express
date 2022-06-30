const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const { connectDB } = require('./src/db')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./src/graphql/schema')

dotenv.config();

const app = express();

connectDB();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

//set the view engine
app.set('view engine', 'ejs');
// update location of views folder that res.render uses
app.set('views',path.join(__dirname, '/src/templates/views'))

app.get('/', (req, res) => {
    res.send('Hello World!!')
});

// initialize routes
require('./src/routes')(app)
// same as doing:
//initializeRoutes = require('./src/routes')
//initializeRoutes(app)

app.listen(process.env.PORT, () => {
    console.log(`Server now runningon ${process.env.PORT}`)
})