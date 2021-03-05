const Topic = require("../models/Topic")

module.exports = {
    createTopic: (req, res) => {
        console.log(req.body);
        console.log(req.files);
        
        

        if (!req.body || !req.body.title || !req.body.desc || !req.user.id)
            return res.status(400).send({ ERROR: "INCOMPLETE_TOPIC_DATA" });
        console.log(req.body,req.user.id);
        const { title, desc } = req.body;
        const banner = req.banner || null
        const image = req.image || null 
        try {

            const newTopic = new Topic(title,desc,req.user.id,banner,image);
            newTopic.save((error) => {
                if (!error) {
                    res.status(200).json({ SUCCESS: "User registered correctly" })
                } else {
                    console.log(error);
                    res.status(500).json({ ERROR: error.code, message: error.sqlMessage })
                }
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({ ERROR: error })
        }


    },
    joinTopic:(req,res)=>{
        if(!req.params.id){
            return res.status(404).json({ ERROR:"Not found this topic" })
        }
        Topic.join(req.user.id, req.params.id,(error,result)=>{
            if (!error) {
                res.status(200).json({ SUCCESS: "JOINED TOPIC SUCCESFULLY" })
            } else {
                res.status(500).json({ ERROR: error.code, message: error.sqlMessage })
            }
        })
    },
    explore:(req,res)=>{
        Topic.getAllTopics((error,topics)=>{            
            if (!error) {
                res.status(200).json({ topics: topics })
            } else {
                res.status(500).json({ ERROR: error.code, message: error.sqlMessage })
            }
        })
    },
    getTopic:(req,res)=>{        
        console.log(req.params.id);      
        Topic.findTopicById(req.params.id,(err,topic)=>{                        
            if (!err) {
                res.status(200).json({ topic:topic[0] })
            } else {
                res.status(500).json({ ERROR: err.code, message: err.sqlMessage })
            }
        })
    },
    getMyTopics:(req,res)=>{      
        if(!req.user || !req.user.id){
            return res.status(401).send("Not logged")
        }
        Topic.findTopicsNameByUserId(req.user.id,(err,topics)=>{            
            
            if (!err) {
                res.status(200).json({ topics: topics })
            } else {
                res.status(500).json({ ERROR: err.code, message: err.sqlMessage })
            }
        })
    }
}