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

exports.update = (req, res) => {
    const {id, description} = req.body;

    if(!id || !description){
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const role = new RoleModel({
        description: description
    });

    role.id = id;

    RoleModel.update(role, (err, data) => {
        if(err) {
            if(err.code == 404) {
                return res.status(404).send({
                    message: err.message
                });
            } else {
                return res.status(500).send({message: "Some error occurred while updating role with id: " + id})
            }
        }

        return res.status(200).send({
            message: "Role updated"
        });
    });
}

exports.findPermissions = (req, res) => {
    var id = req.params.id;

    if(!id) return res.status(400).send({message: "ID must not be null"});
    RoleModel.findPermissions(id, (err, data) => {
        if(err)
            return res.status(500).send({message: "Some error occurred while retrieving permissions"});
        else return res.status(200).send(data);
    });
}

exports.addPermission = (req, res) => {
    const {roleID, permissionID} = req.query;
    if(!roleID || !permissionID){
        return res.status(400).send({message: "Role and Permission can't be empty"});
    }

    const rp = {
        role_id: roleID,
        permission_id: permissionID
    }

    RoleModel.insertPermission(rp, (err, data) => {
        if(err){
            if(err.code == 404) return res.status(404).send({message: "There's no role or permission with id's: " + roleID + ", " + permissionID});
            return res.status(500).send({message: "Error while adding permission to role: " + roleID});
        }

        return res.status(200).send({message: "Permission added to role: " + roleID + " with success"});
    });
}

exports.removePermission = (req, res) => {
    const {roleID, permissionID} = req.query;
    if(!roleID || !permissionID){
        return res.status(400).send({message: "Role and Permission can't be empty"});
    }

    const rp = {
        role_id: roleID,
        permission_id: permissionID
    }

    RoleModel.removePermission(rp, (err, data) => {
        if(err){
            console.log(err);
            if(err.code == 404) return res.status(404).send({message: "There's no relationship between role " + roleID + " and permission " + permissionID });
            return res.status(500).send({message: "Error while removing permission from role: " + roleID});
        }

        return res.status(200).send({message: "Permission removed from role: " + roleID + " with success"});
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