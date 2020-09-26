// TODO: check password2 == password1
function signup() {
    var messages = document.getElementById('signup-errors');
    var email = document.getElementById('email').value;
    var password1 = document.getElementById('password1').value;
    var password2 = document.getElementById('password2').value;
    $.post(
        '/signup', 
        {email: email, password1: password1, password2: password2},
        function() {
        }) 
        .done(function(response) {
            // console.log("done");
            // console.log(response);
            if (response == "OK") {
                window.location.href = '/login';
            }
            else if (response.messages.length > 0 ) {
                console.log(response);
                messages.innerHTML = "";
                response.messages.forEach(message => {
                    var li = document.createElement('li');
                    li.innerText = message;
                    messages.appendChild(li);
               });
            }
        })
        .catch(function() {
            console.log("Errors");
            window.location.reload();
        });
}

function login() {
    var messages = document.getElementById('login-errors'); 
    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;
    if (email.length < 4) {
        var li = document.createElement('li');
        li.innerText = "Please enter a proper email address.";
        messages.appendChild(li);
        return;
    }
    if (password.length < 6) {
        var li = document.createElement('li');
        li.innerText = "Please enter a proper password.";
        messages.appendChild(li);
        return;
    }
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function () {
        console.log(firebase.auth().currentUser);
        // TODO: Will need to be done server side to prevent access to non-verified users
        if (firebase.auth().currentUser.emailVerified) {
            // POST to /home with user UID
            $.post(
                '/login', 
                {uid: firebase.auth().currentUser.uid},
                function() {
                })
                .done(function() {
                    window.location.href = '/';
                });
        } else {
            messages.innerHTML = "";
            var li = document.createElement('li');
            li.innerText = "Please verify your email";
            messages.appendChild(li);
        }
    })
    .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
            messages.innerHTML = "";
            var li = document.createElement('li');
            li.innerText = "Incorrect email or password.";
            messages.appendChild(li);
        } else {
            messages.innerHTML = "";
            var li = document.createElement('li');
            li.innerText = errorMessage;
            messages.appendChild(li);
        }
        console.log(error);
    });
}

function logout() {
    if (firebase.auth().currentUser) {
        firebase.auth().signOut();
    }
}

function passwordReset() {
    var messages = document.getElementById('login-errors'); 
    var email = document.getElementById('loginEmail').value;
    firebase.auth().sendPasswordResetEmail(email)
    .then(function() {
        alert("Email has been sent to reset password");
        // pop up box // not an error message // green check
    })
    .catch(function(error) {
        messages.innerHTML = "";
        var li = document.createElement('li');
        li.innerText = "The address is not a verified email or is not associated with an account";
        messages.appendChild(li);
        console.log(error);
    })
}