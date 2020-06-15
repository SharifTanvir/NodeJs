var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 3000;

var dishRouter = require('./route/dishRouter');
var leaderRouter = require('./route/leaderRouter');
var promoRouter = require('./route/promoRouter');

var app = express();

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/dishes', dishRouter);
app.use('/leadership', leaderRouter);
app.use('/promotions', promoRouter);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(port, hostname, function(){
    console.log('Server running at http://'+hostname+':'+port);
})