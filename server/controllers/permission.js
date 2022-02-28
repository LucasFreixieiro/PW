const PermissionModel = require('../models/PermissionModel.js');

exports.findByID = (req, res) => {
    if(!req.params.id){
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    PermissionModel.findByID(req.params.id, (err, data) => {
        if(err)
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving game."
            });
        else return res.send(data);
    });
}

exports.findAll = (req, res) => {
    PermissionModel.findAll((err, data) => {
        if(err)
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving games."
            });
        else return res.send(data);
    });
}