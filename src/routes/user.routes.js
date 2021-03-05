const express = require("express")
const router = express.Router();
const userController = require("../controllers/user.controller.js")
const auth = require("../auth");
const User = require("../models/User.js");



router.get("/users", userController.getAllUsers)
router.get("/get-user/:id", userController.getUser)
router.get("/user/follows", auth, userController.getFollows)
router.get("/user/suggested-friends", auth, userController.getAllUsers)
router.get("/user/whoami", auth, (req, res) => {
    User.getUserById(req.user.id, (err, user) => {
        res.status(200).json({ user:user[0] })
    })
})

router.post("/user/follow/:id", auth, userController.follow)
router.post("/user/unfollow/:id", auth, userController.unfollow)

router.post("/user/register", userController.register)
router.post("/user/login", userController.login)


router.put("/update-banner", auth, userController.updateBanner)
router.put("/update-bio", auth, userController.updateBio)
router.put("/update-profile", auth, userController.updateProfile)
router.put("/update-banner", auth, userController.updateBanner)
router.put("/update-ubication", auth, userController.updateUbication)

module.exports = router;