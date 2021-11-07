const { WinRate } = require('../models/WinRate');
const { BanRate } = require('../models/BanRate');
const express = require('express');
const router = express.Router();

// match 수 하드코딩
const matchCount = 194020;

router.get('/winrate/:id/:lane', (req, res) => {
  // findOne이 좀 찝찝하긴 한데, 절대 하나밖에 없다는 가정 on
  WinRate.findOne({ id: req.params.id })
    .select(req.params.lane)
    .exec((err, data) => {
      if (err) return res.json({ success: false, err });
      // console.log(data);
      res.status(200).json({
        success: true,
        championName: req.params.id,
        lane: req.params.lane,
        winRate: data.get(req.params.lane).winRate,
      });
    });
});

router.get('/pickrate/:id/:lane', (req, res) => {
  // lane play / match
  WinRate.findOne({ id: req.params.id }).exec((err, data) => {
    if (err) return res.json({ success: false, err });
    // console.log(data);
    let totalPickRate = data.get('total').play / matchCount;
    let lanePickRate = data.get(req.params.lane).play / matchCount;
    res.status(200).json({
      success: true,
      championName: req.params.id,
      lane: req.params.lane,
      totalPickRate: totalPickRate,
      lanePickRate: lanePickRate,
    });
  });
});

router.get('/banrate/:id', (req, res) => {
  BanRate.findOne({ id: req.params.id })
    .select(req.params.id)
    .exec((err, data) => {
      if (err) return res.json({ success: false, err });
      // console.log(data);
      res.status(200).json({
        success: true,
        championName: req.params.id,
        banRate: data.get(req.params.id),
      });
    });
});

module.exports = router;
