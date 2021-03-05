const Post = require("../models/Post")
module.exports = {
    createPost: (req, res) => {
        console.log("Create Post");
        console.log(req.body,req.user.id);

        if (!req.body || !req.body.text || !req.body.topic || !req.user.id)
            return res.status(400).send({ ERROR: "INCOMPLETE_POST_DATA" });

        const { topic, text} = req.body;
       
        
        try {
            const newPost = new Post(topic,req.user.id,text);
            newPost.save((error) => {
                if (!error) {
                    res.status(200).json({ SUCCESS: "Post published succesfully" })
                } else {
                    console.log("Couldsn save!!");
                    res.status(500).json({ ERROR: error.code, message: error.sqlMessage })
                }
            });

        } catch (error) {
            console.log(error);
            console.log("Couldsn save!! -< Here");

            res.status(500).json({ ERROR: error })
        }


    },
    getPosts: (req,res)=>{
        const userId = req.user || null
        Post.getPostsByUser(userId,(error,posts)=>{            
            if (!error) {
                res.status(200).json({ posts })
            } else {              
                console.log(error);  
                res.status(500).json({ ERROR: error.code, message: error.sqlMessage })
            }
        })
       
    }
}