const { Page } = require('./../../server/models/page');
const { ObjectID } = require('mongodb');
const config = require('./../../config/config');
const jwt = require('jsonwebtoken');

const pageOneID = new ObjectID();
const pageTwoID = new ObjectID();
const pageThreeID = new ObjectID();

const { users } = require('./users');
const siteId = users[0]._id;

let token = jwt.sign({_id: siteId, access: 'auth'}, config.private_key).toString();

const pages = [
    {
        _id: pageOneID,
        siteid: siteId,
        name: 'Sample Page One',
        posts: [
            {
                title: 'Sample Title One',
                text: 'Some Text...',
                template: 'fullTxtTitle'
            },
            {
                title: 'Sample Title Two',
                text: 'Some Text...',
                template: 'fullTxtTitle'
            }
        ]
    },
    {
        _id: pageTwoID,
        siteid: siteId,
        name: 'Sample Page Two',
        posts: [
            {
                title: 'Sample Title One',
                text: 'Some Text...',
                template: 'fullTxtTitle'
            },
            {
                title: 'Sample Title Two',
                text: 'Some Text...',
                template: 'fullTxtTitle'
            }
        ]
    },
    {
        _id: pageThreeID,
        siteid: '59489535453568436345643',
        name: 'Sample Page One',
        posts: [
            {
                title: 'Sample Title One',
                text: 'Some Text...',
                template: 'fullTxtTitle'
            },
            {
                title: 'Sample Title Two',
                text: 'Some Text...',
                template: 'fullTxtTitle'
            }
        ]
    }
];

const populatePages = done => {
    Page.remove().then(() => {
        let pageOne = new Page(pages[0]).save();
        let pageTwo = new Page(pages[1]).save();
        let pageThree = new Page(pages[2]).save();
        return Promise.all([pageOne, pageTwo]);
    }).then(() => {
        done();
    });
}

module.exports = { token, pages, populatePages };