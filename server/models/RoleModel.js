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

Role.update = (updatedRole, result) => {
    var {id, ...uRole} = updatedRole;
    sql.query("UPDATE role SET ? WHERE id = ?", [uRole, id], (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.affectedRows == 0) return result({code: 404, message: "Role doesn't exist"}, null);
        console.log("updated role: ", updatedRole);
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

Role.findPermissions = (id, result) => {
    sql.query("SELECT p.id as permissionID, c.description as controller, p.action_name as action, p.description FROM role_permission rp "
    + " INNER JOIN permission p ON rp.permission_id=p.id "
    + " INNER JOIN controller c ON p.controller_id=c.id WHERE rp.role_id = ?", [id], (err, res) => {
        if(err) {
            console.log(err);
            result(err, null);
            return;
        }

        result(null, res);
    });
}

Role.insertPermission = (rolePermission, result) => {
    sql.query("INSERT INTO role_permission SET ?", rolePermission, (err, res) => {
        if(err) {
            if(err.errno == 1452) return result({err: err, code: 404}, null);
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}

Role.removePermission = (rolePermission, result) => {
    sql.query("DELETE FROM role_permission WHERE role_id = ? and permission_id = ?", [rolePermission.role_id, rolePermission.permission_id], (err, res) => {
        if(err) {
            if(err.errno == 1452) return result({err: err, code: 404}, null);
            console.log(err);
            result(err, null);
            return;
        }
        console.log(res);
        if(res.affectedRows == 0) return result({code: 404, message: "IDs doesn't exist"}, null);
        result(null, res);
    })
}

module.exports = Role;