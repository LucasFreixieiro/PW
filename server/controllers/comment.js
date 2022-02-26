const CommentModel = require('../models/CommentModel.js');

exports.createComment = (req, res) => {
    const content = req.body.content;
    const user_id = req.user[0].id;
    const post_id = req.query.postID;
    const comment_parent_id = req.query.parentID;

    if(!content || !post_id || !user_id){
        return res.status(400).send({message: "Content can not be empty!"});
    }

    const comment = new CommentModel({
        user_id: user_id,
        post_id: post_id,
        comment_parent_id: comment_parent_id,
        content: content,
    });

    CommentModel.create(comment, (err, data) => {
        if(err) {
            return res.status(500).send({
                message: "Some error occurred while adding comment!"
            });
        } else {
            return res.status(200).send("Comment added with success");
        }
    });
}

exports.findAllComments = (req, res) => {
    CommentModel.findAll((err, data) => {
        if(err)
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving comments."
            });
        else return res.send(data);
    });
}

exports.findByID = (req, res) => {
    if(!req.params.id){
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    CommentModel.findByID(req.params.id, (err, data) => {
        if(err)
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving comments."
            });
        else return res.send(data);
    });
}

exports.deleteComment = (req, res) => {
    if(!req.params.id) return res.status(400).send({
        message: "ID missing"
    });

    CommentModel.delete(req.params.id, (err, data) => {
        if(err)
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while deleting comment."
            });
        else return res.send(data);
    });
}