const express = require('express');
const bcrypt = require('bcryptjs');

const UserModel = require('../models/UserModel.js');

exports.createUser = (req, res) => {
    if(!req.body.nickname || !req.body.email || !req.body.password){
        return res.status(400).send({
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

    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(user.password, salt);

    user.password = hash;

    UserModel.create(user, (err, data) => {
        if(err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while creating the User!"
            });
        } else {
            req.session.id = data.id;
            return res.status(200).send("User register with success");
        }
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