const mongoose = require('mongoose');

const winRateSchema = mongoose.Schema({
  id: {
    type: String,
    maxlength: 50,
    index: true,
  },
  total: {
    type: Object,
  },
  top: {
    type: Object,
  },
  jungle: {
    type: Object,
  },
  middle: {
    type: Object,
  },
  bottom: {
    type: Object,
  },
  utility: {
    type: Object,
  },
});
// 원래 첫번째 인자의 복수형으로 컬렉션 이름을 만드는데, 그게 싫다면 원하는 이름을 세번째 인자에 주도록 하자.
const WinRate = mongoose.model('winRate', winRateSchema, 'winRate');
module.exports = { WinRate };
