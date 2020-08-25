const express = require('express');
const authRoutes = express.Router();
//const passport   = require('passport')
const bcrypt = require('bcryptjs');

const User = require('../../models/user-model')

authRoutes.post('/signup', (req, res, next) => {
    const username = req.body.name
    const email = req.body.email
    const password = req.body.password
    if (!username || !password || !email) {
        res.status(400).json({
            message: 'Please provide username, email and password'
        })
        return;
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

    User.findOne({username}, (err, foundUser) => {
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
        const hashPass = bcrypt.hashSync(password, salt);
        const NewUser = new User({
            name: username,
            email: email,
            passwordHash: hashPass
        });
        NewUser.save(err => {
            console.log('ERROR AL CREAR EL USER', err)
            if (err) {
                res.status(400).json({
                    message: 'Saving user to database went wrong.'
                })
                return  
            }
            console.log("User created succesfully!")

              // Automatically log in user after sign up
            req.login(NewUser, (err) => {
                if (err) {
                    res.status(500).json({ message: 'Login after signup went bad.' })
                    return;
                }
                res.status(200).json(NewUser);
            });
        })
    })
})

module.exports = authRoutes