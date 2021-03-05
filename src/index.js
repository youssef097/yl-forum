const db = require("./db")
const express = require("express")
const app = express();
const dotenv = require("dotenv").config()
const cors = require("cors")
const bodyParser = require("body-parser")
const path = require("path")
// const multer = require("multer")
// const upload = multer({dest:"uploads/"})


// app.use("/api",multer({dest:path.join(__dirname,"static/uploads"), storage:multer.diskStorage({
//     destination:path.join(__dirname,"static/uploads"),
//     filename:(req,file,cb)=>{
//         console.log(file);
//         console.log(            req.files

//         );
//         cb(null,Math.random()*2000+path.extname(file.originalname))
//         // path.join(__dirname,"static/uploads"
//     }
// })}).any())
app.use(cors())

app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json()); // <--- Here
app.use("/api",express.static(path.join(__dirname,"/static")))

const userRoutes = require("./routes/user.routes")
const topicRoutes = require("./routes/topic.routes")
const postRoutes = require("./routes/post.routes");

app.use("/api",userRoutes)
app.use("/api",topicRoutes)
app.use("/api",postRoutes)

// app.use()

app.set("port", process.env.PORT||3001)
app.listen(app.get("port"),()=>{
    console.log("Server running on port", app.get("port"));

    db.connect((err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("Connected to DB");            
        }
    })
});



