const express = require("express")
const router = express.Router();
const postController = require("../controllers/post.controller")
const auth = require("../auth");
const optionalAuth = require("../optionalAuth")

router.get("/post/get-posts",auth,postController.getPosts)
router.get("/post/get-post/:id",postController.getPostById)
router.get("/post/get-posts/by-topic/:id",auth,postController.getPostsByTopic)
router.get("/post/get-profile-posts/:id",auth,postController.getPostsByUser)


// router.get("/post/explore",postController.getPosts)
router.get("/post/explore",optionalAuth, postController.getPosts)
router.post("/post/create",auth,postController.createPost)



module.exports = router;