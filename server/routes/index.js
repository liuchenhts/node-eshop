const productsController = require('../controllers').productsController;
var ObjectID = require('mongodb').ObjectID;

module.exports = (app, db) => {
  // home page
  //Define request response in root URL (/)
  app.get('/', (req, res) => {
    // res.send('Hello World! ')
    // res.sendFile(__dirname + '/index.html');
    res.render('site/index')
  })

  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Products API!',
  }))


  // get, list
  app.get('/products', (req, res) => {
    db.collection('products').find().toArray(function(err, results) {
      if (err) return console.log(err)
      // renders index.ejs
      res.render('products/list', {products: results})
    })
  })

  // get, create
  app.get('/products/create', (req, res) => {
    res.render('products/create')
  })

  // post, create
  // app.post('/products', productsController.create)

  app.post('/products', (req, res) => {
    const product = { name: req.body.name, price: req.body.price }
    db.collection('products').insert(product, (err, result) => {
      if (err) {
        res.send({ 'error': 'insert product error has occurred' })
      } else {
        res.redirect('/products')
      }
    })
  })

  // get, read
  app.get('/products/:id', (req, res) => {
    const id = req.params.id
    const query = { '_id': new ObjectID(id) }
    db.collection('products').findOne(query, function(err, result) {
        if (err) throw err;
        // console.log(result)
        res.render('products/read', {product: result})
    })
  })


  // get, update
  app.get('/products/:id/update', (req, res) => {
    const id = req.params.id
    const query = { '_id': new ObjectID(id) }
    db.collection('products').findOne(query, function(err, result) {
        if (err) throw err;
        // console.log(result)
        res.render('products/update', {product: result})
    })
  })

  // post, update
  app.post('/products/:id', (req, res) => {
    const id = req.params.id
    const query = { '_id': new ObjectID(id) }

    db.collection('products')
    .findOneAndUpdate(query, {
      $set: {
        name: req.body.name,
        price: req.body.price
      }
    }, {
      sort: {_id: -1},
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err)
      res.redirect('/products/'+id)
    })
  })

  // post, delete
  app.post('/products/:id/delete', (req, res) => {
    const id = req.params.id
    const query = { '_id': new ObjectID(id) }
    // console.log('delete product now')

    db.collection('products').findOneAndDelete(query,
    (err, result) => {
      if (err) return res.send(500, err)
      res.redirect('/products')
    })
  })
};
