const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Product = require('../models/product-model')
const Provider = require("../models/provider-model")

// Post route => to create one product
router.post('/products', (req, res, next) => {
  Product.create({
      name: req.body.name,
      price: req.body.price,
      typeFormat: req.body.typeFormat,
      format: req.body.format,
      info: req.body.info,
      Provider: req.body.Provider
    })
    .then(response => {
      console.log(response)
      res.json(response)
    })
    .catch(error => {
      console.log(error)
      res.json(error)
    })
})
// GET route => to find and return all product list
router.get('/products', (req, res, next) => {
  Product.find()
    .populate("Provider")
    .then(products => {
      console.log(products)
      res.json(products)
    })
    .catch(error => {
      res.json(error)
    })

})
// GET route => to find and return an especific product
router.get('/products/:id', (req, res, next) => {
  console.log(req.params.id)
  Product.findById(req.params.id)
  .populate("Provider")
    .then(product => {
      console.log(product)
      res.json(product)
    })
    .catch(error => {
      console.log(error)
      res.json(error)
    })

})

// PUT route => to update a specific product
router.put('/products/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({
      message: 'Specified id is not valid'
    })
    return
  }
  Product.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({
        message: `product with ${req.params.id} is updated successfully.`
      });
    })
    .catch(error => {
      res.json(error)
    });
});

// DELETE route => to delete a specific product
router.delete('/products/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({
      message: 'Specified id is not valid'
    });
    return;
  }
  Product.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        message: `product with ${req.params.id} is removed successfully.`
      });
    })
    .catch(error => {
      res.json(error);
    });
});


module.exports = router