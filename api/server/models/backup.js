const mongoose = require('mongoose');

let BackupSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    ip: {
        type: String
    },
    headers: {
        type: String
    },
    data: {
        type: Object,
        required: true
    }
});

let Backup = mongoose.model('Backup', BackupSchema, 'backups');

module.exports = { Backup };