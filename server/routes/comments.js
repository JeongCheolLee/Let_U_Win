const { Comment } = require('../models/Comment');
const express = require('express');
const router = express.Router();

//매치 구도에 따른 comments 출력
router.get('/all/:myChamp/:enemyChamp', (req, res) => {
    Comment.find({
        myPick: req.params.myPick,
        enemyPick: req.params.enemyPick,
    }).exec((err, result) => {
        if (err) return res.json({ success: false, err });
        console.log('comments router test');
        res.status(200).json({
            success: true,
            list: result,
        });
    });
});

// create new comment
router.post('/', (req, res) => {
    var newComment = new Comment({
        myPick: req.body.myPick,
        enemyPick: req.body.enemyPick,
        name: req.body.name,
        comment: req.body.comment,
        time: String(new Date()),
        like: 0,
        dislike: 0,
    });

    newComment.save((err, comm) => {
        if (err) {
            console.log(err);
        }
        console.log('new comment inserted!');
    });
});

module.exports = router;
