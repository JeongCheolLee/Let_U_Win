const mongoose = require('mongoose');

const championSchema = mongoose.Schema({
    //스키마에 정의하지 않은 property는 query에서 field?로 조회할 수 없음
    id: {
        type: String
    },
    name: {
        type: String
    },
    info: {
        type: Object,
    },
    image: {
        type: Object,
    },
    tag: {
        type: Object
    }
})
const Champion = mongoose.model('Champion', championSchema);
module.exports = { Champion };