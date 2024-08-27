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

Game.findCategories = (id, result) => {
    sql.query("SELECT gc.category_id, c.description FROM game_categories gc INNER JOIN game_category c ON gc.category_id=c.id WHERE game_id = ?", [id], (err, res) => {
        if(err) {
            console.log(err);
            result(err, null);
            return;
        }

        result(null, res);
    });
}

Game.update = (updatedGame, result) => {
    var {id, ...uGame} = updatedGame;
    sql.query("UPDATE game SET ? WHERE id = ?", [uGame, id], (err, res) => {
        if(err) {
            console.log(err);
            result(err, null);
            return;
        }
        console.log(res);
        if(res.affectedRows == 0) return result({code: 404, message: "Game doesn't exist"}, null);
        console.log("updated game: ", updatedGame);
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

Game.insertCategory = (newGameCategory, result) => {
    sql.query("INSERT INTO game_categories SET ?", [newGameCategory], (err, res) => {
        if(err) {
            if(err.errno == 1452) return result({err: err, code: 404}, null);
            console.log(err);
            result(err, null);
            return;
        }
        result(null, res);
    })
}

Game.removeCategory = (gameCategory, result) => {
    sql.query("DELETE FROM game_categories WHERE game_id = ? and category_id = ?", [gameCategory.game_id, gameCategory.category_id], (err, res) => {
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

module.exports = Game;