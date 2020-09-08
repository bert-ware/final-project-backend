const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Recipe = require("../models/recipe-model")
const Product = require("../models/product-model")

// GET route => to find and return all recipes list
router.get('/recipes', (req, res, next) => {
    Recipe.find()
    .populate("ingredients.product")
      .then(recipes => {
        console.log(recipes)
        res.json(recipes)
      })
      .catch(error => {
        res.json(error)
      })  
  })

  // Post route => to create one recipe
router.post('/recipes', (req, res, next) => {
    Recipe.create({
        name: req.body.name,
        ingredients: req.body.ingredients,
        method : req.body.method,
        userID: req.session.user._id
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
  // GET route => to find and return an especific recipe
router.get('/recipes/:id', (req, res, next) => {
    console.log(req.params.id)
    Recipe.findById(req.params.id)
    .populate("ingredients.product")
      .then(recipe => {
        console.log(recipe)
        res.json(recipe)
      })
      .catch(error => {
        console.log(error)
        res.json(error)
      })
  })

  // PUT route => to update a specific recipe
router.put('/recipes/:id', (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({
        message: 'Specified id is not valid'
      })
      return
    }
    Recipe.findByIdAndUpdate(req.params.id, req.body)
      .then(() => {
        res.json({
          message: `Recipe with ${req.params.id} updated successfully.`
        })
      })
      .catch(error => {
        res.json(error)
      })
  })

  // DELETE route => to delete a specific recipe
router.delete('/recipes/:id', (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({
        message: 'Specified id is not valid'
      })
      return
    }
    Recipe.findByIdAndRemove(req.params.id)
      .then(() => {
        res.json({
          message: `Recipe with ${req.params.id} removed successfully.`
        })
      })
      .catch(error => {
        res.json(error)
      })
  })
  
  module.exports = router