const express = require('express');
const bcrypt = require('bcryptjs');
var multer  = require('multer');
var fs = require('fs');

const UserModel = require('../models/UserModel.js');

// Defines storage where we go to upload banners
var storage = multer.diskStorage({
    destination: (req, dir, cb) => {
        cb(null, "static/pfp")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() +  '' + file.originalname)
    }
});
var upload = multer({storage: storage}).single('file');

exports.createUser = (req, res) => {
    upload(req, res, (err) => {
        if(!req.body.nickname || !req.body.email || !req.body.password){
            return res.status(400).send({
                message: "Content can not be empty!"
            });
        }
    
        const {nickname, email, password} = req.body;
        var avatar = req.file;

        console.log(avatar);
        if(err){
            console.log(err);
            if(avatar) {
                if(err.code == 'LIMIT_UNEXPECTED_FILE'){
                    return res.status(500).send({
                        message: "Error while uploading image for post! File too big"
                    });
                }
                else{
                    return res.status(500).send({
                        message: "Error while uploading image for post"
                    });
                }
            }
        }

        if(!avatar) avatar = {filename: "default.png"}
    
        const user = new UserModel({
            nickname: nickname,
            email: email,
            password: password,
            role_id: 1,
            avatar: avatar.filename || "default.png"
        });
    
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(user.password, salt);
    
        user.password = hash;
    
        UserModel.create(user, (err, data) => {
            if(err) {
                if(err.code == 404) {
                    return res.status(404).send({
                        message: "Role ID doesn't exist"
                    });
                }
                else {
                    return res.status(500).send({
                        message: "Some error while trying to create user"
                    });
                }
            } else {
                req.session.id = data.id;
                return res.status(200).send("User register with success");
            }
        });
    });
}

exports.findByID = (req, res) => {
    if(!req.params.id){
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    UserModel.findByID(req.params.id, (err, data) => {
        if(err)
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving user."
            });
        else return res.send(data);
    });
}

exports.findAllUsers = (req, res) => {
    UserModel.findAll((err, data) => {
        if(err)
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else return res.send(data);
    });
}

exports.update = (req, res) => {
    const {password, nickname, email} = req.body;

    if(!password || !nickname || !email) return res.status(400).send({message: "Fields are missing"});

    UserModel.findByEmail(req.user[0].email, (err, data) => {
        if(err)
            return res.status(500).send({message: "Couldn't update user data"});
        if(data.length < 1)
            return res.status(404).send({message: "No user in database"});
        
        let isMatch = bcrypt.compareSync(password, data[0].password);
        
        if(isMatch){
            const user = {
                id: req.user[0].id,
                nickname: nickname,
                email: email
            }
            UserModel.updateGeneralInfo(user, (error, dataUpdate) => {
                if(err){
                    return res.status(500).send({message: "Some error happened while trying to update data"});
                }
                return res.status(200).send({message: "User updated"});
            });
        } else {
            return res.status(403).send({message: "Password is incorrect"});
        }
    }); 
}

exports.updatePassword = (req, res) => {
    const {password, newPassword} = req.body;

    if(!password || !newPassword) return res.status(400).send({message: "Fields are missing"});

    UserModel.findByEmail(req.user[0].email, (err, data) => {
        if(err)
            return res.status(500).send({message: "Couldn't update user data"});
        if(data.length < 1)
            return res.status(404).send({message: "No user in database"});
        
        let isMatch = bcrypt.compareSync(password, data[0].password);
        
        if(isMatch){
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync(newPassword, salt);

            UserModel.updatePassword({id: req.user[0].id, password: hash}, (error, dataUpdate) => {
                if(err){
                    return res.status(500).send({message: "Some error happened while trying to update data"});
                }
                return res.status(200).send({message: "User updated"});
            });
        } else {
            return res.status(403).send({message: "Password is incorrect"});
        }
    }); 
}

exports.updateAvatar = (req, res) => {
    upload(req, res, (err) => {
        var avatar = req.file;

        console.log(avatar);
        if(err){
            console.log(err);
            if(avatar) {
                if(err.code == 'LIMIT_UNEXPECTED_FILE'){
                    return res.status(500).send({
                        message: "Error while uploading image for post! File too big"
                    });
                }
                else{
                    return res.status(500).send({
                        message: "Error while uploading image for post"
                    });
                }
            }
        }

        if(!avatar) avatar = {filename: "default.png"}

        if(req.user[0].avatar != "default.png") {
            const dir = 'static/pfp/' + req.user[0].avatar;
            if (fs.existsSync(dir)){
                fs.unlinkSync(dir);
            }
        }

        UserModel.updateAvatar({id: req.user[0].id, avatar: avatar.filename}, (error, dataUpdate) => {
            if(err){
                return res.status(500).send({message: "Some error happened while trying to update data"});
            }
            
            return res.status(200).send({message: "User updated"});
        });
    });
}

exports.hasPermission = (req, res) => {
    const user = {
        id: 1,
        controller: 'user',
        action: 'deleteAny'
    }
    UserModel.hasPermission(user, (err, data) => {
        if(err)
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else return res.send(true);
    });
}

exports.closeConnection = (req, res) => {
    req.logout();
    return res.status(200).send({message: "Exit with success"});
}