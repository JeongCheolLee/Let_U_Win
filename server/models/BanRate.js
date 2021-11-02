const mongoose = require('mongoose');

const banRateSchema = mongoose.Schema({});
// 원래 첫번째 인자의 복수형으로 컬렉션 이름을 만드는데, 그게 싫다면 원하는 이름을 세번째 인자에 주도록 하자.
const BanRate = mongoose.model('banRate', banRateSchema, 'banRate');
module.exports = { BanRate };
