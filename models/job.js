const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    U_id: {
        type: String
    },
    title: {
        type: String
    },
    detail: {
        type: String
    },
    reward: {
        type: Number
    }
});

const Job = mongoose.model('job', jobSchema);

module.exports = Job;