const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Provider = require('../models/provider-model')

// Post route => to create one provider
router.post('/providers', (req, res, next) => {
  Provider.create({
      name: req.body.name,
      adress: {
        street: req.body.adress.street,
        number: req.body.adress.number
      },
      telephone: req.body.telephone,
      info: req.body.info
    })
    .then(response => {
      console.log(response)
      res.json(response)
    })
    .catch(error => {
      console.log('ESTE ES EL ERROR',error)
      res.json(error)
    })
})
// GET route => to find and return all provider list
router.get('/providers', (req, res, next) => {
  Provider.find()
    .then(providers => {
      console.log(providers)
      res.json(providers)
    })
    .catch(error => {
      res.json(error)
    })

})
// GET route => to find and return an especific provider
router.get('/providers/:id', (req, res, next) => {
  console.log(req.params.id)
  Provider.findById(req.params.id)
    .then(provider => {
      console.log(provider)
      res.json(provider)
    })
    .catch(error => {
      console.log(error)
      res.json(error)
    })

})

// PUT route => to update a specific provider
router.put('/providers/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({
      message: 'Specified id is not valid'
    });
    return;
  }
  Provider.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({
        message: `provider with ${req.params.id} is updated successfully.`
      });
    })
    .catch(error => {
      res.json(error);
    });
});

// DELETE route => to delete a specific provider
router.delete('/providers/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({
      message: 'Specified id is not valid'
    });
    return;
  }

  Provider.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        message: `Provider with ${req.params.id} is removed successfully.`
      });
    })
    .catch(error => {
      res.json(error);
    });
});


module.exports = router