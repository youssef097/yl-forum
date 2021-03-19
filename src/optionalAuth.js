const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports =  (req,res,next)=>{        
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if(token==null){
        next()
    }else{
        jwt.verify(token, process.env.JWT_SECRET,(err,user)=>{                
            req.user = user;
            next()
        })
    }
}