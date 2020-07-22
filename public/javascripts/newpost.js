document.addEventListener('DOMContentLoaded', event => {
    // const app = firebase.app();
    // const db = firebase.firestore();
    // const posts = db.collection('posts').doc('firstpost');
    // var feed = document.getElementById("feed");
    // var post = document.createElement("p");
    
    // posts.onSnapshot(doc => {
    //         const data = doc.data();
    //         let text = data.title + '|' + 
    //                    data.image + '|' +
    //                    data.description;
    //         // var info = document.createTextNode(text);
    //         // post.appendChild(info);
    //         post.innerHTML = text;
    //      })

    // feed.appendChild(post);
    
});

function sendPost(e) {
    // document.write(e.target.value)
    // var title = document.getElementById('title').value;
    // var description = document.getElementById('description').value;
    // document.write(title + description);
    const db = firebase.firestore();
    const post = db.collection('posts').add({
        title: document.getElementById('title').value,
        image: 'image here',
        location: document.getElementById('location').value,
        description: document.getElementById('description').value
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}