require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const mongoose     = require('mongoose'); 
const logger       = require('morgan');
const path         = require('path');
const cors         = require('cors');
const passport      = require('passport');
require('./configs/passport');

//Conexion base datos MongoDB
require("./configs/db")

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// default value for title local
app.locals.title = 'Drink-app';
// ADD CORS SETTINGS HERE TO ALLOW CROSS-ORIGIN INTERACTION:
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3001', 'http://localhost:3000'] // <== aceptar llamadas desde este dominio
  })
)
// ADD SESSION SETTINGS HERE:
const session = require('./configs/session')
session(app)

//Passport
require('./configs/passport')

app.use(passport.initialize())
app.use(passport.session())

// ROUTES MIDDLEWARE STARTS HERE:
const index = require('./routes/index');
const providerRoute = require('./routes/provider')
const productRoute = require("./routes/product")
const authRoutes = require('./routes/Auth/auth-routes')
const recipeRoutes = require("./routes/recipes")

app.use('/', index);
app.use('/api', providerRoute)
app.use("/api", productRoute)
app.use('/api', authRoutes)
app.use("/api", recipeRoutes)

module.exports = app;
