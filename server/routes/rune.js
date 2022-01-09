// const { PerksMiddle } = require('../models/PerksLane');
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

// rune/~
router.get('/:lane/:mypick/:enemypick', (req, res) => {
    const PerksModel = laneClassify(req.params.lane);
    const myPick = FirstCharUpperCase(req.params.mypick);
    const enemyPick = FirstCharUpperCase(req.params.enemypick);

    const pipe1Match = { $match: { [myPick]: { $exists: true } } };
    const pipe2Unwind = { $unwind: `$${myPick}` };
    const pipe3Match = {
        $match: { [[myPick, enemyPick].join('.')]: { $exists: true } },
    };

    const pipe4Sort = {
        $sort: { [[myPick, enemyPick, 'cnt'].join('.')]: -1 },
    };
    const pipe5Limit = {
        $limit: 1,
    };
    const pipe6Group = {
        $group: {
            _id: '$_id',
            [myPick]: { $push: `$${[myPick, enemyPick].join('.')}` },
        },
    };

    // console.log(pipe1Match);
    // console.log(pipe2Unwind);
    // console.log(pipe3Match);
    // console.log(pipe4Sort);
    // console.log(pipe5Limit);
    // console.log(pipe6Group);

    PerksModel.aggregate([
        pipe1Match,
        pipe2Unwind,
        pipe3Match,
        pipe4Sort,
        pipe5Limit,
        // pipe6Group,
    ]).exec((err, docs) => {
        if (err) return res.json({ success: false, err });
        const data = docs[0][myPick][enemyPick];
        const perkStyles = [];
        const perkActivation = [[], []];
        const win = data.win;
        const cnt = data.cnt;
        const { offense, flex, defense } = data.perks.statPerks;
        const perkStat = [offense, flex, defense];
        data.perks.styles.forEach((e) => {
            if (e.description === 'primaryStyle') {
                perkStyles[0] = e.style;
                for (perk of e.selections) {
                    perkActivation[0].push(perk.perk);
                }
            } else {
                perkStyles[1] = e.style;
                for (perk of e.selections) {
                    perkActivation[1].push(perk.perk);
                }
            }
        });
        return res.status(200).json({
            success: true,
            perkStyles: perkStyles,
            perkActivation: perkActivation,
            perkStat: perkStat,
            win: win,
            cnt: cnt,
        });
    });
});

module.exports = router;
