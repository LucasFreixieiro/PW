const sql = require('./db.js');

const Comment = function(comment) {
    this.user_id = comment.user_id,
    this.post_id = comment.post_id,
    this.comment_parent_id = comment.comment_parent_id,
    this.content = comment.content
}

Comment.create = (newComment, result) => {
    sql.query("INSERT INTO post_comment SET ?", newComment, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.affectedRows == 0) return result(null, "IDs are invalid");
        console.log("posted comment in post: ", {id: res.insertId, ...newComment});
        result(null, {id: res.insertId, ...newComment});
    });
}

Comment.findAll = (result) => {
    sql.query("SELECT id, user_id as user, post_id as post, comment_parent_id as parent, content FROM post_comment", (err, res) => {
        if(err) {
            result(err, null);
            return;
        }

        result(null, res);
    });
}

Comment.findByID = (id, result) => {
    sql.query("id, user_id as user, post_id as post, comment_parent_id as parent, content FROM post_comment WHERE id = ?", [id], (err, res) => {
        if(err) {
            result(err, null);
            return;
        }

        result(null, res);
    });
}

Comment.update = (updatedComment, result) => {
    var {id, content, user_id} = updatedComment;
    sql.query("UPDATE post_comment SET content = ? WHERE id = ? and user_id = ?", [content, id, user_id], (err, res) => {
        if(err) {
            console.log(err);
            result(err, null);
            return;
        }
        console.log(res);
        if(res.affectedRows == 0) return result({code: 404, message: "Bad Parameters"}, null);
        console.log("updated comment: ", updatedComment);
        result(null, res);
    });
}

Comment.delete = (id, result) => {
    sql.query("DELETE FROM post_comment WHERE id = ?", [id], (err, res) => {
        if(err) {
            result(err, null);
            return;
        }
        if(res.affectedRows == 0) return result(null, "ID doesn't exist");
        result(null, "Comment deleted with success!");
    });
}

module.exports = Comment;