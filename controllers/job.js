const User = require('../models/user');
const Detail = require('../models/detail');
const jwt = require('jsonwebtoken');
const Job = require('../models/job');
const { render } = require('ejs');
const { findById } = require('../models/user');
const { findByIdAndUpdate } = require('../models/detail');


module.exports.get_jobs = (req, res) => {
    res.render('jobs');
};

module.exports.post_jobs = async (req, res) => {
    const { id, action } = req.body;
    let cost = 0;

    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, 'zerefco secret', async (err, decodedToken) => {
            let detail = await Detail.findOne({U_id: decodedToken.id})
            let cost = detail.money;

            try {
                if (action) {
                    const job = await Job.findById(id);
                    await Detail.findByIdAndUpdate(detail.id, {money: cost+job.reward});
                    await Job.findByIdAndDelete(id);
                    render('job');
                }
                else {
                    const job = await Job.findById(id);
                    await Detail.findByIdAndUpdate(detail.id, {money: cost+job.reward});
                    await Job.findByIdAndDelete(id);
                    render('job');
                }
            }
            catch (err) {
                console.log(err);
            }
        })
    }

    res.redirect('/jobs')
}

module.exports.get_post = (req, res) => {
    res.render('post');
};

module.exports.post_post = (req, res) => {
    const {title, detail, reward} = req.body;
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, 'zerefco secret', async (err, decodedToken) => {
            if(err) {
                console.log(err.message);
            }
            else {
                let details = await Detail.findOne({U_id: decodedToken.id})
                let cost = details.money;
                await Detail.findByIdAndUpdate(details.id, {money: cost-reward});
                await Job.create({U_id: decodedToken.id, title, detail, reward});
            }
        })
    }
    else {
        console.log('err decoding token');
    }

    res.redirect('/')
};

module.exports.get_jobs_ = async (req, res) => {
    let id = req.url.split('/')[2];
    let job = req.url.split('/')[3];
    console.log(id);
    console.log(job);
    let user = await User.findById(id);
    let detail = await Detail.findOne({U_id: id});
    res.locals.user2 = user;
    res.locals.detail = detail;
    res.locals.job_id = job;
    res.render('jobdetails');
};