const Detail = require('../models/detail');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const maxAge = 3 * 24 * 60 * 60;

module.exports.get_profile = ((req, res) => {
    res.render('profile');
})

module.exports.get_editprofile = ((req, res) => {
    res.render('editprofile');
})

module.exports.post_editprofile = ((req, res) => {
    const {fullname, bio, phone} = req.body;
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, 'zerefco secret', async (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.locals.userdetails = null;
            }
            else {
                await Detail.findOneAndUpdate({U_id: decodedToken.id}, {fullname, bio, phone});
                res.redirect('/profile');
            }
        })
    }
    else {
        res.locals.userdetails = null;
    }
})

module.exports.get_home = ((req, res) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, 'zerefco secret', async (err, decodedToken) => {
            let user = await User.findById(decodedToken.id);
            let detail = await Detail.findOne({U_id: decodedToken.id});
            res.locals.user = user;
            res.locals.detail = detail;
        })
    }
    res.render('home')
})