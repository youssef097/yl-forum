import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import socket from '../services/socketService'
import FriendList from './FriendList'


export default function Chat({ myData }) {
    const [showChat, setShowChat] = useState(true)
    const [messages, setMessages] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [message, setMessage] = useState("")

    let M = []

    useEffect(() => {
        axios.get("api/chat/messages/")
        // let messages = []


        socket.on("receiveMessage", (msg) => {
            console.log("Selected user!", selectedUser);
            console.log(msg);
            // console.log(messages);
            let m = messages
            // m.push(msg)
            // if(selectedUser.id == msg.receiver){
                // console.log(messages);
            // let m = [...M, msg]
            // console.log("M",m);
            setMessages(m)
            // }
        })

        // socket.emit("userConnected","user connected")


    }, [])

    function handleSubmitMessage(e) {
        e.preventDefault();
        console.log(myData.id);
        // let messages = []
        socket.emit("newMessage", ({ text: message, receiver: selectedUser.id, sId: socket.id }))
        setMessages([...messages, { text: message, receiver: selectedUser.id, sId: socket.id, sender: myData.id }])

        // setMessages(messages)
        setMessage("")
        console.log();
        // io.emit("newMessage",({text:message,receiver:selectedUser.id}))
    }

    return (
        <div className="chat glass">
            <div className="chat-header shadow" onClick={() => { setShowChat(!showChat) }}>
                <strong> <i class="fas fa-comments"></i> Chat  </strong> 
            </div>
            {showChat &&
                <div className="chat-body">
                    <div className="chat-friends shadow">
                        <FriendList handleSelectUser={(user) => { setSelectedUser(user) }} selected={selectedUser} />
                    </div>


                    {!selectedUser ? <h1 style={{marginTop:"3em", marginLeft:"3em", textAlign:"center"}}>Start chating 😁</h1> :
                        <div className="messages">
                            <div className="messages-header">
                                <h3>{selectedUser.name + "-" + socket.id} - {messages.length}</h3>
                            </div>
                            <div className="messages-body">
                                {messages.length < 1 ? "No messages yet :c" : messages.map((message) => {
                                    return <div className="message">
                                        <div className="message-header">
                                            {message?.sender === myData.id ? "You" : selectedUser.name}
                                        </div>
                                        <div className="message-body">
                                            {/* <pre style={{width:"5em"}}>
                                                {JSON.stringify(message)}
                                            </pre> */}
                                            {message.text}
                                        </div>
                                        <div className="message-footer">
                                            {/* {message.} */}
                                        </div>
                                    </div>
                                })}

                            </div>
                            <form className="messages-footer" onSubmit={(e) => {
                                handleSubmitMessage(e);
                            }}>
                                <input type="text" value={message} onChange={(e) => {
                                    setMessage(e.target.value)
                                }} /> <button >Send</button>
                            </form>
                        </div>
                    }
                </div>}
        </div>
    )
}
