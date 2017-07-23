'use strict';

// built-in
import path from 'path';
// external
import bodyParser from 'body-parser';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import favicon from 'serve-favicon';
// local
import './app/models'; // this MUST be done before controllers
import config from './config';
import controllers from './app/controllers';
import logger from './app/helpers/logger';
import session from 'express-session';

// EXPRESS SET-UP
// create app
const app = express();
var i18n = require('i18n');

i18n.configure({

//define how many languages we would support in our application
  locales:['en', 'dk'],

//define the path to language json files, default is /locales
  directory: __dirname + '/language',

//define the default language
  defaultLocale: 'en',

  queryParameter: 'lang',

  // setting of log level DEBUG - default to require('debug')('i18n:debug')
  logDebugFn: function (msg) {
    console.log('debug', msg);
  },

  // setting of log level WARN - default to require('debug')('i18n:warn')
  logWarnFn: function (msg) {
    console.log('warn', msg);
  },

  // setting of log level ERROR - default to require('debug')('i18n:error')
  logErrorFn: function (msg) {
    console.log('error', msg);
  },


// define a custom cookie name to parse locale settings from
  cookie: 'i18n'
});

i18n.setLocale('dk');

app.use(cookieParser("i18n_demo"));

app.use(session({
  secret: "i18n_demo",
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

//init i18n after cookie-parser
app.use(i18n.init);
// use jade and set views and static directories
app.set('view engine', 'jade');
app.set('views', path.join(config.root, 'app/views'));
app.use(express.static(path.join(config.root, 'static')));
//add middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(compress());
app.use(cookieParser());
app.use(favicon(path.join(config.root, 'static/img/favicon.png')));
app.use(helmet());
// set all controllers
app.use('/', controllers);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// general errors
app.use((err, req, res, next) => {
  const sc = err.status || 500;
  res.status(sc);
  res.render('error', {
    status: sc,
    message: err.message,
    stack: config.env === 'development' ? err.stack : ''
  });
});

// MONGOOSE SET-UP
// warn if MONGOURI is being used and pass is undefined
if (config.db === process.env.MONGOURI && !config.pass)
  logger.warn(`bad credientials for ${config.db} -- check env.`);
mongoose.connect(config.db, {
  user: config.user,
  pass: config.pass
});
const db = mongoose.connection;
db.on('error', () => {
  throw new Error(`unable to connect to database at ${config.db}`);
});

// START AND STOP
const server = app.listen(config.port, () => {
  logger.info(`listening on port ${config.port}`);
});
process.on('SIGINT', () => {
  logger.info('shutting down!');
  db.close();
  server.close();
  process.exit();
});
