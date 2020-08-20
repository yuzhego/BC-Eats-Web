// Express
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.json());

// Firebase 
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const config = require('./serviceAcountKey.json');
const { credential } = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(config)
});


const auth = admin.auth();
const db = admin.firestore();
var user = null;


function createUser(email, password) {
    auth.createUser({
        email: email,
        emailVerified: false,
        // phoneNumber: '+14253652945',
        password: password,
        // displayName: 'username',
        disabled: false
    }).then(result => {
                user = result.user;
                return true;
    }).catch(
        console.log()
        // or a list of error message after validation of user
    )
    return false;
}

app.get('/', (request, response) => {
    response.render('index', { username: 'Temp'});
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
    response.render('login');
})

app.get('/signup', (request, response) => {
    response.render('signup');
})

app.post('/signup', (request, response) => {
    console.log(request.body);
    var email = request.body.email;
    var password = request.body.password;
    if (createUser(email,password)) {
        response.redirect('/home');
    } 
    var message = "error messages"
    response.render('signup', {message: message });
})

app.post('/login', (request, response) => {
    auth.signInWithEmailAndPassword(request.id1, request.pass)
        .then(result => {
            user = result.user;
            console.log('Hello ${user.displayName}');
        })
        .catch(console.log)
    response.redirect('/home');
})


app.get('/editpost', (request, response) => {
    response.render('editpost');
});

app.get('/loginoptions', (request, response) => {
    response.render('loginoptions');
});

exports.app = functions.https.onRequest(app)
