const mongoose = require('./../server/mongoose');
const { ObjectID } = require('mongodb');
const { User } = require('./../server/models/user');

let arg = [];
for(let i = 2; i < process.argv.length; i++) {
    arg.push(process.argv[i]);
}

if(arg[0] === 'update') {

    let keys = Object.keys(User.schema.obj);
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
        return console.log('ERROR: Invalid user _id!');
    }

    let key = arg[2];
    let value = arg[3];
    
    let body = {$set: {}};
    body.$set[key] = value;

    User.findByIdAndUpdate(id, body, {new:true}).then(user => {
        if(!user) {
            return console.log('ERROR: No User Found!');
        }
        console.log(`Updated: user(${id}), ${key} to ${value}`);
        process.exit();
    }).catch(e => console.log(`ERROR: ${e.message}`));

} else {
    console.log('--------- Help -----------');
    console.log('update <_id> <key> <value>');
    console.log('--------------------------');
}

// process.exit();