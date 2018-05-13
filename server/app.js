const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(cors());

Station = require('./models/stations');
Critical = require('./models/criticals');

//connect to mongoose
mongoose.connect('mongodb://admin:ivke12345@ds219130.mlab.com:19130/mh18');
var db = mongoose.connection;

//get request to '/'
app.get('/', (req, res) => {
    res.send('Please use /api/books or /api/genres');
});

app.get('/api/users', (req, res) => {
    User.getUsers((err, users) => {
        if (err)
            throw err;
        res.json(users);
    });
});
app.get('/stations/', (req, res) => {
    Station.getStations((err, stations) => {
        if (err)
            throw err;
        res.json(stations);
    });
});

app.get('/proba', (req, res) => {
    console.log("STIGO");
    Critical.getCriticals((err, crit) => {
        if (err)
            throw err;
        res.json(crit);
    });
});

app.get('/critical/:p', (req, res) => {
    let pom = {point: req.params.p };
    Critical.addCritical(pom, (err, user) => {
        if (err)
            throw err;
        res.json(user);
    });
});
app.post('/stations/', (req, res) => {
    let station = req.body;
    Station.addStation(station, (err, station) => {
        if (err)
            throw err;
        res.json(station);
    });
});
app.post('/api/users', (req, res) => {
    var user = req.body;
    User.addUser(user,(err, user) => {
        if (err)
            throw err;
        res.json(user);
    });
});

app.get('/api/user/:_UserName', (req, res) => {
    User.getUserByUserName(req.params._UserName, (err, user) => {
        if (err)
            throw err;
        res.json(user);
    });
});

//Port on which app is running
app.listen(3000, () => {console.log('Listening on port 3000...')});