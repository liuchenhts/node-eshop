//Load express module with `require` directive
var express = require('express')
var app = express()

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

//Define request response in root URL (/)
app.get('/', (req, res) => {
  // res.send('Hello World! ')
  // res.sendFile(__dirname + '/index.html');
  res.render('layout');
})

//Launch listening server on port 8081
app.listen(8081, function () {
  console.log('app listening on port 8081! ')
})
