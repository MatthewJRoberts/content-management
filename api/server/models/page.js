const { ObjectID } = require('mongodb');

const mongoose = require('mongoose');

let PageSchema = new mongoose.Schema({
    siteid: {
        type:String,
        required: true
    },
    name: {
        type:String
    },
    isHome: {
        type:Boolean,
        default: false
    },
    slug: {
        type:String,
        default: ''
    },
    options: {
        showTitle: {
            type: Boolean,
            default: true
        }
    },
    posts: [{
        title: {
            type:String
        },
        text: {
            type:String
        },
        imgpath: {
            type:String
        },
        template: {
            type:String
        }
    }]
});

PageSchema.methods.generateSlug = (name, isHome = false) => {
    if(isHome) {
        return '';
    }
    let slug = name.replace(/[&\/\\#,+()$~%.'":*?<>{}!?¬^]/g,'');
    slug = slug.replace(/ /g, '-');
    slug = slug.toLowerCase();
    return slug;
}

let Page = mongoose.model('Page', PageSchema, 'pages');

module.exports = { Page };