const sql = require('./db.js');

const User = function(user){
    this.nickname = user.nickname;
    this.email = user.email;
    this.password = user.password;
    this.role_id = user.role_id;
    this.avatar = user.avatar;
}

User.create = (newUser, result) => {
    sql.query("Insert INTO user SET ?", newUser, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created user: ", {id: res.insertId, ...newUser});
        result(null, {id: res.insertId, ...newUser});
    });
}

User.findByID = (id, result) => {
    sql.query("Select id, nickname, email, role_id FROM user WHERE id = ?", [id], (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("User: ", res);
        result(null, res);
    });
}

User.findAll = (result) => {
    sql.query("Select id, nickname, email, role_id FROM user", (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("User: ", res);
        result(null, res);
    });
}

User.hasPermission = (data, result) => {
    sql.query("Select user.id, user.role_id "
    + " FROM user INNER JOIN role_permission ON user.role_id = role_permission.role_id "
    + " INNER JOIN permission ON role_permission.permission_id = permission.id "
    + " INNER JOIN controller ON permission.controller_id = controller.id "
    + " WHERE controller.description = ? and permission.action_name = ? and user.id = ?", 
    [
        data.controller,
        data.action,
        data.id
    ],  (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Permission: ", res);
        result(null, res);
    });
}

module.exports = User;