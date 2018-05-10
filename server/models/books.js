const mongoose = require('mongoose');

//User Schema
var bookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
    url: {
        type: String
    },
    description: {
        type: String
    }   
});

var Book = module.exports = mongoose.model('Book', bookSchema);

// Get users
module.exports.getBooks = (callback) => {
    Book.find(callback);
};

/*
module.exports.getUserByUserName = (userName, callback) => {
    User.findOne({"userName": userName}, callback);
};

//Add User
module.exports.addUser = (user, callback) => {
    User.create(user, callback);
};
*/
