const { WinRate } = require('../models/WinRate');
const express = require('express');
const router = express.Router();

router.get('/winrate/:id', (req, res) => {
  WinRate.findOne({ id: req.params.id })
    .select('total')
    .exec((err, data) => {
      if (err) return res.json({ success: false, err });
      console.log(data);
      res.status(200).json({
        success: true,
        winRate: data.total.winRate,
      });
    });
});

module.exports = router;
