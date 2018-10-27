var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const operators = require("./routes/operators");
const maps = require("./routes/maps");
const checkAuth = require('./authentication/check-auth');


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
app.get('/operators/:id', operators.findOne);
app.get('/operators/side/:side', operators.findSide);
app.get('/operators/name/:name', operators.findName);
app.get('/operators/force/:force', operators.findForce);
//Maps Get
app.get('/maps', maps.findAll);
app.get('/maps/:id', maps.findOneMap);
app.get('maps/likes', maps.findTotalLikes);
//Post Methods CheckAuth check to see if the json webtoken is valid and if valid returns the details
app.post('/operators', checkAuth, operators.addOperator);
app.post('/maps', checkAuth, maps.addMap);


//Operator Put
app.put('/operators/:id/likes', checkAuth, operators.incrementLikes);
app.put('/operators/:id/name',checkAuth,  operators.changeName);
app.put('/operators/:id/side', checkAuth, operators.changeSide);
app.put('/operators/:id/force', checkAuth, operators.changeForce);
app.put('/operators/:id/gadget', checkAuth, operators.changeGadget);
//Maps Put
app.put('/maps/:id/likes', checkAuth, maps.incrementLikes);
app.put('/maps/updateMap/:id', checkAuth, maps.updateMap);

app.delete('/maps/:id', checkAuth, maps.deleteMap);
app.delete('/operators/:id', checkAuth, operators.deleteOperator);

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
