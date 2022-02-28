const express = require('express');
const AwardModel = require('../models/AwardModel.js');

exports.create = (req, res) => {
    const {name, description} = req.body;
    const file = req.file;
    if(!file || !name){
        return res.status(400).send({message: "Content can not be empty!"});
    }

    const award = new AwardModel({
        name: name,
        description: description,
        path: file.filename
    });

    AwardModel.create(award, (err, data) => {
        if(err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while adding one award!"
            });
        } else {
            return res.status(200).send("Award added with success");
        }
    });
}

exports.findAll = (req, res) => {
    AwardModel.findAll((err, data) => {
        if(err)
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving awards."
            });
        else return res.send(data);
    });
}

exports.findByID = (req, res) => {
    if(!req.params.id){
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    AwardModel.findByID(req.params.id, (err, data) => {
        if(err)
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving award."
            });
        else return res.send(data);
    });
}

exports.delete = (req, res) => {
    if(!req.params.id) return res.status(400).send({
        message: "ID missing"
    });

    AwardModel.findByID(req.params.id, (err, data) => {
        if(err)
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving award."
            });

        const dir = 'static/awards/' + data[0].url;
        if (fs.existsSync(dir)){
            fs.unlinkSync(dir);
        }

        AwardModel.delete(req.params.id, (err, data) => {
            if(err)
                return res.status(500).send({
                    message:
                        "Some error occurred while deleting the award."
                    });
            else return res.send(data);
        });
    });

    
}