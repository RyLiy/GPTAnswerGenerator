require("dotenv").config();
const rateSpeedLimiterPackage = require("express-slow-down");
var express = require('express');
var cors = require('cors');

var indexRouter = require('./routes/index');
var dbRouter = require('./routes/db');
var gpt3Router = require('./routes/openai');

var app = express();


// allow 16 reqs/min, reqs after that are delayed by 60300
const rateSpeedLimit = rateSpeedLimiterPackage.slowDown({
    delayAfter: 10, // slow down limit (in reqs)
    windowMs:  1 * 60 * 1000, // time where limit applies -1 min
    delayMs: (hits) => hits * hits * 2100, // slow down time
    maxDelayMs: 10300 //max delay time
  
  });

//Use to parse text body from post requests
app.use(express.text())

//Set view engine
app.set('view engine', 'jade');

//parses incoming JSON requests and puts the parsed data in req.body.
app.use(express.json());

//cors
app.use(cors({ origin: true, credentials: true }));
//Using index page
app.use('/', indexRouter);

//Using DB API
app.use('/db', dbRouter);

//Using GPT4 API. rateSpeedLimit applies speed delay to avoid rate limiting
app.use('/openai', gpt3Router);




app.listen(3001, () => {
    console.log("Listening on port 3001...");
});

module.exports = app;
