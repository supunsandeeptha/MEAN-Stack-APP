//importing the user model
const User = require('../models/user.js');


module.exports = function (router) {
    // route to create users
    router.post('/users', function (req, res) {
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
    return router;
}