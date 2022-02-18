const ProfileModel = require('../models/ProfileModel.js');

exports.findProfileByID = (req, res) =>{
    if(!req.params.id) {
        return res.status(400).send({
            message: "ID must not be null"
        });
    }

    ProfileModel.findByID(req.params.id, (err, user, games, posts) => {
        if(err)
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving user."
            });
        else if(user == null) return res.status(404).send({
            message: "User with id: " + req.params.id + " was not found!"
        });
        else return res.send(user);
    });
}