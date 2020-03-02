const mongoose = require('mongoose');
const MongSchema = mongoose.Schema;

var UserSchema = new MongSchema({
    username: { type: String, lowercase: true, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, unique: true }
});

module.exports = mongoose.model('User', UserSchema);