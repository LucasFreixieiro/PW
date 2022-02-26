"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger.js');

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

const domainsFromEnv = process.env.CORS_DOMAINS || ""

const whitelist = domainsFromEnv.split(",").map(item => item.trim())

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
        console.log("allowed by CORS");
        callback(null, true)
    } else {
        console.log("Not allowed by CORS");
        callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./middleware/passport.js')(passport);

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
app.use(express.static('/static/pfp/'));

app.use('/static', express.static('static'));

const roleRoutes = require('./routes/role.js');
const userRoutes = require('./routes/user.js');
const profileRoutes = require('./routes/profile.js');
const postRoutes = require('./routes/post.js');
const gameRoutes = require('./routes/game.js');
const categoryRoutes = require('./routes/category.js');

app.use('/role', roleRoutes);
app.use('/user', userRoutes);
app.use('/profile', profileRoutes);
app.use('/post', postRoutes);
app.use('/game', gameRoutes);
app.use('/category', categoryRoutes);


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

process.on('uncaughtException', err => {
    console.error('There was an uncaught error', err)
    process.exit(1)
});

//set port
const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}.`);
});