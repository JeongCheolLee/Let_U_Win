const express = require('express');
const router = express.Router();
const {
    PerksTop,
    PerksJungle,
    PerksMiddle,
    PerksBottom,
    PerksUtility,
} = require('../models/PerksLane');

const laneClassify = (lane) => {
    switch (lane) {
        case 'top':
            return PerksTop;
        case 'jungle':
            return PerksJungle;
        case 'middle':
            return PerksMiddle;
        case 'bottom':
            return PerksBottom;
        case 'utility':
            return PerksUtility;
    }
};

const FirstCharUpperCase = (str) => {
    return str[0].toUpperCase() + str.slice(1);
};

router.get('/:lane/:mypick/:enemypick', (req, res) => {
    const PerksModel = laneClassify(req.params.lane);
    const myPick = FirstCharUpperCase(req.params.mypick);
    const enemyPick = FirstCharUpperCase(req.params.enemypick);

    // const findObjectLiteral = {};

    // findObjectLiteral[[myPick]] = { $exists: true };

    // const findObjectLiteral = { [myPick]: { $exists: true } };
    // console.log(findObjectLiteral);

    PerksModel.find({ [myPick]: { $exists: true } }).exec((err, docs) => {
        if (err) return res.json({ success: false, err });
        console.log(docs.length);
        // console.log(docs);
        return res.status(200).json({ success: true });
    });

    // res.status(200).send('success');
});

module.exports = router;
