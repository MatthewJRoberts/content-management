/* NPM Packages */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

/* Files */
const config = require('./../config/config');
let api_user = require('./routes/api_user');
let api_page = require('./routes/api_page');
let api_photo = require('./routes/api_photo');

/* App Create */
let app = express();

/* App Setup */
app.use(cors());

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended:true }));

/* App Routes */
app.use('/users', api_user);
app.use('/pages', api_page);
app.use('/photos', api_photo);

/* App Listen */
app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}...`);
});

module.exports = { app };