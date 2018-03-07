const mongoose = require('./../server/mongoose');
const { Page } = require('./../server/models/page');

Page.find().then(pages => {
	if(!pages) {
		console.log('404: No Pages');
	}
	for(let i = 0; i < pages.length; i++) {
        for(let x = 0; x < pages.posts.length; x++) { 
            pages.posts[i].imgpath = "";
        }
		console.log('---------------------------');
		console.log(pages[i]);
	}
}).catch(e => {
    	console.log(`Failed to find pages: ${e.message}`);
});