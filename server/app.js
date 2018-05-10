const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(cors());

User = require('./models/users');
Book = require('./models/books');

//connect to mongoose
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

//get request to '/'
app.get('/', (req, res) => {
    res.send('Please use /api/users');
});

app.get('/api/users', (req, res) => {
    User.getUsers((err, users) => {
        if (err)
            throw err;
        res.json(users);
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

app.get('/api/books', (req, res) => {
    Book.getBooks((err, books) => {
        if(err)
            throw err;
        res.json(books);
    });
});

app.post('/api/books', (req, res) => {
    var book = req.body.book;
    User.getUserByUserName(req.body.user, (err, user) => {
        if (err)
            throw err;
        User.updateUser(user, book, (err, users) => {
            if(err)
                throw err;
            res.json(users);
        });
    });
});

//Port on which app is running
app.listen(3000, () => {console.log('Listening on port 3000...')});