const express = require("express")
const router = express.Router();
const userController = require("../controllers/user.controller.js")
const auth = require("../auth");
const User = require("../models/User.js");
const optionalAuth = require("../optionalAuth.js");



router.get("/users", userController.getAllUsers)
router.get("/get-user/:id", optionalAuth, userController.getUser)
// router.get("/get-user/:id",  userController.getUser)
router.get("/user/follows", auth, userController.getFollows)
router.get("/user/suggested-friends", auth, userController.getAllUsers)
router.get("/user/whoami", auth, (req, res) => {
    User.getUserById(req.user.id, null,(err, result) => {
        // console.log(err);
       console.log(err);
       console.log(result);
        res.status(200).json({ user:result[0] })
    })
})

router.post("/user/follow/:id", auth, userController.follow)
router.post("/user/unfollow/:id", auth, userController.unfollow)


// Manage friends Friends
router.post("/user/send-friend-request/:id", auth, userController.sendFriendRequest)
router.post("/user/cancel-friend-request/:id", auth, userController.cancelFriendRequest)
router.post("/user/accept-friend-request/:id", auth, userController.acceptFriendRequest)
router.post("/user/decline-friend-request/:id", auth, userController.cancelFriendRequest)

router.get("/user/friends",auth, userController.getFriends)
router.get("/user/received-friend-requests",auth, userController.getReceivedFriendRequests)
router.get("/user/sent-friend-requests",auth, userController.getReceivedFriendRequests)



router.post("/user/register", userController.register)
router.post("/user/login", userController.login)


router.put("/update-banner", auth, userController.updateBanner)
router.put("/update-bio", auth, userController.updateBio)
router.put("/update-profile", auth, userController.updateProfile)
router.put("/update-banner", auth, userController.updateBanner)
router.put("/update-ubication", auth, userController.updateUbication)

module.exports = router;