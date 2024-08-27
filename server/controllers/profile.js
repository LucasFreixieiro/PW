const ProfileModel = require('../models/ProfileModel.js');
const fs = require('fs');

exports.findProfileByID = (req, res) =>{
    const id = req.query.id || req.user[0].id;
    if(!id) {
        return res.status(400).send({
            message: "ID must not be null"
        });
    }

    ProfileModel.findByID(id, (err, user, games, posts) => {
        if(err)
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving user."
            });
        else if(user == null) return res.status(404).send({
            message: "User with id: " + id + " was not found!"
        });

        if(user.games.length > 0){
            for(let game of user.games){
                console.log("Game: " + game.id);
                var dir = "static/games/" + game.id;
                if (!fs.existsSync(dir)){
                    game.image_url = "";
                }
                else {
                    var files = fs.readdirSync(dir);
                    if(files.length > 0)
                        game.image_url = files[0];
                    else game.image_url = "";
                }
                
            }
        }
        return res.send(user);
    });
}