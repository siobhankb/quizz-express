const { application } = require('express');

const MainAutoRouter = require('express').Router();

// this will automate the API get/post requests for 'url' in 1st param of .route
MainAutoRouter.route('/register').get((req, res) => {
    console.log('get register')
    res.send('register')
}).post((req, res) => {})

// instead of having to do this a bunch:
// MainAutoRouter.get('/', (res, req) => {})
// MainAutoRouter.post('/', (res, req) => {})
// MainAutoRouter.put('/', (res, req) => {})
// MainAutoRouter.delete('/', (res, req) => {})

module.exports = MainAutoRouter
