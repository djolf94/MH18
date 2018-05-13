const mongoose = require('mongoose');

//User Schema
var criticalSchema = mongoose.Schema({
    point: {
        type: String,
        required: true
    }
});

var Critical = module.exports = mongoose.model('Critical', criticalSchema);

// Get users
module.exports.getCriticals = (callback) => {
    Critical.find(callback);
};

// module.exports.getUserByUserName = (userName, callback) => {
//     User.findOne({"userName": userName}, callback);
// };

//Add User
module.exports.addCritical = (critical, callback) => {
    Critical.create(critical, callback);
};

