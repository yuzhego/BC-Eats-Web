function signup() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password1').value;
    if (validateEmail(email)) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function() {
            var user = firebase.auth().currentUser;
            user.sendEmailVerification()
            .then(function() {
                window.location.href = "/login";
            })
            .catch(function(error) {
                alert(error.message);
                console.log(error);
            });
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        })
    }
}

function login() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 4) {
        alert('Please enter an email address.');
        return;
    }
    if (password.length < 4) {
        alert('Please enter a password.');
        return;
    }
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function () {
        console.log(firebase.auth().currentUser);
        if (firebase.auth().currentUser.emailVerified) {
            // POST to /home with user UID

            // console.log(firebase.auth().currentUser.uid);
            // window.location.href = "/home";
            // var xhr = new XMLHttpRequest();
            // xhr.open("POST", "/login", true);
            // xhr.setRequestHeader('Content-Type', 'application/json');
            // xhr.send({uid: firebase.auth().currentUser.uid});

            $.post(
                '/login', 
                {uid: firebase.auth().currentUser.uid},
                function() {
                })
                .done(function() {
                    window.location.href = '/';
                });
           
        } else {
            alert("Please verify your email");
        }
    })
    .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
    });
}

function logout() {
    if (firebase.auth().currentUser) {
        firebase.auth().signOut();
    }
}

function validateEmail(inputEmail) {
    var mailformat = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@bellevuecollege.edu?/;
    if(inputEmail.match(mailformat)) {
        return true;
    } else {
        alert("You have entered an invalid email address!");
        return false;
    }
}