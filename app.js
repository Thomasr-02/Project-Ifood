/*Configs */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { port } = require('./bin/www');

/*rotas */
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const restaurantesRouter = require('./routes/restaurantes');
const dishesRouter = require('./routes/dishes');
const buysRouter = require('./routes/buys');
const couponsRouter = require('./routes/coupons');
const findProdOrRest = require('./routes/findProductOrRestaurante');


const app = express();

/*view engine */
const handlebars = require("express-handlebars");
app.engine('handlebars', handlebars({ defaultLayouts: 'main' }))
app.set('view engine', 'handlebars')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var cors = require('cors')

app.use(cors())

// rotes
app.use('/', usersRouter);
app.use('/', authRouter);
app.use('/', restaurantesRouter);
app.use('/', dishesRouter);
app.use('/', buysRouter);
app.use('/', couponsRouter);
app.use('/', findProdOrRest);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

const pool = require('./pool');

pool.connect(function (err) {
    if (err) return console.log(err);
    console.log('conected database!');

})
console.log('API Rodando na porta 3001!');

//error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;