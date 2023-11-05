var express = require('express');

var indexRouter = require('./routes/index');
var dbRouter = require('./routes/db');
var gpt3Router = require('./routes/gpt3');
var apiRouter = require('./routes/API');

var app = express();
//Set view engine
app.set('view engine', 'jade');

//parses incoming JSON requests and puts the parsed data in req.body.
app.use(express.json());

//css
//app.use('/css',express.static(__dirname +'/css'));

//Using index page
app.use('/', indexRouter);

//Using DB API
app.use('/db', dbRouter);

//testing
app.use('/gpt3', gpt3Router);

//API
app.use('/API', apiRouter);


app.listen(3000, () => {
    console.log("Listening on port 3000...");
});

module.exports = app;