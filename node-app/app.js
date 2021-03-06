var createError = require('http-errors');
var express = require('express');
var path = require('path');
var router = express.Router();
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Https
app.enable('trust proxy')
app.use((req, res, next) => {
    req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
})

// React App
app.use(express.static(path.join(__dirname, '../weatherapp/build')));
app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../weatherapp/build', 'index.html'));
});

module.exports = router;

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

// DIVIO CLOUD ADDITIONS
if (!process.env.STAGE) {
  // disable caching on localdev
  app.set('view cache', false);
}


module.exports = app;
