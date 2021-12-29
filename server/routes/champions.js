const { Champion } = require('../models/Champion');
const express = require('express');
const router = express.Router();

router.get('/all', (req, res) => {
    // qeury로 조회, 찾을 field, 연산자 모두 문자열 형식으로 입력해야됨
    Champion.find((err, docs) => {
        if (err) return res.json({ success: false, err });
        console.log(docs.length);
        res.status(200).json({
            success: true,
            list: docs,
        });
    });
});

module.exports = router;
