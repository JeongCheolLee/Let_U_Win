const mongoose = require('mongoose');

const matchSchema = mongoose.Schema({});
const Match = mongoose.model('Match', matchSchema, 'match');
module.exports = { Match };
