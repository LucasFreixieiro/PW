const sql = require('./db.js');

const Post = function(post){
    this.title = post.title;
    this.description = post.description;
    this.image_name = post.image_name;
    this.game_id = post.game_id;
    this.user_id = post.user_id;
}

Post.create = (newPost, result) => {
    sql.query("INSERT INTO post SET ?", newPost, (err, res) => {
        if(err){
            console.log("faz isto");
            result(err, null);
            return;
        }
        console.log("created post: ", {id: res.insertId, ...newPost});
        result(null, {id: res.insertId, ...newPost});
    })
}

Post.findByID = (id, result) => {
    sql.query("SELECT post.id as id, post.title as title, post.description as description, post.image_name as image, game_id, game.title as gameTitle, user_id, user.nickname as nickname, created_at, updated_at " 
    + " FROM post INNER JOIN game ON post.game_id=game.id " 
    + " INNER JOIN user ON post.user_id=user.id WHERE post.id = ?", [id], (err, res) => {
        if(err){
            result(err, null);
            return;
        }
        result(null, res);
    });
}

module.exports = Post;