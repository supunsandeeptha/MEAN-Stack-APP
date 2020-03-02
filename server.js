const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config.js');
//importing the user model
const User = require('./app/models/user.js');
// require body-parser
const bodyParser = require('body-parser');

// creating the express app
const app = express();

//for parsing application/Json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

// route to create users
app.post('/users', function (req, res) {
    //creating a new user
    const user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    if (req.body.username == null || req.body.username == "" || req.body.password == null || req.body.password == "" || req.body.email == null || req.body.email == "") {
        res.send('Please check your username, password or e-mail');
    } else {
        user.save(function (err) {
            if (err) {
                res.send('Username or E-mail already exists');
            } else {
                res.send('User created !');
            }
        });
    }
});

app.listen(8080, function () {
    console.log('Server is running');
});