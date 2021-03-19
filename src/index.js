const db = require("./db")
const express = require("express")
const app = express();
const httpServer = require("http").createServer(app)
const dotenv = require("dotenv").config()
const cors = require("cors")
const bodyParser = require("body-parser")
const path = require("path")
const morgan = require("morgan")
const socketIo = require("socket.io")

const io = socketIo(httpServer)

app.use(cors())
app.use(morgan("dev"))

app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json()); // <--- Here
app.use("/api",express.static(path.join(__dirname,"/static")))

const userRoutes = require("./routes/user.routes")
const topicRoutes = require("./routes/topic.routes")
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes")

app.use("/api",userRoutes)
app.use("/api",topicRoutes)
app.use("/api",postRoutes)
app.use("/api",commentRoutes)


app.set("port", process.env.PORT||3001)

io.on("connection",(socket)=>{
    console.log("New user connected");
    socket.emit("friendConnected")
})

httpServer.listen(app.get("port"),()=>{
    // console.log("Server running on port", app.get("port"));
    db.connect((err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("Connected to DB");            
        }
    })
});


// module.exports =  socketIo;
