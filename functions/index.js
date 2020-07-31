const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const app = express();

const firebaseApp = firebase.initializeApp(
    functions.config().firebase
);

function getFeed() {
    const ref = firebaseApp.firestore().ref('posts');
    return ref.once('value').then(snap => snap.val());
}

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (request, response) => {
    response.render('index');
});

app.get('/home', (request, response) => {
    response.render('home');
});

app.get('/feed', (request, response) => {
    getFeed().then(feed => {
        response.render('feed', { feed });
    });
    
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
