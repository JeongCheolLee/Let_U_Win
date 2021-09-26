const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    age: {
        type: Number,
    }
})
const Test = mongoose.model('Test', testSchema);
module.exports = { Test };