const functions = require('firebase-functions');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (request, response) => {
    response.render('index', {"title": "Facts"});
});

app.get('/home', (request, response) => {
    response.render('home');
});

exports.app = functions.https.onRequest(app)
