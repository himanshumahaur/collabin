const mongoose = require('mongoose');

const detailSchema = new mongoose.Schema({
    U_id: {
        type: String
    },
    fullname: {
        type: String
    },
    bio: {
        type: String
    },
    phone: {
        type: String
    },
    money: {
        type: Number
    }
});

const Detail = mongoose.model('detail', detailSchema);

module.exports = Detail;