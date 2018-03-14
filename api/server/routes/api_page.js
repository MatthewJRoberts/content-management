const express = require('express');
const _ = require('lodash');
const { ObjectID } = require('mongodb');
let router = express.Router();

let { mongoose } = require('./../mongoose');
let { Page } = require('./../models/page');
let { authenticate } = require('./../midware/authenticate');

// GET ALL PAGES

router.get('/', (req, res) => {
    Page.find().then(pages => {
        if(!pages) {
            return res.status(404).send();
        }
        return res.status(200).json(pages);
    }).catch(e => {
        return res.status(500).send();
    });
});

// GET PAGE BY ID

router.get('/:id', (req, res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(400).send();
    }
    Page.findById(id).then(page => {
        if(!page) {
            return res.status(404).send();
        }
        return res.status(200).json(page);
    }).catch(e => {
        return res.status(500).send();
    });
});

// GET PAGE BY ID AND SLUG

router.get('/p/:id', (req, res) => {
    const siteid = req.params.id;
    if(!ObjectID.isValid(siteid)) {
        return res.status(400).send();
    }
    Page.findOne({siteid, slug: ''}).then(page => {
        if(!page) {
            return res.status(404).send();
        }
        return res.status(200).json(page);
    }).catch(e => {
        return res.status(500).send();
    });
});

router.get('/p/:id/:slug', (req, res) => {
    const siteid = req.params.id;
    const slug = req.params.slug;
    if(!ObjectID.isValid(siteid) && !ObjectID.isValid(slug)) {
        return res.status(400).send();
    }
    Page.findOne({siteid, slug}).then(page => {
        if(!page) {
            return res.status(404).send();
        }
        return res.status(200).json(page);
    }).catch(e => {
        return res.status(500).send();
    });
});

// GET ALL PAGES WITH SITE ID

router.get('/site/:id', (req, res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(400).send();
    }
    Page.find({siteid: id}, 
        {
            siteid: 0,
            posts: 0,
            __v: 0
        }
    ).then(pages => {
        if(!pages) {
            return res.status(404).send();
        }
        return res.status(200).json(pages);
    }).catch(e => {
        return res.status(500).send();
    });
});

// CREATE A NEW PAGE

router.post('/', authenticate, (req, res) => {
    let body = _.pick(req.body, ['name', 'posts', 'isHome']);

    let newPage = new Page(body);
    newPage.siteid = req.user._id;

    newPage.slug = '';
    if(!body.isHome) {
        newPage.slug = newPage.generateSlug(newPage.name, body.isHome);
        if(newPage.slug === 'login' || newPage.slug === 'help' || newPage.slug === 'api') {
            newPage.slug = `${ newPage.slug }-${ Math.floor((Math.random() * 10) + (Math.random() * 10)) }`;
        }
        if(newPage.slug === '') {
            return res.status(400).send();
        }
        Page.find({siteid: newPage.siteid}).then(pages => {
            if(pages !== undefined) {
                for(let i = 0; i < pages.length; i++) {
                    if(pages[i].slug === newPage.slug) {
                        newPage.slug = `${ newPage.slug }-${ Math.floor((Math.random() * 10) + (Math.random() * 10)) }`;
                    }
                }
            }

            newPage.save().then(page => {
                if(!page) {
                    return res.status(404).send();
                }
                return res.status(200).json(page);
            }).catch(e => {
                return res.status(500).send();
            });

        }).catch(e => res.status(500).send());
    } else {
        newPage.save().then(page => {
            if(!page) {
                return res.status(404).send();
            }
            return res.status(200).json(page);
        }).catch(e => {
            return res.status(500).send();
        });
    }
});

// UPDATE PAGE

router.put('/:id', authenticate, (req, res) => {
    let id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(400).send();
    }
    let siteId = req.user._id;
    if(!ObjectID.isValid(id)) {
        return res.status(400).send();
    }
    let body = _.pick(req.body, ['name', 'slug', 'posts', 'isHome']);

    if(!body.isHome) {
        let slug = body.name;
        slug = slug.replace(/[&\/\\#,+()$~%.'":*?<>{}!?¬^]/g,'');
        slug = slug.replace(/ /g, '-');
        slug = slug.toLowerCase();
        body.slug = slug;
        
        if(body.slug === 'login' || body.slug === 'help' || body.slug === 'api') {
            body.slug = `${ body.slug }-${ Math.floor((Math.random() * 10) + (Math.random() * 10)) }`;
        }
        if(body.slug === '') {
            return res.status(400).send();
        }
        
        Page.find({siteid: siteId}).then(pages => {
            if(pages !== undefined) {
                for(let i = 0; i < pages.length; i++) {
                    if(pages[i]._id.toString() !== id.toString()) {
                        if(pages[i].slug === body.slug) {
                            body.slug = `${ body.slug }-${ Math.floor((Math.random() * 10) + (Math.random() * 10)) }`;
                        }
                    }
                }
            }

            Page.findOneAndUpdate({_id: id, siteid: siteId}, {$set: body}, {new: true}).then(page => {
                if(!page) {
                    return res.status(404).send();
                }
                return res.status(200).json(page);
            }).catch(e => {
                return res.status(500).send();
            });

        }).catch(e => res.status(500).send());
    } else {
        Page.findOneAndUpdate({_id: id, siteid: siteId}, {$set: body}, {new: true}).then(page => {
            if(!page) {
                return res.status(404).send();
            }
            return res.status(200).json(page);
        }).catch(e => {
            return res.status(500).send();
        });
    }
});

// DELETE PAGE

router.post('/:id', authenticate, (req, res) => {
    let id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(400).send();
    }
    let siteId = req.user._id;
    if(!ObjectID.isValid(id)) {
        return res.status(400).send();
    }
    Page.findOneAndRemove({_id: id, siteid: siteId}).then(page => {
        if(!page) {
            return res.status(404).send();
        }
        return res.status(200).json(page);
    }).catch(e => {
        return res.status(500).send();
    });
});

module.exports = router;