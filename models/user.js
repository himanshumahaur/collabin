const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        validate: [ validator.isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        minlength: [6, 'Minimum password length is 6 characters']
    }
});

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });

    if(user) {
        if(user.password===password) {
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error('Incorrect email');
}

const user = mongoose.model('user', userSchema);

module.exports = user;