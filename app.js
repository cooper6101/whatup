require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const engine = require('ejs-mate');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const User = require('./models/user');

mongoose.Promise = global.Promise;

const indexRouter = require('./routes/index');
const venuesRouter = require('./routes/venues');

const app = express();

// connect to db
const uri = process.env.MONGODB_URL;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

// use ejs-locals for all ejs templates
app.engine('ejs', engine)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// setup public assets directory
app.use(express.static('public'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use('/', indexRouter);
app.use('/venue', venuesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
