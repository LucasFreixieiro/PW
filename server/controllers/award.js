const express = require('express');
const AwardModel = require('../models/AwardModel.js');

/**
 * Chama o Modelo do award e pede-lhe que adicione o novo award
 * @param {*} req
 * @param {*} res 
 * @returns Objeto com o modelo do Award
 */
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

/**
 * Mostra todos os awards existentes
 * @param {*} req 
 * @param {*} res 
 */
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

/**
 * Procura e devolve o award com o id passado por params
 * @param {*} req 
 * @param {*} res 
 * @returns Objeto do modelo Award
 */
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

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns Messagem de sucesso se conseguiu remover o Award da base de dados,
 * Gera mensages de erro caso o params não seja válido ou exista um erro de execução
 */
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