// Express
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');

// Firebase 
const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const config = require('./serviceAcountKey.json');
const { credential } = require('firebase-admin');
firebase.initializeApp({
    credential: firebase.credential.cert(config)
});
const auth = firebase.auth;
const auth_ = firebase.auth();
const db = firebase.firestore();
var user = null;

app.get('/', (request, response) => {
    response.render('index', { username: ''});
});

app.get('/home', (request, response) => {
    response.render('home');
 
});

app.get('/feed', (request, response) => {
    const posts = db.collection('posts');
    const query = posts.orderBy('title');
    query.get()
        .then(doc => {
            response.render('feed', { posts: doc } ); 
        })
        .catch(err => {
            console.log("error");
            console.log(err);
            response.render('feed');        
        })
});

app.get('/newpost', (request, response) => {
    response.render('newpost');
});

app.post('/post', (request, response) => {
    var obj = request.body;
    const post = db.collection('posts').add({
        title: obj.title,
        image: "image.jpg",
        location: obj.location,
        description: obj.description
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    response.redirect('/feed');
})

app.get('/login', (request, response) => {
    auth_.signInWithEmailAndPassword(request.id1, request.pass)
        .then(result => {
            user = result.user;
            console.log('Hello ${user.displayName}');
        })
        .catch(console.log)
    response.redirect('/home');
    // auth.signInWithEmailAndPassword(request.id1, request.pass)
    //     .then(result => {
    //         user = result.user;
    //         console.log('Hello ${user.displayName}');
    //     })
    //     .catch(console.log)
    // response.redirect('/home');
})

app.get('/editpost', (request, response) => {
    response.render('editpost');
});

app.get('/loginoptions', (request, response) => {
    response.render('loginoptions');
});

exports.app = functions.https.onRequest(app)
