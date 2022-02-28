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
            result({code: 500, err: err}, null);
            return;
        }
        if(res.affectedRows == 0) return result({code: 404, message: "Role doesn't exist"}, null);
        console.log("created user: ", {id: res.insertId, ...newUser});
        result(null, {id: res.insertId, ...newUser});
    });
}

User.findByID = (id, result) => {
    sql.query("Select id, nickname, email, role_id, created_at as joined, avatar FROM user WHERE id = ?", [id], (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        
        console.log("User: ", res);
        result(null, res);
    });
}

User.findByEmail = (email, result) => {
    sql.query("Select id, nickname, email, password, role_id, avatar FROM user WHERE email = ?", [email], (err, res) => {
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
    sql.query("Select user.id, nickname, email, created_at as joined, user.role_id, role.description as role FROM user LEFT JOIN role ON user.role_id=role.id", (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("User: ", res);
        result(null, res);
    });
}

User.findGameList = (id, result) => {
    sql.query("Select user.id as userID, nickname, game.id as gameID, game.title FROM user INNER JOIN game_list gl ON user.id=gl.user_id INNER JOIN game ON gl.game_id=game.id WHERE user.id = ?", id, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("User: ", res);
        result(null, res);
    });
}

User.updateGeneralInfo = (updatedUser, result) => {
    const {id, nickname, email} = updatedUser;
    sql.query("UPDATE user SET nickname = ?, email = ? WHERE id = ? ", [nickname, email, id], (err, res) => {
        if(err) {
            console.log(err);
            result(err, null);
            return;
        }
        console.log(res);
        if(res.affectedRows == 0) return result({code: 404, message: "User doesn't exist"}, null);
        console.log("updated user: ", updatedUser);
        result(null, res);
    });
}

User.updatePassword = (updatedUser, result) => {
    const {id, password} = updatedUser;
    sql.query("UPDATE user SET password = ? WHERE id = ? ", [password, id], (err, res) => {
        if(err) {
            console.log(err);
            result(err, null);
            return;
        }
        console.log(res);
        if(res.affectedRows == 0) return result({code: 404, message: "User doesn't exist"}, null);
        console.log("updated user: ", updatedUser);
        result(null, res);
    });
}

User.updateAvatar = (updatedUser, result) => {
    const {id, avatar} = updatedUser;
    sql.query("UPDATE user SET avatar = ? WHERE id = ? ", [avatar, id], (err, res) => {
        if(err) {
            console.log(err);
            result(err, null);
            return;
        }
        console.log(res);
        if(res.affectedRows == 0) return result({code: 404, message: "User doesn't exist"}, null);
        console.log("User updated");
        result(null, res);
    });
}

User.updateRole = (updateRole, result) => {
    const {id, role_id} = updateRole;
    sql.query("UPDATE user SET role_id = ? WHERE id = ? ", [role_id, id], (err, res) => {
        if(err) {
            console.log(err);
            result(err, null);
            return;
        }
        console.log(res);
        if(res.affectedRows == 0) return result({code: 404, message: "User doesn't exist"}, null);
        console.log("User updated");
        result(null, res);
    });
}

User.insertGame = (gameUser, result) => {
    sql.query("Insert INTO game_list SET ?", gameUser, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result({code: 500, err: err}, null);
            return;
        }
        if(res.affectedRows == 0) return result({code: 404, message: "Ids don't exist"}, null);
        console.log("inserted game in user list");
        result(null, "inserted game in user list");
    });
}

User.removeGame = (gameUser, result) => {
    sql.query("DELETE FROM game_list WHERE user_id = ? and game_id = ?", [gameUser.user_id, gameUser.game_id], (err, res) => {
        if(err) {
            console.log("error: ", err);
            result({code: 500, err: err}, null);
            return;
        }
        if(res.affectedRows == 0) return result({code: 404, message: "Ids don't exist"}, null);
        console.log("removed game from user list");
        result(null, "removed game from user list");
    });
}

User.delete = (id, result) => {
    sql.query("DELETE FROM user WHERE id = ?", [id], (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.affectedRows == 0) return result(null, "ID doesn't exist");
        result(null, "User deleted with success!");
    });
}

User.hasPerm = (data, result) => {
    console.log(data);
    sql.query("Select user.id, user.role_id "
    + " FROM user INNER JOIN role_permission ON user.role_id = role_permission.role_id "
    + " INNER JOIN permission ON role_permission.permission_id = permission.id "
    + " INNER JOIN controller ON permission.controller_id = controller.id "
    + " WHERE controller.description = ? and user.id = ?", 
    [
        data.controller,
        data.id
    ],  (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Permission: ", res);
        if(res.length < 1) return result({message: "Without permmissions"}, null);
        return result(null, res);
    });
}

User.hasPermission = (data, result) => {
    console.log(data);
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
        if(res.length < 1) return result({message: "Without permmissions"}, null);
        return result(null, res);
    });
}

module.exports = User;