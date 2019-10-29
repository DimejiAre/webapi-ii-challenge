const express = require('express');
const db = require('./data/db');

const router = express.Router()

router.get('/', (req,res) => {
    db.find()
        .then(posts => {
            if(posts){
                res.status(200).json(posts)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(()=>{
            res.status(500).json({
                error: "The post information could not be retrieved."
            })
        })
})

router.post('/', (req,res) => {
    const post = req.body
    if(post.title && post.contents){
        db.insert(post)
            .then(data => {
                db.findById(data.id).then(createdUser => {
                    res.status(201).json(createdUser[0])
                })
            })
            .catch(() => {
                res.status(500).json({
                    error: "There was an error while saving the post to the database"
                })
            })
    } else {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    }
})

module.exports = router;