const mongoose = require('mongoose');

//User Schema
var userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    registerDate: {
        type: Date,
        default: Date.now
    }    
});

var User = module.exports = mongoose.model('User', userSchema);

// Get users
module.exports.getUsers = (callback, limit) => {
    User.find(callback).limit(limit);
};

module.exports.getUserByUserName = (userName, callback) => {
    User.findOne({"userName": userName}, callback);
};

//Add User
module.exports.addUser = (user, callback) => {
    User.create(user, callback);
};

