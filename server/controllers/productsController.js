const product = require('../models').Product;

module.exports = {
  list(req, res) {
    return product
      .all()
      .then(products => res.status(200).send(products))
      .catch(error => res.status(400).send(error));
  },

  create(req, res) {
    return product
      .create({
        name: req.body.name,
        price: req.body.price,
      })
      .then(product => res.status(201).send(product))
      .catch(error => res.status(400).send(error));
  },
};
