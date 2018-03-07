const mongoose = require('./../server/mongoose');
const { User } = require('./../server/models/user');

User.findByIdAndUpdate('5a722ff8842f740d2fe38fc9', {$set:{recovery: '746824'}}, {new:true}).then(user => {
	if(!user) {
		console.log('404: No User');
	}
    console.log(user);
}).catch(e => {
    	console.log(`Failed to update user: ${e.message}`);
});