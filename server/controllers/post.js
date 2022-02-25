const express = require('express');
var multer  = require('multer');
var fs = require('fs');

const PostModel = require('../models/PostModel.js');

// Defines storage where we go to upload banners
var storage = multer.diskStorage({
    destination: (req, image, cb) => {
        cb(null, 'static/posts')
    },
    filename: (req, image, cb) => {
        cb(null, Date.now() + '' + image.originalname)
    }
});
var upload = multer({storage: storage}).single('file');

exports.createPost = (req, res) => {
    upload(req, res, (err) => {
        const {title, description, game_id} = req.body;
        const image = req.files;
        if(err){
            if(image) return res.status(500).send({
                message: "Error while uploading image for post"
            });
            console.log(err);
        }

        if(!title || !description || !game_id){
            return res.status(400).send({
                message: "Content can not be empty!"
            });
        }

        const post = new PostModel({
            title: title,
            description: description,
            image_name:  image.filename || "default.png",
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
                return res.status(200).send({
                    message: "Post created with success"
                });
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

    PostModel.findByID(req.params.id, (err, data) => {
        if(err)
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving posts."
            });
        else return res.send(data);
    });
}

exports.findAll = (req, res) => {
    PostModel.findAll((err, data) => {
        if(err)
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving posts."
            });
        else return res.send(data);
    });
}