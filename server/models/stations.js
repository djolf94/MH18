const mongoose = require('mongoose');

//User Schema
var stationSchema = mongoose.Schema({
    arr: {
        type: Object,
        required: true
    }
});

var Station = module.exports = mongoose.model('Station', stationSchema);

// Get users
module.exports.getStations = (callback) => {
    Station.find(callback);
};

// module.exports.getUserByUserName = (userName, callback) => {
//     User.findOne({"userName": userName}, callback);
// };

//Add User
module.exports.addStation = (station, callback) => {
    Station.create(station, callback);
};

