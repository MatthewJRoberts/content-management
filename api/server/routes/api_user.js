const express = require('express');
const _ = require('lodash');
const { ObjectID } = require('mongodb');
let router = express.Router();

let { mongoose } = require('./../mongoose');
let { User } = require('./../models/user');
let { Page } = require('./../models/page');
let { Backup } = require('./../models/backup');
let { authenticate } = require('./../midware/authenticate');

router.get('/', (req, res) => {
    User.find({}).then((docs) => {
        if(!docs) {
            return res.status(404).send();
        }
        return res.status(200).json(docs);
    }).catch((e) => {
        return res.status(500).send();
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(400).send();
    }
    User.findById(id).then(user => {
        if(!user) {
            return res.status(404).send();
        }
        return res.status(200).json(user);
    }).catch(e => {
        return res.status(500).send();
    });
});

router.post('/', (req, res) => {
    let body = _.pick(req.body, ['password', 'site']);
    if(body.password.length < 6) {
        return res.status(400).send();
    }

    let user = new User(body);
    user.password = user.hashPassword(user.password);

    user.save().then(() => {
        if(!user) {
            return res.status(404).send();
        }

        let newPage = new Page({
            siteid: user._id,
            name: 'Homepage',
            isHome: true,
            slug: '',
            posts: []
        });
        newPage.save().then(page => {
            if(!page) {
                return res.status(404).send();
            }
        }).catch((e) => {
            return res.status(400).send();
        });

        user.generateRecovery();
        return user.generateAuthToken();
    }).then((token) => {
        return res.status(200).json(user);
    }).catch((e) => {
        return res.status(400).send();
    });
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(400).send();
    }
    User.findByIdAndRemove(id).then(user => {
        if(!user) {
            return res.status(404).send();
        }
        return res.status(200).json(user);
    }).catch(e => {
        return res.status(500).send();
    });
});

router.post('/profile/login', (req, res) => {
    let body = _.pick(req.body, ['password', 'SITE_ID']);
    User.findByCredentials(body.password, body.SITE_ID).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.status(200).json({...user, token: token});
        }).catch(e => {
            res.status(401).send();
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

router.delete('/', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        return res.status(200).send();
    }, () => {
        return res.status(400).send();
    });
});

router.put('/', authenticate, (req, res) => {
    let body = _.pick(req.body, ['site']);
    User.findByIdAndUpdate(req.user, {$set: body}, {new: true})
        .then(user => {
            if(!user) {
                return res.status(404).send();
            }
            return res.status(200).json(user);
        }).catch(e => {
            return res.status(500).send();
        });
});

router.post('/profile/me', authenticate, (req, res) => {
    res.status(200).json(req.user);
});

router.put('/profile/token', authenticate, (req, res) => {
    let user = req.user;
    user.removeToken(req.token).save().then(user => {
        if(!user) {
            return res.status(404).send();
        }
        return res.status(200).json(user);
    }).catch(e => res.status(500).send());
});

router.put('/profile/reset', (req, res) => {
    let body = _.pick(req.body, ['recovery', 'pass1', 'pass2', 'SITE_ID', 'ip']);

    if(!ObjectID.isValid(body.SITE_ID)) {
        return res.status(400).send();
    }
    if(body.pass1 !== body.pass2) {
        return res.status(400).send();
    }

    User.findById(body.SITE_ID).then(user => {
        if(!user) {
            return res.status(404).send();
        }

        if(user.recovery !== body.recovery) {
            return res.status(401).send();
        }

        Page.find({siteid: body.SITE_ID}).then(pages => {
            
            let userBackup = { 
                user: user,
                pages: [ ...pages ]
             };
            let newBackup = new Backup({
                userid: body.SITE_ID,
                date: new Date(),
                ip: body.ip,
                headers: req.headers['user-agent'],
                data: userBackup
            });

            user.password = user.hashPassword(body.pass1);

            user.save().then(() => {

                newBackup.save().then(backup => {
                    return res.status(200).send();
                }).catch(e => console.log(e));

            }).catch(e => console.log(e));

        }).catch(e => console.log(e));

    }).catch(e => {
        return res.status(500).send();
    });
});

module.exports = router;