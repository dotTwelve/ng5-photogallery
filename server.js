const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const DIR = './public/uploads';
const upload = multer({ dest: DIR });

// Init app and set static file location(frontend)
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
global.__basedir = __dirname;


// MIDDLEWARE //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));


// ROUTES //
app.use('/api/test', (req, res) => {
    res.send('Hello, friend!');
});

app.use('/api/pictures', require('./routes/pictures'));
app.use('/api/albums', require('./routes/albums'));
app.use('/public/uploads/:album/:photo', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/uploads', req.params.album, req.params.photo));
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


// START SERVER //
app.listen(3000, () => {
    console.log('Server started on port 3000...');

    // DB //
    mongoose.connect('mongodb://localhost:27017/ng5-photogallery');

    mongoose.connection.on('connected', () => {
        console.log('Connected to database... ');
    });
    mongoose.connection.on('error', (err) => {
        console.log('Database Error: ', err);
    });
});