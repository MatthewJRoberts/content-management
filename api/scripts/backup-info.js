const mongoose = require('./../server/mongoose');
const { Backup } = require('./../server/models/backup');

Backup.find().then(backups => {
	if(!backups) {
		console.log('404: No Users');
    }
    console.log('---------------------------');
    console.log(`${backups.length} Backups Found...`);
	for(let i = 0; i < backups.length; i++) {
		console.log('---------------------------');
		console.log(backups[i]);
	}
}).catch(e => {
    	console.log(`Failed to create new user: ${e.message}`);
});