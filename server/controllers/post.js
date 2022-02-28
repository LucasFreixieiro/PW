const express = require('express');
var multer  = require('multer');
var fs = require('fs');

const PostModel = require('../models/PostModel.js');
const { log } = require('console');

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
        var image = req.file;
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

        if(!image) image = {filename: ""}

        const post = new PostModel({
            title: title,
            description: description,
            image_name:  image.filename,
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

exports.update = (req, res) => {
    const {id, title, description, game_id} = req.body;
    const user_id = req.user[0].id;

    if(!id || !title || !description || !game_id){
        return res.status(400).send({message: "Fields missing!"});
    }

    PostModel.findByID(id, (error, data) => {
        if(error){
            return res.status(500).send({
                message: "Error while trying to update post"
            });
        }

        if(data.length == 0){
            return res.status(404).send({
                message: "Post doesn't exist"
            });
        }

        if(data[0].user_id != user_id){
            return res.status(403).send({
                message: "You're not the creator of this post"
            });
        }

        var post = new PostModel({
            title: title,
            description: description,
            image_name: data[0].image,
            game_id: game_id,
            user_id: user_id
        });

        post.id = id;
        
        PostModel.update(post, (err, dataPost) => {
            if(err){
                return res.status(500).send({
                    message: "Error while trying to update post"
                });
            }
            return res.status(200).send({message: "Post updated with success"});
        });
    });
}

exports.insertImage = (req, res) => {
    upload(req, res, (err) => {
        const id = req.params.id;
        const file = req.file;

        if(!id) return res.status(400).send({message: "ID must be passed"});

        if(!file) return res.status(400).send({message: "Fields missing"});
        
        if(err){
            return res.status(500).send({
                message: "Error while uploading image for post"
            });
        }

        PostModel.findByID(id, (error, data) => {
            const dir = 'static/posts/' + file.filename;
            if(error){
                console.log(error);
                fs.unlinkSync(dir);
                return res.status(500).send({
                    message: "Error while trying to update post"
                });
                
            }

            if(data.length == 0){
                fs.unlinkSync(dir);
                return res.status(404).send({
                    message: "Post doesn't exist"
                });
            }

            if(data[0].user_id != req.user[0].id){
                fs.unlinkSync(dir);
                return res.status(403).send({
                    message: "You're not the creator of this post"
                });
            }
            
            PostModel.insertImage({id: id, image: file.filename}, (err, dataRemove) => {
                if(err){
                    fs.unlinkSync(dir);
                    if(err.code == 404){
                        return res.status(404).send({message: "Post doesn't exist"});
                    } else {
                        return res.status(500).send({message: "Error while adding image to post"});
                    }
                }

                const dir2 = 'static/posts/' + data[0].image;
    
                if (fs.existsSync(dir2)){
                    fs.unlinkSync(dir2);
                }
            
                return res.status(200).send({message: "Image added with success"});
            });
        });
    });
}

exports.removeImage = (req, res) => {
    const id = req.params.id;

    if(!id) return res.status(400).send({message: "ID must be passed"});

    PostModel.findByID(id, (error, data) => {
        if(error){
            return res.status(500).send({
                message: "Error while trying to update post"
            });
        }

        if(data.length == 0){
            return res.status(404).send({
                message: "Post doesn't exist"
            });
        }

        if(data[0].user_id != req.user[0].id){
            return res.status(403).send({
                message: "You're not the creator of this post"
            });
        }

        if(data[0].image == ""){
            return res.status(404).send({
                message: "Database doesn't have any image"
            });
        }
        
        PostModel.removeImage(id, (err, dataRemove) => {
            if(err){
                if(err.code == 404){
                    return res.status(404).send({message: "Post doesn't exist"});
                } else {
                    return res.status(500).send({message: "Error while removing image from post"});
                }
            }
    
            const dir = 'static/posts/' + data[0].image;
    
            if (!fs.existsSync(dir)){
                return res.status(404).send({message: "Server doesn't have image: " + data[0].image});
            }
        
            try{
                fs.unlinkSync(dir);
            }
            catch(err){
                return res.status(500).send({message: "Error while removing image from server"});
            }
        
            return res.status(200).send({message: "Image removed with success"});
        });
    });

    
}

exports.deletePost = (req, res) => {
    if(!req.params.id) return res.status(400).send({
        message: "ID missing"
    });

    PostModel.delete(req.params.id, (err, data) => {
        if(err)
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while deleting post."
            });
        else return res.send(data);
    });
}