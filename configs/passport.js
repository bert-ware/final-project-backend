const User = require('../models/user-model')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs') 
const passport = require('passport')

passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id)
})

passport.deserializeUser((userIdFromSession, cb) => {
  console.log("deserializeUser", userIdFromSession)
  User.findById(userIdFromSession, (err, userDocument) => {
    if (err) {
      cb(err)
      return
    }
    cb(null, userDocument)
  })
})

passport.use(
  
  new LocalStrategy({ passReqToCallback: true }, (req, email, password, callback) => {
      console.log("este es el email", email)
    User.findOne({ email })
    .then(user => {
      if (!user) {
        console.log("could not find a user")
        return callback(null, false, { message: 'Incorrect email' })
      }
      if (!bcrypt.compareSync(password, user.passwordHash)) {
        console.log("password doesn't match")
        return callback(null, false, { message: 'Incorrect password' })
      }
      console.log("everything OK with the authentication...")

      req.session.user = user

      callback(null, user)
    })
    .catch(error => {
      console.log("Something went wrong with the authentication...")
      callback(error)
    })
  })
)
//GOOGLE
/* passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      // to see the structure of the data in received response:
      console.log("Google account details:", profile)

      User.findOne({ googleID: profile.id })
        .then(user => {
          if (user) {
            done(null, user)
            return
          }

          User.create({ googleID: profile.id, fullName: profile.displayName, avatar: profile.photos[0].value })
            .then(newUser => {
              done(null, newUser)
            })
            .catch(err => done(err)) // closes User.create()
        })
        .catch(err => done(err)) // closes User.findOne()
    }
  )
) */
// FACEBOOK
/* passport.use(
  new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("Facebbok account details:", profile)
      Usuario.findOne({
          facebookID: profile.id
        })
        .then(user => {
          if (user) {
            done(null, user)
            return;
          }
          Usuario.create({
              facebookID: profile.id,
              nombre: profile.displayName,
              email: `${profile.id}@facebook.fake.com`
            })
            .then(newUser => {
              done(null, newUser);
            })
            .catch(err => done(err)); // closes User.create()
        })
        .catch(err => done(err)); // closes User.findOne()
    })
) */
