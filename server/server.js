"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');

const app = express();
dotenv.config({ path: 'config/.env' });

var config = {
    username: process.env.SSH_USER,
    password: process.env.SSH_PASSWORD,
    host: process.env.SSH_HOST,
    port: 22,
    dstHost: '127.0.0.1',
    dstPort: 3306,
    localHost: '127.0.0.1',
    localPort: 3306 
}

var tunnel = require('tunnel-ssh');

tunnel(config, function(err, server) {
    if(err){
        console.log(err);
        return;
    }
    console.log("connected to server");
});

require('./middleware/passport.js')(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    key: process.env.SESSION_KEY,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*24*24
    },
}));

app.use(passport.initialize());
app.use(passport.session());

//to show profile pictures
app.use(express.static('./static/pfp/'));

const roleRoutes = require('./routes/role.js');
const userRoutes = require('./routes/user.js');
const profileRoutes = require('./routes/profile.js');

app.use('/role', roleRoutes);
app.use('/user', userRoutes);
app.use('/profile', profileRoutes);

//set port
const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}.`);
});