const express = require('express')
const dotenv = require('dotenv')
const { connectDB } = require('./src/db')

dotenv.config();

const app = express();

connectDB();

app.get('/', (req, res) => {
    res.send('Hello World!!')
});

app.listen(process.env.PORT, () => {
    console.log(`Server now runningon ${process.env.PORT}`)
})