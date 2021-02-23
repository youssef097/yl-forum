const db = require("./db")
const express = require("express")
const app = express();
const dotenv = require("dotenv").config()

const userRoutes = require("./routes/user")




app.use("/api",userRoutes)


var port = process.env.PORT||3001
app.listen(port,()=>{
    console.log("Server running on port", port);

    db.connect((err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("Connected to DB");            
        }
    })
});



