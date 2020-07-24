const functions = require('firebase-functions');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (request, response) => {
    response.render('index', {"title": "Facts"});
});

exports.app = functions.https.onRequest(app)
