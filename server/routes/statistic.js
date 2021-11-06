const { WinRate } = require('../models/WinRate');
const { BanRate } = require('../models/BanRate');
const { Match } = require('../models/Match');
const express = require('express');
const router = express.Router();

router.get('/winrate/:id/:lane', (req, res) => {
  // findOne이 좀 찝찝하긴 한데, 절대 하나밖에 없다는 가정 on
  WinRate.findOne({ id: req.params.id })
    .select(req.params.lane)
    .exec((err, data) => {
      if (err) return res.json({ success: false, err });
      console.log(data);
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
  WinRate.findOne({ id: req.params.id })
    .select(req.params.lane)
    .exec((err, data) => {
      if (err) return res.json({ success: false, err });
      // 픽률 넣기

      // Match.countDocuments((err, data1) => {
      //   if (err) return res.json({ success: false, err });
      //   console.log(data.get(req.params.lane).play);
      //   console.log(data1);
      // });

      // console.log(data);
      // res.status(200).json({
      //   success: true,
      //   playCount: data.get(req.params.lane).play,
      // });
    });
});

router.get('/banrate/:id', (req, res) => {
  BanRate.findOne({ id: req.params.id })
    .select(req.params.id)
    .exec((err, data) => {
      if (err) return res.json({ success: false, err });
      console.log(data);
      res.status(200).json({
        success: true,
        championName: req.params.id,
        banRate: data.get(req.params.id),
      });
    });
});

module.exports = router;
