const sql = require('./db.js');

const Permission = function(permission) {
    this.controller_id = permission.controller_id;
    this.action_name = permission.action_name;
    this.description = permission.description;
}

Permission.findAll = (result) => {
    sql.query("SELECT p.id as permissionID, c.description as controller, p.action_name as action, p.description FROM permission p "
    + " INNER JOIN controller c ON p.controller_id=c.id", (err, res) => {
        if(err) {
            result(err, null);
            return;
        }

        result(null, res);
    });
}

Permission.findByID = (id, result) => {
    sql.query("SELECT p.id as permissionID, c.description as controller, p.action_name as action, p.description FROM permission p "
    + " INNER JOIN controller c ON p.controller_id=c.id WHERE p.id = ?", id, (err, res) => {
        if(err) {
            result(err, null);
            return;
        }

        result(null, res);
    });
} 

module.exports = Permission;