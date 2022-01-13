const express = require('express');
const router = express.Router();

const version = 1;

//routes
var statisticRouter = require('./statistic');
var championsRouter = require('./champions');
var runeRouter = require('./rune');
var commentRouter = require('./comments');

router.use(`/v${version}/champions`, championsRouter);
router.use(`/v${version}/statistic`, statisticRouter);
router.use(`/v${version}/rune`, runeRouter);
router.use(`/v${version}/comments`, commentRouter);

module.exports = router;
