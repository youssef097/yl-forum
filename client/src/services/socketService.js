import socketIoClient from "socket.io-client"
import { getToken } from "../auth";


const socket = socketIoClient("", {
  auth: {
    token: getToken()
  }
})


socket.on("newMessage",(msg)=>{
  console.log(msg);
})

export default socket;