const express = require('express');
// creating the express app
const app = express();


//craeting a simple request
app.get('/', function (req, res) {
    res.send('Hello World');
});

app.listen(8080, function () {
    console.log('Server is running');
});