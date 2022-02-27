const express = require('express');

var fs = require('fs');
const GameModel = require('../models/GameModel.js');
const { getMaxListeners, nextTick, send } = require('process');

exports.createGame = (req, res) => {
    
        const {title, description, release_date} = req.body;
        const files = req.files;

        /*if(err){
            console.log(err);
            if(files) return res.status(500).send({
                message: "Error while uploading image for game"
            });
        }*/

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

exports.findGameCategories = (req, res) => {
    var id = req.params.id;

    if(!id) return res.status(400).send({message: "ID must not be null"});
    GameModel.findCategories(id, (err, data) => {
        if(err)
            return res.status(500).send({message: "Some error occurred while retrieving categories"});
        else return res.status(200).send(data);
    });
}

exports.findImages = (req, res) => {
    var id = req.params.id;

    if(!id){
        return res.status(400).send({message: "ID must not be empty"});
    }

    var dir = "static/games/" + id;
    if (!fs.existsSync(dir)){
        return res.status(404).send({ message: "This game doesn't have images"});
    }

    var files = [];
    fs.readdir(dir, (err, list) => {
        if(err) return res.status(500).send({
            message: "Some error occurred while trying to retrieve game images"
        });

        return res.status(200).send(list);
    });
}

exports.update = (req, res, next) => {
    var {id, title, description, release_date} = req.body;

    if(!id || !title || !description || !release_date){
        return res.status(400).send({message: "Fields missing!"});
    }

    const game = new GameModel({
        title: title,
        description: description,
        release_date: release_date
    });

    game.id = id;

    console.log(game);

    GameModel.update(game, (err, data) => {
        if(err){
            if(err.code == 404) {
                return res.status(404).send({
                    message: err.message
                });
            }
            else {
                return res.status(500).send({message: "Some error occurred while updating game with id: " + id})
            }
        }

        return res.status(200).send({
            message: "Game updated"
        });
    });
}

exports.addImages = (req, res) => {
    const id = req.params.id;
    if(!id) return res.status(400).send({message: "ID is missing"});

    GameModel.findByID(id, (err, data) => {
        if(err) return res.status(404).send({message: "There's no game with the id: " + id});
        var dir = "static/games/" + id;
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
        return res.status(200).send("Images added to game: "+ id +" with success");
    })
    
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