const express = require('express')

const dotenv = require('dotenv')

dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!!')
});

app.listen(process.env.PORT, () => {
    console.log(`Server now runningon ${process.env.PORT}`)
})