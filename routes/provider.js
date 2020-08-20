const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Provider = require('../models/provider-model')
const Product = require("../models/product-model")


router.post('/providers', (req, res, next) => {
  // req.body
  Provider.create({
    name: req.body.name,  
    adress:{
      street : req.body.adress.street,
      number : req.body.adress.number
    }, 
    telephone: req.body.telephone,
    info: req.body.info
  })
  .then(response => {
    console.log(response)
    res.json(response)  
  })
  .catch(err => {
    console.log(err)
    res.json(err)
  })
})

/*router.get('/provider', (req, res, next) => {
  // recoger TODOS los proyectos, y devolver como JSON
  // TO-DO: popular con las productos
  provider.find()
  .populate('products')
  .then(provider => {
    res.json(provider)
  })
  .catch(err => {
    res.json(err)
  })

})*/

router.get('/providers/:id', (req, res, next) => {
  console.log(req.params.id)
  Provider.findById(req.params.id)
 // .populate('products')
  .then(provider => {
    res.json(provider)
  })
  .catch(err => {
    console.log(err)
    res.json(err)
  })
  
})

// PUT route => to update a specific provider
router.put('/provider/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Provider.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `provider with ${req.params.id} is updated successfully.` });
    })
    .catch(error => {
      res.json(error);
    });
});

// DELETE route => to delete a specific provider
router.delete('/provider/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Provider.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Provider with ${req.params.id} is removed successfully.` });
    })
    .catch(error => {
      res.json(error);
    });
});


module.exports = router