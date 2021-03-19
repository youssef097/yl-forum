const express = require("express")
const router = express.Router();
const commentController = require("../controllers/comment.controller")
const auth = require("../auth");
const optionalAuth = require("../optionalAuth")

router.get("/comment/get-comments/:postId",commentController.getCommentsByPost)
router.get("/comment/get-answers/:commentId",commentController.getAnswers)

// router.get("/post/get-post/:id",postController.getPostById)
// router.get("/post/get-posts/by-topic/:id",auth,postController.getPostsByTopic)
// router.get("/post/get-profile-posts/:id",auth,postController.getPostsByUser)
// router.get("/post/explore",postController.getPosts)
// router.get("/post/explore",optionalAuth, postController.getPosts)

router.post("/comment/create/:postId",auth,commentController.createComment)
router.post("/comment/answer/:commentId",auth,commentController.answerComment)

router.delete("/comment/delete/:id",auth, commentController.deleteComment);


module.exports = router;