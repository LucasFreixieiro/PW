const sql = require('./db.js');

const Game = function(game){
    this.title = game.title;
    this.description = game.description;
    this.release_date = game.release_date;
}

Game.create = (newGame, result) => {
    sql.query("INSERT INTO game SET ?", newGame, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created game: ", {id: res.insertId, ...newGame});
        result(null, {id: res.insertId, ...newGame});
    });
}

Game.findByID = (id, result) => {
    sql.query("SELECT id, title, description, release_date FROM game WHERE id = ?", [id], (err, res) => {
        if(err) {
            result(err, null);
            return;
        }

        result(null, res);
    });
}

Game.findAll = (result) => {
    sql.query("SELECT id, title, description, release_date FROM game", (err, res) => {
        if(err) {
            result(err, null);
            return;
        }

        result(null, res);
    });
}

Game.delete = (id, result) => {
    sql.query("DELETE from game WHERE id = ?", [id], (err, res) => {
        if(err) {
            result(err, null);
            return;
        }
        if(res.affectedRows == 0) return result(null, "ID doesn't exist");
        result(null, "Game deleted with success!");
    });
}

module.exports = Game;