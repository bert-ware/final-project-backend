const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Provider = require('../models/provider-model')
const Product = require("../models/product-model")

// GET route => to retrieve a specific product1
router.get('/providers/:projectId/product/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => {
      res.json(product);
    })
    .catch(error => {
      res.json(error);
    });
});

// POST route => to create a new product
router.post('/product', (req, res, next) => {
  Product.create({
    name: req.body.name,
    graduation: req.body.graduation,
    price: req.body.price,
    format: req.body.format,
    info: req.bosy.info,
    idprovider: req.body.idprovider
  })
    .then(response => {
      return Provider.findByIdAndUpdate(req.body.providerID, {
        $push: { product: response._id }
      });
    })
    .then(theResponse => {
      res.json(theResponse);
    })
    .catch(err => {
      res.json(err);
    });
});

// PUT route => to update a specific product
router.put('/product/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Product.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Product with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    });
});

// DELETE route => to delete a specific task
router.delete('/product/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Product.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Product with ${req.params.id} is removed successfully.` });
    })
    .catch(error => {
      res.json(error);
    });
});

module.exports = router;