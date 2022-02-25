const express = require('express');

const RoleModel = require('../models/RoleModel.js');

exports.createRole = (req, res) => {
    if(!req.body.description){
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const role = new RoleModel({
        description: req.body.description
    });

    RoleModel.create(role, (err, data) => {
        if(err)
            return res.status(500).send({
                message: err.message || "Some error occurred while creating the Role!"
            });
        else return res.status(200).send(data);
    });
}

exports.findAllRoles = (req, res) => {
    RoleModel.findAll((err, data) => {
        if(err)
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving roles."
            });
        else return res.send(data);
    });
}

exports.deleteRole = (req, res) => {
    if(!req.params.id) return res.status(400).send({
        message: "ID missing"
    });

    RoleModel.delete(req.params.id, (err, data) => {
        if(err)
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while deleting role."
            });
        else return res.send(data);
    });
}