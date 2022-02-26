const express = require('express');
const CategoryModel = require('../models/CategoryModel.js');

exports.createCategory = (req, res) => {
    console.log(req.body);
    const description = req.body.description;

    if(!description){
        return res.status(400).send({message: "Content can not be empty!"});
    }

    const category = new CategoryModel({
        description: description
    });

    CategoryModel.create(category, (err, data) => {
        if(err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while adding one category!"
            });
        } else {
            return res.status(200).send("Category added with success");
        }
    });
}

exports.findByID = (req, res) => {
    if(!req.params.id){
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    CategoryModel.findByID(req.params.id, (err, data) => {
        if(err)
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving game category."
            });
        else return res.send(data);
    });
}

exports.findAllCategories = (req, res) => {
    CategoryModel.findAll((err, data) => {
        if(err)
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving game category."
            });
        else return res.send(data);
    });
}

exports.deleteCategory = (req, res) => {
    if(!req.params.id) return res.status(400).send({
        message: "ID missing"
    });

    CategoryModel.delete(req.params.id, (err, data) => {
        if(err)
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while deleting game category."
            });
        else return res.send(data);
    });
}