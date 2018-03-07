const mongoose = require('./../server/mongoose');
const { ObjectID } = require('mongodb');
const { Page } = require('./../server/models/page');

let arg = [];
for(let i = 2; i < process.argv.length; i++) {
    arg.push(process.argv[i]);
}

if(arg[0] === 'update') {

    let keys = Object.keys(Page.schema.obj);
    let key_exists = false;
    for(let i = 0; i < keys.length; i++) {
        if(arg[2] === keys[i]) {
            key_exists = true;
        }
    }
    if(!key_exists) {
        return console.log('Key does not exist.');
    }

    let id = arg[1];
    if(!ObjectID.isValid(id)) {
        return console.log('ERROR: Invalid page _id!');
    }

    let key = arg[2];
    let value = arg[3];
    
    let body = {$set: {}};
    body.$set[key] = value;

    Page.findByIdAndUpdate(id, body, {new:true}).then(page => {
        if(!page) {
            return console.log('ERROR: No Page Found!');
        }
        console.log(`Updated: page(${id}), ${key} to ${value}`);
        process.exit();
    }).catch(e => console.log(`ERROR: ${e.message}`));

} else {
    console.log('--------- Help -----------');
    console.log('update <_id> <key> <value>');
    console.log('--------------------------');
}

// process.exit();