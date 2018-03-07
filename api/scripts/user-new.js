const mongoose = require('./../server/mongoose');
const { User } = require('./../server/models/user');

let newUser = new User({
    password: "admin123",
    site: {
        name: "Site Name",
        desc: "Lorem ipsum..."
    }
});

newUser.save().then(user => {
    if(!user) {
        console.log('Failed to create new user: NO USER');
    }
    console.log(`SUCCESS: New User - ${user.site.name}`);
    console.log(`User ID: ${user._id}`);
    console.log(`Recovery Code: ${user.recovery}`);
}).catch(e => {
    console.log(`Failed to create new user: ${e.message}`);
});