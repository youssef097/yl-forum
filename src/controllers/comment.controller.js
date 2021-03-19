

const Comment = require("../models/Comment")

module.exports = {

    createComment: (req, res) => {
        let { text } = req.body

        if (!text) {
            return res.status(500).json({ "ERR": "EMPTY_COMMENT" })
        }

        let newComment = new Comment(null, text, req.user.id, req.params.postId)
        newComment.save((err, result) => {
            if (!err) {
                return res.status(200).json({ "SUCCESS": "Commented succesfully" })
            } else {
                console.log(err);
            }
        })
    },

    answerComment: (req, res) => {
        let { text } = req.body
        console.log(req.params);
        if (!text) {
            return res.status(500).json({ "ERR": "EMPTY_COMMENT" })
        }

        let newComment = new Comment(req.params.commentId, text, req.user.id, null)
        newComment.save((err, result) => {
            if (!err) {
                return res.status(200).json({ "SUCCESS": "ANSWER succesfully" })
            } else {
                console.log(err);
                return res.status(500).json({ "ERR": "COULD NOT ANSWER" })
            }
        })
    },
    deleteComment: (req, res) => {
        if (!req.params.id) return res.status(404).send({ "ERR": "Invalid Id" })
        Comment.deleteComment(req.params.id, (err, comments) => {
            if (!err) {
                return res.status(200).json({ "SUCCESS": "Deleted succesfully" })
            } else {
                return res.status(500).json({ "ERR": "Could not delete" })
            }
        })
    },

    getCommentsByPost: (req, res) => {
        let postId = req.params.postId;
        console.log("hi");
        Comment.getCommentsByPost(postId, (err, comments) => {
            if (!err) {
                return res.status(200).json({ comments })
            } else {
                return res.status(500).json({ "ERR": "Could not get comments" })
            }
        })
    },

    getCommentsByUser: (req, res) => {
        let postId = req.params.postId;
        Comment.getCommentsByPost(postId, (err, comments) => {
            if (!err) {
                return res.status(200).json({ comments })
            } else {
                console.log(err);
            }
        })
    },
    
    getAnswers: (req, res) => {
        Comment.getCommentAnswers(req.params.commentId, (err, comments) => {
            if (!err) {
                return res.status(200).json({ comments })
            } else {
                console.log(err);
            }
        })
    }

}