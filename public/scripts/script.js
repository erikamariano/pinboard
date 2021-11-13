//To guarantee that the updatePosts function will be called only when the page is loaded.
document.addEventListener('DOMContentLoaded', () => {
    updatePosts();
})

function updatePosts(){
    
    //Calling the backend: 
    let promise = fetch('http://localhost:3000/api/all').then(res => { return res.json() })
    
    promise.then(posts => { 
        console.log(posts) 
    
        let postElements = "";

        //If the 'posts' variable was stringfied, it would have to be transformed in an object (JSON.parse)
        //With the object, we can loop through it.
        let postsList = JSON.parse(posts);

        postsList.forEach(post => {
                        
            //A structure of div's was created on HTML, but then it was copied here.
            //It will be created by script
            let postElem = `<div class="card mb-4" id="${post.id}">
                
                <div class="card-header">
                    <h5 class="card-title">${post.title}</h5>
                </div>

                <div class="card-body">
                    <div class="card-text">${post.description}</div>
                    <button type="button" class="btn btn-danger btn-sm" onclick="deletePost(${post.id})">Delete</button>                   
                </div>
            </div>`;

            postElements += postElem;

            document.getElementById('posts').innerHTML = postElements;
        });   
    });
}

function newPost(){
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;

    let post = {title: title, description: description};

    //Calling the backend:
    const options = {method: 'POST',
                    //to let the server know that the request will be a JSON:
                    headers: new Headers({'Content-type': 'application/json'}),
                    body: JSON.stringify(post)
                    }

    fetch('http://localhost:3000/api/new', options).then(res => console.log(res))
    updatePosts();

    //let input field empty after saving new post:
    document.getElementById('title').value = "";
    document.getElementById('description').value = "";
}

function deletePost(idPost){

    idPost = idPost.id;

    console.log("this is the result of the getElement = " + idPost);

    let parent = document.getElementById('posts');
    let child = document.getElementById(`${idPost}`);
    //this is needed for the last element. If the DB had only one post, it would not be removed from the HTML.
    child = parent.removeChild(child);

    //Calling the backend:
    const options = {method: 'DELETE',
                    headers: new Headers({'Content-type': 'application/json'}),
                    body: JSON.stringify({id: idPost})
                    }

    let promise = fetch('http://localhost:3000/api/delete', options).then(res => console.log(res))
    promise.then(() => updatePosts());

}