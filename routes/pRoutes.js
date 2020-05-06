const express = require('express');
const router = express.Router();
const posts = require('../data/db');


//POST new post
router.post('/', (req, res) => {
    if(!req.body.title || !req.body.contents){
        res.status(400).json({
            errorMessage: 'Please provide title and contents for the post.'
        })
    };
    posts
    .insert(req.body)
    .then(p => {
        res.status(201).json(p);
    })
    .catch(err => {
        res.status(500).json({
            error: 'There was an error while saving the post to the database.'
        });
    });
});

router.post('/api/posts/:id/comments', (req, res) => {
    
    
    if (req.body.text) {
        
        posts.findById(req.params.id)
            .then(targetPost => {
               
                posts.insertComment({ text: req.body.text, post_id: targetPost[0].id })
                    .then(comm => {
                        
                        posts.findCommentById(comm.id)
                            .then(newComment => {
                                res.status(201).json(newComment)
                            })
                            .catch(error => alert(error))
                    })
                    .catch(() => {
                        res.status(500).json({ error: "There was an error while saving the comment to the database" })
                    })
            })
        }
    });


//GET posts
router.get('/api/posts', (req, res) => {
    posts
    .find(req.query)
    .then(p => {
        res.status(200).json(p);        
    })
    .catch(err => {
        res.status(500).json({
            error: 'The posts information could not be retrieved.'
        });
    });
});

router.get('/api/posts/:id', (req, res) => {
    posts
    .findById(req.params.id)
    .then(pst => {
        if(pst){
            res.status(200).json(pst);
        }else{
            res.status(404).json({
                message:'The post with the specified ID does not exist.'
            });
        };
    })
    .catch(err => {
        res.status(500).json({
            error: 'The post information could not be retrieved.'
        });
    })
});


//Delete
router.delete('/api/posts/:id', (req, res) => {
    
    posts
    .remove(req.params.id)
    .then(pst => {
        if(!pst){
            res.status(404).json({
                message:'The post with the specified ID does not exist.'
            });
        }else{
            res.status(200).json(pst)
        };
    })
    .catch(err => {
        res.status(500).json({
            error: "The post could not be removed." 
        });
    });
});

//PUT
router.put('/api/posts/:id', (req, res) => {
    posts
    .update(req.params.id, req.body)
    .then(pst => {
        if(!pst){
            res.status(404).json({
                message:'The post with the specified ID does not exist.'
            });
        }else if(!req.body.title || !req.body.contents) {
            res.status(400).json({
                errorMessage: 'Please provide title and contents for the post.'
            });
        }else{
            res.status(200).json(pst);
        };
    })
    .catch(err =>{
       res.status(500).json({
        error: 'The post information could not be modified.' 
       }); 
    });
});

module.exports = router;