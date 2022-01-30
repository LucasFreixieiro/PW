const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const connection = require("./../models/db.js");

const User = require("./../models/UserModel.js");

module.exports = (passport) => {
    let user = '';

    passport.use(
        new LocalStrategy({usernameField: 'email'},
            (username, password, done) => {
                User.findByEmail(username, (err, data) => {
                    if(err)
                        return done(null, false, {message: 'User not found'});
                    if(data.length < 1)
                        return done(null, false, {message: 'No User'});
                    
                    let isMatch = bcrypt.compareSync(password, data[0].password);
                    
                    if(isMatch){
                        return done(null, data);
                    } else {
                        return done(null, false, {message: 'Password incorrect'});
                    }
                });             
            }
        )
    );

    passport.serializeUser((user, done) => {
        console.log(`Added to session: ${user[0].nickname} `);
        done(null, user[0].id);
    });

    passport.deserializeUser((id, done) => {
        User.findByID((id), (err, data) => {
            console.log("deserializing...");
            if(err) return done(null, false, {message: "error deserializing"});
            else return done(null, data);
        });
    });
}