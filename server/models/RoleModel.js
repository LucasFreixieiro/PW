const sql = require('./db.js');

const Role = function(role){
    this.description = role.description;
}

Role.create = (newRole, result) => {
    sql.query("Insert INTO role SET ?", newRole, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created role: ", {id: res.insertId, ...newRole});
        result(null, {id: res.insertId, ...newRole});
    });
}

Role.findAll = (result) => {
    sql.query("Select id, description from role", (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Role: ", res);
        result(null, res);
    });
}

module.exports = Role;