const { PerksMiddle } = require('../models/PerksLane');
const express = require('express');
const router = express.Router();

function FirstCharUpper(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// rune/~
router.get('/:lane/:mypick/:enemypick', (req, res) => {
    myPick = FirstCharUpper(req.params.mypick);
    enemyPick = FirstCharUpper(req.params.enemypick);
    PerksMiddle.find({
        [myPick]: { $exists: true },
    }).exec((err, result) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({
            result,
        });
    });
});

module.exports = router;
