const Post = require("../models/Post")
module.exports = {
    createPost: (req, res) => {
        console.log("Create Post");
        console.log(req.body,req.user.id);

        if (!req.body || !req.body.text || !req.body.topic || !req.user.id)
            return res.status(400).json({ ERROR: "INCOMPLETE_POST_DATA" });

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
    getPostsByTopic:(req,res)=>{
        Post.getPostsByTopic(req.params.id,(error,posts)=>{
            if (!error) {
                res.status(200).json({ posts })
            } else {              
                console.log(error);  
                res.status(500).json({ ERROR: error.code, message: error.sqlMessage })
            }
        })
    },

    // returns the posts created by a user
    getPostsByUser:(req,res)=>{
        console.log(req.params.id);
        const userId = req.params.id
        Post.getPostsByUser(userId, (error,posts)=>{            
            if (!error) {
                console.log(posts);
                res.status(200).json({ posts })
            } else {              
                console.log(error);  
                res.status(500).json({ ERROR: error.code, message: error.sqlMessage })
            }
        })
    },

    getPostById:(req,res)=>{
        Post.getPost(req.params.id, (error,post)=>{            
            if (!error) {
                // console.log(post);
                res.status(200).json({ post:post[0] })
            } else {                                
                res.status(500).json({ ERROR: error.code, message: error.sqlMessage })
            }
        })
    },

    getPosts: (req,res)=>{
        const userId = req.user?req.user.id : null
        // console.log(userId);
        if(userId){
            console.log("logged");
            Post.getPosts(userId,(error,posts)=>{            
                if (!error) {
                    // pos
                    // console.log(posts);
                    
                    res.status(200).json({ posts:posts })
                } else {              
                    console.log(error);  
                    res.status(500).json({ ERROR: error.code, message: error.sqlMessage })
                }
            })
        }else{
            console.log("not logged");
            Post.relevantPosts((error,posts)=>{            
                if (!error) {
                    // console.log(posts);
                    res.status(200).json({ posts })
                } else {              
                    console.log(error);  
                    res.status(500).json({ ERROR: error.code, message: error.sqlMessage })
                }
            })
        }
    }
}