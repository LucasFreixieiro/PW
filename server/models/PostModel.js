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
            result({code: 500, err: err}, null);
            return;
        }
        if(res.affectedRows == 0) return result({code: 404, message: "Game doesn't exist"}, null);
        console.log("created post: ", {id: res.insertId, ...newPost});
        result(null, {id: res.insertId, ...newPost});
    })
}

Post.findByID = (id, result) => {
    sql.query("SELECT post.id as id, post.title as title, post.description as description, post.image_name as image, game_id, game.title as gameTitle, user_id, user.nickname as nickname, post.created_at, post.updated_at " 
    + " FROM post INNER JOIN game ON post.game_id=game.id " 
    + " INNER JOIN user ON post.user_id=user.id WHERE post.id = ?", [id], (err, res) => {
        if(err){
            result(err, null);
            return;
        }
        result(null, res);
    });
}

Post.findAll = (result) => {
    sql.query("SELECT id, title, image_name as image, comments.TOTAL as comments, likes, dislikes FROM post LEFT JOIN (SELECT post_id, COUNT(*) as TOTAL FROM post_comment "
    + " GROUP BY post_id) comments ON post.id=comments.post_id "
    + " LEFT JOIN (SELECT COALESCE(SUM(reaction_id = 1), 0) AS likes, COALESCE(SUM(reaction_id = 2), 0) AS dislikes, post_id FROM post_react GROUP BY post_id) reacts "
    + " ON post.id=reacts.post_id;", (err, res) => {
        if(err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
}

Post.findAllComments = (id, result) => {
    sql.query("SELECT pc.id, user_id, nickname, avatar, comment_parent_id, content, likes, dislikes FROM post_comment pc INNER JOIN user ON pc.user_id=user.id "
        + " LEFT JOIN (SELECT COALESCE(SUM(reaction_id = 1), 0) AS likes, COALESCE(SUM(reaction_id = 2), 0) AS dislikes, comment_id FROM comment_reaction GROUP BY comment_id) reacts ON pc.id=reacts.comment_id "
    + " WHERE pc.post_id = ? ", id, (err, res) => {
        if(err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
}

Post.findAllVoters = (id, result) => {
    sql.query("SELECT user_id, post_id, reaction_id FROM post_react WHERE post_id = ? ", id, (err, res) => {
        if(err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
}

Post.update = (updatedPost, result) => {
    const {id, user_id, ...uPost} = updatedPost;
    sql.query("UPDATE post SET ? WHERE id = ? and user_id = ?", [uPost, id, user_id], (err, res) => {
        if(err) {
            console.log(err);
            result(err, null);
            return;
        }
        console.log(res);
        if(res.affectedRows == 0) return result({code: 404, message: "Post doesn't exist"}, null);
        console.log("updated post: ", uPost);
        result(null, res);
    });
}

Post.insertImage = (obj, result) => {
    sql.query("UPDATE post SET image_name = ? WHERE id = ?", [obj.image, obj.id], (err, res) => {
        if(err) {
            console.log(err);
            result(err, null);
            return;
        }
        console.log(res);
        if(res.affectedRows == 0) return result({code: 404, message: "Post doesn't exist"}, null);
        console.log("Image added to post.");
        result(null, res);
    });
}

Post.removeImage = (id, result) => {
    sql.query("UPDATE post SET image_name = '' WHERE id = ?", [id], (err, res) => {
        if(err) {
            console.log(err);
            result(err, null);
            return;
        }
        console.log(res);
        if(res.affectedRows == 0) return result({code: 404, message: "Post doesn't exist"}, null);
        console.log("Image removed from post.");
        result(null, res);
    });
}

/**
 * 
 * @param {*} id 
 * @param {*} result
 * @todo CREATE sp to delete category (sp will receive reason for post delete) 
 */
Post.delete = (id, result) => {
    sql.query("DELETE FROM post WHERE id = ?", [id], (err, res) => {
        if(err) {
            result(err, null);
            return;
        }
        if(res.affectedRows == 0) return result(null, "ID doesn't exist");
        result(null, "Post deleted with success!");
    });
}

module.exports = Post;