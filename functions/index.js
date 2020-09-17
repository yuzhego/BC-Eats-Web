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
// var misc_next_id = 0;
var currentUser = null;

function validateEmail(inputEmail) {
    var mailformat = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@bellevuecollege.edu?/;
    if(inputEmail.match(mailformat)) {
        return true;
    } 
    return false;
}

function isEmailUnique(inputEmail) {
    var user = null;
    auth.getUserByEmail(inputEmail)
    .then(function(record){
        user = record;
        return user == null
    })
    .catch(function(error){
        return user == null
    })
}

function validatePassword(password) {
    if(password.length >= 6) {
        return true;
    }
    return false;
}




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
        const posts = database.ref('posts');
        posts.orderByChild('until').on('value', function(snapshot) {
            response.render('feed', { posts: snapshot.val(), user: currentUser });
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
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
        const post = database.ref('posts').push({
            title: obj.title,
            image: "image.jpg",
            location: obj.location,
            description: obj.description,
            uid: currentUser.uid,
            until: "n/a"
        })
        .then(function(ref) {
            console.log("Post written with ID: ", ref.id);
        })
        .catch(function(error) {
            console.error("Error adding post: ", error);
        });
        response.redirect('/feed');
    } else {
        response.redirect('/login');
    }
})

app.post('/deletepost', (request, response) => {
    if(currentUser) {
        var obj = request.body;
        console.log('posts/' + obj);
        const post = database.ref('posts/' + obj).remove()
        .then(function() {
            console.log("Post deleted");
        })
        .catch(function(error) {
            console.error("Error adding post: ", error);
        });
        response.sendstatus(200);
    } else {
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
    var errors = [];
    var email = request.body.email;
    var password1 = request.body.password1;
    var password2 = request.body.password2;
    var validEmail = validateEmail(email);
    var uniqueEmail = isEmailUnique(email);
    var confirmedPassword = password1 == password2;
    var validPassword = validatePassword(password1);

    if (validEmail && confirmedPassword && validPassword && uniqueEmail) {
        auth.createUser({
            email: email,
            emailVerified: false,
            password: password1,
            // displayName: username,
            // photoURL: 'http://www.example.com/12345678/photo.png',
            disabled: false
        })
        .then(function(userRecord) {
            console.log('Successfully created new user:', userRecord.uid);
            auth.generateEmailVerificationLink(email)
            .then(function(link) {
                // Send link through custom SMTP
                console.log(link)
            });     
        })
        .catch(function(error) {
            console.log(errors);
            console.log('Error creating new user:', error);
        });

    } else {

        if (!validEmail) {
            errors.push("Invalid bellevue college email.");
        }

        if (!confirmedPassword) {
            errors.push("Password fields do not match.");
        }

        if (!validPassword) {
            errors.push("Password must be at least 6 characters.") 
        }

        if (!uniqueEmail) {
            errors.push("A user with this email already exists.") 
        }
    }

    // if errors send list of errors
    if (errors.length > 0) {
        response.send({messages : errors});
    } else {
        response.sendStatus(200);
    }
})

app.get('/editpost', (request, response) => {
    if(currentUser) {
        response.render('editpost');
    } else {
        response.redirect('/login');
    }
});

app.get('/editpost/:pid', (request, response) => {
    if(currentUser) {
        const post = database.ref('posts/' + request.params.pid);
        post.on('value', function(snapshot) {
            response.render('editpost', { post: snapshot.val(), pid: request.params.pid });
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    } else {
        response.redirect('/login');
    }
});

app.post('/editpost', (request, response) => {
    if(currentUser) {
        var obj = request.body;
        const post = database.ref('posts/' + obj.pid).set({
            title: obj.title,
            image: "image.jpg",
            location: obj.location,
            description: obj.description,
            uid: currentUser.uid,
            until: "n/a"
        })
        .then(function() {
            console.log("Post edited");
        })
        .catch(function(error) {
            console.error("Error editing post: ", error);
        });
        response.redirect('/feed');
    } else {
        response.redirect('/login');
    }
})

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