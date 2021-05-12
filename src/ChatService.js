const auth = require("./auth");
const { io } = require("./index")
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Message = require("./models/Message");


// const io = app.get("socketio")
io.use((socket, next) => {
    const { token } = socket.handshake.auth
    // console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(new Error("Authentication error"));
        socket.userData = user;
        next()
    })
}).on("connection", (socket) => {
    // console.log(socket.rooms);
    socket.join(socket.userData.id);
    console.log(socket.userData.name, "se ha conectado");
    console.log(socket.rooms);
    // p5 br2 bg-
    // socket.on("userConnected", () => {
    //     console.log("usuarioConectado");
    // console.log(io.in(socket.userData.id).allShockets())
    // var roster = io.sockets.clients(socket.userData.id)
    // console.log(roster)
    socket.on("receiveMessage",(msg)=>{
        console.log(msg);
    })
    User.getFriends(socket.userData.id, (err, res) => {
        // console.log(res);
        console.log("Amigos de " + socket.userData.name + " ( " + res.length + " )");
        // console.log(res);
        res.forEach(friend => {
            socket.to(friend.id).emit(JSON.stringify(socket.userData))
            // console.log(`${friend.name} to ${friend.name} `);
        });
    })

    // socket.on("typing", () => {
    //     socket.to.emit()
    // })


    // })
    // console.log(io.sockets.adapter.rooms);

    socket.on("newMessage", ({ text, receiver, sId }) => {
        console.log(text, socket.userData.id, receiver);
        const msg = new Message(text, socket.userData.id, receiver)
        io.in(receiver).emit("receiveMessage",msg)
        // socket.to(receiver).emit(msg)
        msg.save();
    })

    socket.on("disconnect", () => {
        socket.leave(socket.userData.id);
        // console.log(io.sockets.adapter.rooms);
    })

    // console.log(socket.userData);
})

