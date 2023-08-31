const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Detail = require('../models/detail');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, 'zerefco secret', (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.redirect('/login');
            }
            else {
                console.log(decodedToken);
                next();
            }
        })
    }
    else {
        res.redirect('/login');
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, 'zerefco secret', async (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            }
            else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                let detail = await Detail.findOne({U_id: user.id})
                res.locals.user = user;
                res.locals.detail = detail;
                console.log(detail.bio);
                next();
            }
        })
    }
    else {
        res.locals.user = null;
        next()
    }
}

module.exports = { requireAuth, checkUser };