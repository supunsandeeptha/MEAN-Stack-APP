const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config.js');
const bodyParser = require('body-parser');
const router = express.Router();
const appRoutes = require('./app/routes/routes.js')(router);

// creating the express app
const app = express();
//using the middleware morgan to log the requests
app.use(morgan('dev'));
//for parsing application/Json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//using the router
app.use('/api', appRoutes);

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