document.addEventListener('DOMContentLoaded', event => {
    const app = firebase.app();
    const db = firebase.firestore();
    const posts = db.collection('posts');
    const query = posts.orderBy('title');

    var feed = document.getElementById("feed");
    var post = document.createElement("p");
    
    query.get()
         .then(postsList => {
             postsList.forEach(doc => {
                const data = doc.data();
                let text = data.title + '|' + 
                           data.image + '|' +
                           data.location + '|' +
                           data.description;
                // var info = document.createTextNode(text);
                // post.appendChild(info);
                var post = document.createElement("p");
                post.innerHTML = text;
                feed.appendChild(post);
             })
         })
    
});