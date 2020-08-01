// Express
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');

// Firebase 
const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const config = require('../serviceAccountKey.json');
const { credential } = require('firebase-admin');
firebase.initializeApp({
    credential: firebase.credential.cert(config)
});
const db = firebase.firestore();

    


function getFeed() {
    const posts = db.collection('posts');
    const query = posts.orderBy('title');

    query.get()
        .then(postsList => {
            // postsList.forEach(doc => {
            //     const data = doc.data();
            //     // let text = data.title + '|' + 
            //     //         data.image + '|' +
            //     //         data.location + '|' +
            //     //         data.description;
                
               return postsList;   
            // })
        })
   
}


app.get('/', (request, response) => {
    response.render('index');
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

app.get('/editpost', (request, response) => {
    response.render('editpost');
});

app.get('/loginoptions', (request, response) => {
    response.render('loginoptions');
});

exports.app = functions.https.onRequest(app)
