const express = require('express');
const CategoryModel = require('../models/CategoryModel.js');

/**
 * Cria Objeto do tipo Category e pede ao modal que coloque na base de dados
 * @param {*} req 
 * @param {*} res 
 * @returns Mensagem de sucesso caso o objeto seja introduzido ou de erro caso exista algo inválido
 */
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

/**
 * Mostra a categoria com um ID 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
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