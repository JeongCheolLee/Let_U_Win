const { Comment } = require('../models/Comment');
const express = require('express');
const router = express.Router();

//매치 구도에 따른 comments 출력
router.get('/all/:mypick/:enemypick', (req, res) => {
    Comment.find({
        myPick: req.params.mypick,
        enemyPick: req.params.enemypick,
    })
        .sort({ like: -1, dislike: 'asc' })
        .exec((err, result) => {
            if (err) return res.json({ success: false, err });
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
        res.status(200).json({
            success: true,
        });
        console.log('new comment inserted!');
    });
});

//Update like & dislike
router.patch('/rating/like/:objectid', (req, res) => {
    const id = req.params.objectid;
    const changes = req.body;

    Comment.updateOne({ _id: id }, { like: changes.like }, (err) => {
        if (err) {
            return res.json({ success: false, err });
        }
        res.status(200).json({
            success: true,
        });
    });
});

router.patch('/rating/dislike/:objectid', (req, res) => {
    const id = req.params.objectid;
    const changes = req.body;

    Comment.updateOne({ _id: id }, { dislike: changes.dislike }, (err) => {
        if (err) {
            return res.json({ success: false, err });
        }
        res.status(200).json({
            success: true,
        });
    });
});

module.exports = router;
