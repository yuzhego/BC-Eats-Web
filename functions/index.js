const functions = require('firebase-functions');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (request, response) => {
    response.render('index');
});

app.get('/home', (request, response) => {
    response.render('home');
});

app.get('/feed', (request, response) => {
    response.render('feed');
});

app.get('/newpost', (request, response) => {
    response.render('newpost');
});

app.get('/editpost', (request, response) => {
    response.render('editpost');
});

app.get('/loginoptions', (request, response) => {
    response.render('loginoptions');
});

exports.app = functions.https.onRequest(app)
