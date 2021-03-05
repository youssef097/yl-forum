const express = require("express")
const router = express.Router();
const postController = require("../controllers/post.controller")
const auth = require("../auth");

router.get("/post/get-posts",auth,postController.getPosts)
router.get("/post/explore",postController.getPosts)

router.post("/post/create",auth,postController.createPost)



module.exports = router;