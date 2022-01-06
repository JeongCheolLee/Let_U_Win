const { PerksMiddle } = require('../models/PerksLane');
const express = require('express');
const router = express.Router();

function FirstCharUpper(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// User.find({[schedule.${day}]: {$exists: true}}, (err, users) => { console.log(users) })
// rune/~
router.get('/:lane/:mypick/:enemypick', (req, res) => {
    myPick = FirstCharUpper(req.params.mypick);
    enemyPick = FirstCharUpper(req.params.enemypick);
    PerksMiddle.find()
        .select({
            'Leblanc.Lissandra': true,
            'Leblanc.Lissandra.win': true,
            'Leblanc.Lissandra.cnt': true,
            _id: false,
        })
        .exec((err, result) => {
            if (err) return res.json({ success: false, err });
            console.log(Object.keys(result[0]));
            res.status(200).json({
                result,
            });
        });
});
//router.get('/:my')

module.exports = router;
