const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config.js');
const bodyParser = require('body-parser');
const router = express.Router();
const appRoutes = require('./app/routes/routes.js')(router);
const path = require('path');

// creating the express app
const app = express();
//using the middleware morgan to log the requests
app.use(morgan('dev'));
//for parsing application/Json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//using the router
app.use('/api', appRoutes);
//making the public folder available to access 
app.use(express.static(__dirname + '/public'));
// injecting the html file
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

//connecting to the database
mongoose.connect(dbConfig.url, {

}).then(() => {
    console.log("successfully connected to the database");
}).catch(err => {
    console.log("Could not connect to the database");
});


app.listen(8080, function () {
    console.log('Server is running');
});