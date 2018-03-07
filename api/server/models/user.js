const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const config = require('./../../config/config');
    let UserSchema = new mongoose.Schema({
    password: {
        type:String,
        required:true,
        minlength:6
    },
    recovery: {
        type:String
    },
    site: {
        name: {
            type:String,
            required: true
        },
        desc: {
            type:String,
        }
    },
    token: {
        type:String
    }
});

UserSchema.methods.toJSON = function() {
    let user = this;
    let userObj = user.toObject();

    return _.pick(userObj, ['_id', 'site']);
};

UserSchema.methods.hashPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

UserSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateAuthToken = function() {
    let user = this;
    const cert = config.private_key;
    const access = 'auth';
    let token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, cert).toString();

    user.token = token;
    return user.save().then(() => {
        return token;
    }).catch(e => {
        return Promise.reject();
    });
};

UserSchema.methods.generateRecovery = function() {
    let user = this;
    let rec = '';
    for(let i = 0; i < 8; i++) {
        rec += Math.round(Math.random() * 9).toString();
    }
    user.recovery = rec;
    return user.save().then(() => {
        return rec;
    }).catch(e => {
        return Promise.reject();
    });
}

UserSchema.methods.removeToken = function(_token) {
    let user = this;
    user.token = null;
    return user;
};

UserSchema.statics.findByToken = function(token) {
    const cert = config.private_key;
    let User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, cert);
    } catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'token': token
    });
};

UserSchema.statics.findByCredentials = function(password, siteid) {
    let User = this;
    return User.findById(siteid).then((user) => {
        if(!user) {
            return Promise.reject();
        }
        if(user._id != siteid) {
            return Promise.reject();
        }
        if(!user.verifyPassword(password)) {
            return Promise.reject();
        }
        return Promise.resolve(user);
    });
};

let User = mongoose.model('User', UserSchema, 'users');
module.exports = { User };