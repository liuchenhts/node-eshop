//Load express module with `require` directive
var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')
var app = express()
var MongoClient = require('mongodb').MongoClient

// Log requests to the console.
app.use(logger('dev'))
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')



MongoClient.connect(process.env.ESHOP_DB_URL, (err, database) => {
  if (err)
    return console.log(err)

  console.log('mogodb is connected!')

  // Require our routes into the application.
  require('./server/routes')(app, database)

  //Launch listening server on port 8081
  app.listen(8081, function () {
    console.log('app listening on port 8081! ')
  })
})

// app.listen(8081, function () {
//   console.log('app listening on port 8081! ')
// })
