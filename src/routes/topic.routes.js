const express = require("express")
const router = express.Router();
const topicController = require("../controllers/topic.controller.js")
const auth = require("../auth");
const path = require("path")
const multer = require("multer");
const uuid = require("uuid");
const optionalAuth = require("../optionalAuth.js");
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/")
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.filename)
//     }
// })

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../static/uploads'),    
    filename:  (req, file, cb) => {
        let finalName =uuid.v4()+path.extname(file.originalname)
        req[file.fieldname] = finalName;
        cb(null, finalName);
    },

})
const uploadImage = multer({    
    storage,    
    limits:{fileSize: 1000000}
});

router.get("/topic/my-topics", auth, topicController.getMyTopics)
router.get("/topic/subscribed-topics", optionalAuth, topicController.getSubscribedTopics)

router.post("/topic/join/:id", auth, topicController.joinTopic)
router.post("/topic/disjoin/:id", auth, topicController.disjoinTopic)


router.get("/topic/getTopic/:id",optionalAuth, topicController.getTopic)
// router.get("/topic/getTopic-noAuth/:id", topicController.getTopic)
router.get("/topic/explore", auth, topicController.explore)
router.post("/topic/create", auth, uploadImage.any(), topicController.createTopic)



module.exports = router;