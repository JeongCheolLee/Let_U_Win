const { Comment } = require('../models/Comment');
const express = require('express');
const router = express.Router();

//매치 구도에 따른 comments 출력
router.get('/all/:myPick/:enemyPick', (req, res) => {
    Comment.find({
        myPick: req.params.myPick,
        enemyPick: req.params.enemyPick,
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

// 모델이름.update(
//     {조건필드이름:그값},
//     {$set: {바꿀필드이름:바꾼후값}, ... },
//     에러처리콜백함수
//   )

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

// app.patch('/api/user/update/:user_id', (req, res) => {
//     const { user_id } = req.params;
//     const { name } = req.body;
//     //map 함수는 자바스크립트에서 배열 함수이다. 요소를 일괄적으로 변경할 때 사용됩니다.
//     const user = users.map((data) => {
//         if (data.id == user_id) data.name = name;
//         return { id: data.id, name: data.name };
//     });
//     res.json({ ok: true, users: user });
// });

// app.patch('/squares/:x/:y/paint', (req, res, next) => {
//     const x = req.params.x;
//     const y = req.params.y;
//     const changes = req.body;
//     const originalInformation =
//         bancoDeDados.retrieveOriginalInformationInMatrix(x, y);
//     // originalInformation will be {"x": 1, "y": 2, "painted": false }
//     let modifiedInformation = originalInformation;
//     if (changes.painted !== undefined) {
//         modifiedInformation.data.painted = true; // Updates new information with desired changes
//     }
//     // Other possible changes like changes.x or changes.y
//     res.send(modifiedInformation); // Returns modified information back to user
// });

module.exports = router;
