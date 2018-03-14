const mongoose = require('./../server/mongoose');
const { Page } = require('./../server/models/page');

let newPage = new Page({
    siteid: "5aa1d28f78b17f3d1955b8a0",
    name: "Homepage",
    isHome: true,
    slug: ""
});

newPage.save().then(page => {
    if(!page) {
        console.log('Failed to create new page: NO PAGE');
    }
    console.log(`SUCCESS: New Page - ${page.name}`);
}).catch(e => {
    console.log(`Failed to create new page: ${e.message}`);
});