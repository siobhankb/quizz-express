const MainAutoRouter = require('express').Router();

// this will automate the API get/post requests for 'url' in 1st param of .route
MainAutoRouter.route("/register")
  .get(require("./register.view.js"))
  .post((req, res) => {});

// instead of having to do this a bunch:
// MainAutoRouter.get('/', (res, req) => {})
// MainAutoRouter.post('/', (res, req) => {})
// MainAutoRouter.put('/', (res, req) => {})
// MainAutoRouter.delete('/', (res, req) => {})

MainAutoRouter.route("/login")
  .get(require("./login.view.js"))
  .post((req, res) => { });
  

MainAutoRouter.route("/logout")
  .get(require("./logout.js"));  

module.exports = MainAutoRouter
