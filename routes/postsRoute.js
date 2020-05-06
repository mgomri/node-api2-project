const express = require('express');
const router = express.Router();

let posts = [ 
    {
        id: 0,
        title: 'return of the mack',
        contents: 'bla bla bla rant rant rant hehehe'
    },
    {
        id:1,
        title: 'some title',
        contents: 'what the heck is going on over at the nonsense center?'
    },
    {
        id:2,
        title: 'tomatoes',
        contents: 'This season the tomato harvest was at its highest'
    }
];

let postId = posts.length;



router.post('/', (req, res) => {
   
    const newPost = {
       ...req.body,
       id: postId,
       title: req.body.title,
       contents: req.body.contents 
       
    }
    posts.push(newPost);
    res.status(201).json(posts);
});


module.exports = router;