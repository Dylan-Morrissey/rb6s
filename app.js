var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const operators = require("./routes/operators");
const maps = require("./routes/maps");


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//Operators Get
app.get('/operators', operators.findAll);
app.get('/operators/likes', operators.findTotalLikes);
app.get('/operators/:side', operators.findSide);
app.get('/operators/:force', operators.findForce);
app.get('/operators/:id', operators.findOne);
//Maps Get
app.get('/maps', maps.findAll);
app.get('/maps/:id', maps.findOne);
app.get('maps/likes', maps.findTotalLikes);
//Post Methods
app.post('/operators', operators.addOperator);
app.post('/maps', maps.addMap);


//Operator Put
app.put('/operators/:id/likes', operators.incrementLikes);
app.put('/operators/:id/name', operators.changeName);
app.put('/operators/:id/side', operators.changeSide);
app.put('/operators/:id/force', operators.changeForce);
app.put('/operators/:id/gadget', operators.changeGadget);
//Maps Put
app.put('/maps/:id/likes', maps.incrementLikes);
app.put('/maps/updateMap/:id', maps.updateMap);

app.delete('/maps/:id', maps.deleteMap);
app.delete('/operators/:id', operators.deleteOperator);

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
  res.render('error');
});

module.exports = app;
