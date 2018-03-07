const mongoose = require('./../server/mongoose');
const { User } = require('./../server/models/user');

User.find().then(users => {
	if(!users) {
		console.log('404: No Users');
	}
	for(let i = 0; i < users.length; i++) {
		console.log('---------------------------');
		console.log(users[i]);
	}
}).catch(e => {
    	console.log(`Failed to create new user: ${e.message}`);
});