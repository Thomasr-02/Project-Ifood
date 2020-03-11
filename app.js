const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');


const app = express();
const handlebars = require("express-handlebars");

var controllerUser = require('./controllers/controllerUser')

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.engine('handlebars', handlebars({ defaultLayouts: 'main' }))
app.set('view engine', 'handlebars')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// rotes
app.use('/', usersRouter);
app.use('/', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

const { Pool, Client } = require('pg')
const pool = new Pool({
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: '12345678',
    database: 'postgres2'
})

pool.connect(function(err) {
    if (err) return console.log(err);
    console.log('conected database!');

})
console.log("Api rodando port 3000!");
//error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;