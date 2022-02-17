const express = require('express');
const GameModel = require('../models/GameModel.js');

exports.createGame = (req, res) => {
    const {title, description, release_date} = req.body;

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