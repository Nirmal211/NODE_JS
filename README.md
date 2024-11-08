- Create a repository
- Initilize the repository
- node_modules , package.json , package-lock.json
- Install express
- Create a Server
- Listen to port 7777
- Write request handlers for /test, /hello
- Install nodemon and update scripts inside package.json

- multiple route handlers
- next()
- next function and error along with res.send()
- app.use('/route' , rH , rH2 , rH3, rH4)
- route handling and middleware? why do we need it?
- what is middleware?
- how express js basically handles requests behind the scenes
- difference between app.use() and app.all();
- write a dummy auth middleware for admin
- write a dummy auth middleware for all user routes, except /user/login
- Error handling using app.use("/", (err , req, res, next) => {})

* create a free cluster on MongoDb official site ( Mongo Atlas)
* Install Mongoose library
* connect your application to Database "Connection-url"/DatabaseName
* Call the connectDb function and connect to the database before starting server on port 7000
* Create a User Schema and User Model
* Create POST /signup API to add data to Database
* Push some documents using API calls from POSTMAN
* Error Handling using try and catch

- what is the difference between JS object and JSON
- Add the express.json() middleware in your app
- Make your signup API dynamic to receive data from the end user
- User.findOne with duplicate email ids, which object returned
- API - Get user by email
- Create a delete user API
- Difference between Patch and Put
- API - Update a user
- Explore the Mongoose Documentation for Model methods
- What are options in a Model.findOneAndUpdate method, explore more about it
- API - Update the user with email ID

* Data Sanitization & Schema Validations
  - required
  - unique
  - lowercase
  - uppercase
  - minLength
  - maxLength
  - min
  - max
  - default ( value )
  - validation function ( create custom function )
  - trim
  - Add timeStamps to the user schemas

- Add API level Validation on PATCH request & Signup POST API
- Add API Validation for each field
