const mongoose = require('mongoose');
const MongSchema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

var UserSchema = new MongSchema({
    username: { type: String, lowercase: true, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, unique: true }
});

UserSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, null, null, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

module.exports = mongoose.model('User', UserSchema);