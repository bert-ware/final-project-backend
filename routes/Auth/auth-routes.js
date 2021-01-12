const express = require('express')
const authRoutes = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs');
const session = require('express-session')
const User = require('../../models/user-model')
const mongoose = require('mongoose')
const uploader = require('../../configs/cloudinary')

//POST SIGNUP
authRoutes.post('/signup', (req, res, next) => {
    const username = req.body.name
    const email = req.body.email
    const password = req.body.password
    if (!username || !password || !email) {
        res.status(400).json({
            message: 'Please provide username, email and password'
        })
        return
    }
    //Validar seguridad contraseña 
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
    if (!regex.test(password)) {
        res.status(400).json({
            message: 'Password must contain at least 6 characters, one capital letter and a number'
        })
        return
    }
    //Asegurar formato email
    const emailRegex = /^\S+@\S+\.\S+$/
    if (!emailRegex.test(email)) {
        res.status(400).json({
            message: "Invalid email format, please try again."
        })
        return
    }

    User.findOne({ username}, (err, foundUser) => {
        if (err) {
            res.status(500).json({
                message: "Username check went bad."
            })
            return;
        }
        if (foundUser) {
            res.status(400).json({
                message: 'Username already in use. Choose another one.'
            })
            return
        }
        //Password encryptation
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt)
        const NewUser = new User({
            name: username,
            email: email,
            passwordHash: hashPass
        })
        NewUser.save(err => {
            if (err) {
                res.status(400).json({
                    message: 'Saving user to database went wrong.'
                })
                return
            }
            console.log("User created succesfully!", NewUser)
            res.json(NewUser)
        })
    })
})

//Ruta POST login
authRoutes.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser) => {

        
        if (err) {
          res.status(500).json({ message: 'Something went wrong authenticating user' })
          console.log(err)
          return
        }
        if (!theUser) {
          res.status(401).json({message: "Please provide valid both email and password"})
          return
        }

        
        console.log("Login successful", theUser)
       
        req.login(theUser, (err) => {
          if (err) {
            res.status(500).json({ message: 'Session save went bad.' })
            return
          }
          //Respuesta que contiene el usuario
          res.status(200).json(theUser)
        })
      })(req, res, next)
    })

    //Ruta POST logout
    authRoutes.post('/logout', (req, res, next) => {
        req.logout();
        res.status(200).json({ message: 'Log out success!' })
      })
      //Ruta Loggedin
  authRoutes.get('/loggedin', (req, res, next) => {
      console.log(req.isAuthenticated())
      console.log(req.user)
      console.log(req.session)
    if (req.isAuthenticated()) {
        
        res.status(200).json(req.user)
        return
    }
    res.status(403).json({ message: 'Unauthorized' })
  })
  // PUT route => to be used as user fileuload endpoint
  authRoutes.put('/user/image/:id', uploader.single("myFile"), (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({
        message: 'Specified id is not valid'
      })
      return
    }
    console.log(req.file)
    User.findByIdAndUpdate(req.params.id, {imgUrl : req.file.path})
      .then((user) => {
        user.imgUrl = req.file.path
        res.json(
            user
        )
      })
      .catch(error => {
        res.json(error)
      })
  })

module.exports = authRoutes