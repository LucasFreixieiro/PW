const sql = require('./db.js');

const Award = function(award){
    this.name = award.name;
    this.description = award.description;
    this.path = award.path;
}

Award.create = (newAward, result) => {
    sql.query("Insert INTO award SET ?", newAward, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created award: ", {id: res.insertId, ...newAward});
        result(null, {id: res.insertId, ...newAward});
    });
}

Award.findAll = (result) => {
    sql.query("Select id, name from award", (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Award: ", res);
        result(null, res);
    });
}

Award.findByID = (id, result) => {
    sql.query("Select id, name from award WHERE id = ?", id, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Award: ", res);
        result(null, res);
    });
}

Award.delete = (id, result) => {
    sql.query("DELETE FROM award WHERE id = ?", [id], (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.affectedRows == 0) return result(null, "ID doesn't exist");
        result(null, "Award deleted with success!");
    });
}

module.exports = Award;