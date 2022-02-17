const sql = require('./db.js');

const Category = function(category) {
    this.description = category.description
}

Category.create = (newCategory, result) => {
    sql.query("INSERT INTO game_category SET ?", newCategory, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created category for games: ", {id: res.insertID, ...newCategory});
        result(null, {id: res.insertID, ...newCategory});
    });
}

Category.findByID = (id, result) => {
    sql.query("SELECT id, description FROM game_category WHERE id = ?", [id], (err, res) => {
        if(err) {
            result(err, null);
            return;
        }

        result(null, res);
    });
}

Category.findAll = (result) => {
    sql.query("SELECT id, description FROM game_category", (err, res) => {
        if(err) {
            result(err, null);
            return;
        }

        result(null, res);
    });
}

module.exports = Category;