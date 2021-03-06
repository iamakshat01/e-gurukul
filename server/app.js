const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('./bin/config');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect(config.mongourl, {useUnifiedTopology: true, useNewUrlParser: true}).then(() => {
  console.log("Connected to database.");
}).catch((err) => {
  console.log("Could not connect to database.")
});

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const facultyRouter = require('./routes/faculty');
const adminRouter = require('./routes/admin');
const authRouter = require('./routes/auth');
const studentRouter = require('./routes/student');

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/faculty', facultyRouter);
app.use('/admin',adminRouter);
app.use('/auth',authRouter);
app.use('/student', studentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error: (err.status ? err.message : 'Could not process your request.')});
});

module.exports = app;
