const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config.js');

// creating the express app
const app = express();

//connecting to the database
mongoose.connect(dbConfig.url, {

}).then(() => {
    console.log("successfully connected to the database");
}).catch(err => {
    console.log("Could not connect to the database");
});

//using the middleware morgan
app.use(morgan('dev'));

//craeting a simple request
app.get('/', function (req, res) {
    res.send('Hello World');
});

app.listen(8080, function () {
    console.log('Server is running');
});