const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
const config = require('./../../config/config');

let { User } = require('./../../server/models/user');

const userIdOne = new ObjectID();
const userIdTwo = new ObjectID();
const users = [{
    _id: userIdOne,
    email: 'mail@mail.com',
    password: 'smaplepassword123',
    site: {
        name: 'Site Sample',
        desc: 'lorem...'
    },
    token: jwt.sign({_id: userIdOne, access: 'auth'}, config.private_key).toString()
},
{
    _id: userIdTwo,
    email: 'mail2@mail.com',
    password: 'smaplepassword123',
    site: {
        name: 'Site Sample Two',
        desc: 'lorem...'
    },
}];

const populateUsers = (done => {
    User.remove().then(() => {
        let userOne = new User(users[0]).save();
        let userTwo = new User(users[1]).save();
        return Promise.all([userOne, userTwo])
    }).then(() => {
        done();
    });
});

module.exports = { users, populateUsers };