//it's important to create a file for the routes, in order to avoid matches of routes.

const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const posts = require('../model/posts');

router.get('/all', (req, res) => {
    //since 'posts' is an object from the file './model/posts', its functions can be called here.
    res.json(JSON.stringify(posts.getAll()));
})

router.post('/new', bodyparser.json(), (req, res) => {

    //o bodyparser.json acts as a middleware, it interprets the body
    let title = req.body.title;
    let description = req.body.description;

    //since 'posts' is an object from the file './model/posts', its functions can be called here.
    posts.newPost(title, description);

    console.log('Post made with success!');
})

router.delete('/delete', bodyparser.json(), (req,res) => {
    
    let id = req.body.id;
    console.log(id)

    posts.del(id);

    console.log('Post deleted with success!');
})

module.exports = router;