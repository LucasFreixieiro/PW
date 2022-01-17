const express = require('express');

const UserModel = require('../models/UserModel.js');

exports.createUser = (req, res) => {
    if(!req.body.nickname || !req.body.email || !req.body.password){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const {nickname, email, password, avatar} = req.body;

    const user = new UserModel({
        nickname: nickname,
        email: email,
        password: password,
        role_id: 1,
        avatar: avatar || "default.png"
    });

    UserModel.create(user, (err, data) => {
        if(err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User!"
            });
        else res.status(200).send(data);
    });
}

exports.findByID = (req, res) => {
    if(!req.params.id){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    UserModel.findByID(req.params.id, (err, data) => {
        if(err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving user."
            });
        else res.send(data);
    });
}

exports.findAllUsers = (req, res) => {
    UserModel.findAll((err, data) => {
        if(err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
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
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(true);
    });
}