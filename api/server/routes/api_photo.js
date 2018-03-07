const express = require('express');
const _ = require('lodash');
const { ObjectID } = require('mongodb');
let router = express.Router();

let { authenticate } = require('./../midware/authenticate');
const { Photo } = require('./../models/photo');

router.post('/all', authenticate, (req, res) => {
    let siteid = req.user._id;
    if(!ObjectID.isValid(siteid)) {
        return res.status(400).send();
    }

    Photo.find({'siteid': siteid}).then(photos => {
        if(!photos) {
            return res.status(404).send();
        }
        return res.status(200).json(photos);
    }).catch(e => {
        return res.status(500).send();
    });
});

router.post('/', authenticate, (req, res) => {
    let siteid = req.user._id;
    if(!ObjectID.isValid(siteid)) {
        return res.status(400).send();
    }
    
    let body = _.pick(req.body, ['photo']);
    body.photo.siteid = siteid;

    let photo = new Photo(body.photo);
    photo.save().then(p => {
        if(!p) {
            return res.status(404).send();
        }
        return res.status(200).json(p);
    }).catch(e => {
        return res.status(500).send();
    });
});

router.post('/:id', authenticate, (req, res) => {
    let siteid = req.user._id;
    if(!ObjectID.isValid(siteid)) {
        return res.status(400).send();
    }
    let id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(400).send();
    }

    Photo.findOneAndRemove({_id: id, siteid: siteid}).then(photo => {
        if(!photo) {
            return res.status(404).send();
        }
        return res.status(200).json(photo);
    }).catch(e => {
        return res.status(500).send();
    });
});

module.exports = router;