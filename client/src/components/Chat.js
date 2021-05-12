import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import socket from '../services/socketService'
import FriendList from './FriendList'


export default function Chat() {
    const [showChat, setShowChat] = useState(false)
    const [messages, setMessages] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [message, setMessage] = useState("")


    
    useEffect(() => {
        axios.get("api/chat/messages/")

        let  messages = []

        socket.on("receiveMessage", (msg) => {
            console.log("Selected user!", selectedUser);
            // if(selectedUser.id == msg.receiver){
                messages = [...messages, msg]
                setMessages(messages)
            // }
        })

        // socket.emit("userConnected","user connected")


    }, [])

    function handleSubmitMessage(e) {
        e.preventDefault();
        socket.emit("newMessage", ({ text: message, receiver: selectedUser.id, sId: socket.id }))
        setMessage("")
        console.log();
        // io.emit("newMessage",({text:message,receiver:selectedUser.id}))
    }

    return (
        <div className="chat glass">
            <div className="chat-header" onClick={() => { setShowChat(!showChat) }}>
                <strong> <i class="fas fa-comments"></i> Chat  </strong> - x online
            </div>
            {showChat &&
                <div className="chat-body">
                    <div className="chat-friends">
                        <FriendList handleSelectUser={(user) => { setSelectedUser(user) }} selected={selectedUser} />
                    </div>


                    {!selectedUser ? "Start Chating :D" :
                        <div className="messages">
                            <div className="messages-header">
                                <h3>{selectedUser.name + "-" + socket.id} - {messages.length}</h3>
                            </div>
                            <div className="messages-body">
                                {messages.length < 1 ? "No messages yet :c" : messages.map((message) => {
                                    return <div className="message">
                                        <div className="message-header">
                                            {selectedUser?.name}
                                        </div>
                                        <div className="message-body">
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
