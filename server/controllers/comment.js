const CommentModel = require('../models/CommentModel.js');

exports.createComment = (req, res) => {
    const description = req.body.description;
    const user_id = req.user[0].id;
    const post_id = req.params.postID;

    if(!description){
        return res.status(400).send({message: "Content can not be empty!"});
    }

    const category = new CategoryModel({
        description: description
    });

    CategoryModel.create(category, (err, data) => {
        if(err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while adding one category!"
            });
        } else {
            return res.status(200).send("Category added with success");
        }
    });
}