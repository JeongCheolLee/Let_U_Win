const express = require('express');
const router = express.Router();

router.get('/:lane/:mypick/:enemypick', (req, res) => {
  console.log('aa');
});

module.exports = router;
