const Job = require('../models/job');

const genJobs = async (req, res, next) => {

    let job = await Job.find();
    res.locals.job = job;
    next();
}

module.exports = { genJobs };