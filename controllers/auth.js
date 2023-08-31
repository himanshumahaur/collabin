const user = require('../models/user');
const Detail = require('../models/detail');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'zerefco secret', {
        expiresIn: maxAge,
    });
};

const handelErrors = (err) => {

    console.log(err.message);
    
    let errors = { email: '', password: ''};

    //login errors
    if(err.message === 'Incorrect email') {
        errors.email = 'that email is not registered';
    }
    if(err.message === 'Incorrect password') {
        errors.password = 'that password is incorrect';
    }

    if(err.code === 11000) {
        errors.email = 'that email already exists'
    }

    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors
}

module.exports.get_signup = (req, res) => {
    res.render('signup');
};

module.exports.post_signup = async (req, res) => {
    const { email, password } = req.body;

    try {
        const U = await User.create({ email, password });
        const detail = await Detail.create( { U_id: U._id, money: 0 } );
        const token = createToken(U._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: U.id });
    }
    catch (err) {
        const errors = handelErrors(err);
        res.status(400).json({ errors });
    }
};

module.exports.get_login = (req, res) => {
    res.render('login');
};

module.exports.post_login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const U = await User.login(email, password);
        const token = createToken(U._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: U.id });
    }
    catch (err) {
        const errors = handelErrors(err);
        res.status(400).json({ errors });
    }

};

module.exports.get_logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
};