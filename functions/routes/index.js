var express = require('express');
var router = express.Router();

// Firebase 
const admin = require('firebase-admin');
const config = require('../serviceAcountKey.json');
const { credential } = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(config)
});

const auth = admin.auth();
const db = admin.firestore();
var user = null;


function createUser(email, password) {
    auth.createUser({
        email: 'francois.mukaba@bellevuecollege.edu',
        emailVerified: false,
        phoneNumber: '+14253652943',
        password: 'bonjour',
        // displayName: 'username',
        disabled: false
    }).then(result => {
                user = result.user;
                return true;
    }).catch(
        console.log
        // or a list of error message after validation of user
    )
    return false;
}





router.get('/', (request, response) => {
    response.render('index', { username: ''});
});

router.get('/home', (request, response) => {
    response.render('home');
});

router.get('/feed', (request, response) => {
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

router.get('/newpost', (request, response) => {
    response.render('newpost');
});

router.post('/post', (request, response) => {
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

router.get('/login', (request, response) => {
    response.render('login');
})

router.get('/signup', (request, response) => {
    response.render('signup');
})

router.post('/signup', (request, response) => {
    console.log(request.body);
    var email = request.body.email;
    var password = request.body.password;
    console.log(email);
    console.log(password);
    // if (createUser('','')) {
    //     response.redirect('/home');
    // } 
    var message = "error messages"
    response.render('signup', {message: message });
})

router.post('/login', (request, response) => {
    auth.signInWithEmailAndPassword(request.id1, request.pass)
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




router.get('/editpost', (request, response) => {
    response.render('editpost');
});

router.get('/loginoptions', (request, response) => {
    response.render('loginoptions');
});

module.exports = router;