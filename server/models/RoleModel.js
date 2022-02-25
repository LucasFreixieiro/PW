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

Role.delete = (id, result) => {
    sql.query("DELETE FROM role WHERE id = ?", [id], (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.affectedRows == 0) return result(null, "ID doesn't exist");
        result(null, "Role deleted with success!");
    });
}

module.exports = Role;