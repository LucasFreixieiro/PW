const express = require('express');

const PostModel = require('../models/PostModel.js');

exports.createPost = (req, res) => {
    const {title, description, image_name, game_id} = req.body;

    if(!title || !description || !game_id){
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const post = new PostModel({
        title: title,
        description: description,
        image_name: image_name || 'default.png',
        game_id: game_id,
        user_id: req.user[0].id
    });

    PostModel.create(post, (err, data) => {
        if(err) {
            console.log(err);
            return res.status(500).send({
                message: "Some error occured while creating one post!"
            });
        } else {
            return res.status(200).send("Post created with success");
        }
    });
}

exports.findByID = (req, res) => {
    if(!req.params.id){
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    PostModel.findByID(req.params.id, (err, data) => {
        if(err)
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving user."
            });
        else return res.send(data);
    });
}