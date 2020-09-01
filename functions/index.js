// Express
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Firebase 
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const config = require('./serviceAcountKey.json');
const { credential } = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(config),
    databaseURL : "https://bc-eats-b0c89.firebaseio.com/"
});
const auth = admin.auth();
const db = admin.firestore();
const database = admin.database();
var misc_next_id = 0;

var currentUser = null;

app.get('/', (request, response) => {
    if(currentUser) {
        response.redirect('/home');
    } else {
        response.redirect('/login');
    }
});

app.get('/home', (request, response) => {
    if (currentUser) {
        response.render('home');
    } else {
        response.redirect('/login');
    }
});

app.get('/feed', (request, response) => {
    if(currentUser) {
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
            });
        // database.ref('/misc').update({ 
        //     next_post_id : 1
        // });
    } else {
        response.redirect('/login');
    }
});

app.get('/newpost', (request, response) => {
    if(currentUser) {
        response.render('newpost');
    } else {
        response.redirect('/login');
    }
});

app.post('/post', (request, response) => {
    if(currentUser) {
        var obj = request.body;
        // console.log(obj);
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
    }  else {
        response.redirect('/login');
    }
})

app.get('/login', (request, response) => {
    if(currentUser) {
        response.redirect('/home');
    } else {
        response.render('login');
    }
})

app.post('/login', (request, response) => {
    var uid = request.body.uid;
    // console.log(uid);
    auth.getUser(uid)
        .then(user => {
            console.log(user);
            currentUser = user;
            response.sendStatus(200);
        })
        .catch(err => {
            console.log(err);
            response.sendStatus(400);        
        });
    // console.log(currentUser);
    // response.sendStatus(200);
})

app.get('/signup', (request, response) => {
    response.render('signup');
})

app.post('/signup', (request, response) => {
    // TODO
    response.sendstatus(200);
})

app.get('/editpost', (request, response) => {
    if(currentUser) {
        response.render('editpost');
    } else {
        response.redirect('/login');
    }
});

app.get('/loginoptions', (request, response) => {
    if(currentUser) {
        response.render('loginoptions');
    } else {
        response.redirect('/login');
    }
});

app.get('/logout', (request, response) => {
    currentUser = null;
    response.redirect('/login');
});

exports.app = functions.https.onRequest(app)