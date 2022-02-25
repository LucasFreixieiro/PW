const express = require('express');
var multer  = require('multer');
var fs = require('fs');
const GameModel = require('../models/GameModel.js');
const { getMaxListeners } = require('process');

// Defines storage where we go to upload banners
var storage = multer.diskStorage({
    destination: (req, dir, cb) => {
        cb(null, "static/games/tmp")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() +  '' + file.originalname)
    }
});
var upload = multer({storage: storage}).array('files');

exports.createGame = (req, res) => {
    upload(req, res, (err) => {
        const {title, description, release_date} = req.body;
        const files = req.files;

        if(err){
            console.log(err);
            if(files) return res.status(500).send({
                message: "Error while uploading image for game"
            });
        }

        if(!title || !description || !release_date){
            return res.status(400).send({
                message: "Content can not be empty!"
            });
        }

        const game = new GameModel({
            title: title,
            description: description,
            release_date: release_date
        });

        GameModel.create(game, (err, data) => {
            if(err) {
                return res.status(500).send({
                    message: err.message || "Some error occurred while adding one game!"
                });
            } else {
                var dir = "static/games/" + data.id;
                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir);
                }

                var errors = [];
                for(file of files){
                    try{
                        fs.copyFileSync('static/games/tmp/'+file.filename, dir+'/'+file.originalname);
                        fs.unlinkSync(file.path);
                    } catch(err){
                        errors.push(err);
                    }
                }
                    
                if(errors.length > 0){
                    return res.status(500).send("Some images could not be added");
                }
                return res.status(200).send("Game added with success");
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

    GameModel.findByID(req.params.id, (err, data) => {
        if(err)
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving game."
            });
        else return res.send(data);
    });
}

exports.findAllGames = (req, res) => {
    GameModel.findAll((err, data) => {
        if(err)
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving games."
            });
        else return res.send(data);
    });
}

exports.deleteGame = (req, res) => {
    if(!req.params.id) return res.status(400).send({
        message: "ID missing"
    });

    GameModel.delete(req.params.id, (err, data) => {
        if(err)
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while deleting game."
            });
        else return res.send(data);
    });
}