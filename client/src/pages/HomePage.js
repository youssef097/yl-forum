
import { React, useEffect, useState } from 'react'
import { initAxiosInterceptors } from '../auth';
import Chat from '../components/Chat';
import MyProfile from '../components/MyProfile';
import PostListContainer from '../components/PostListContainer';
import SuggestedFriends from '../components/SuggestedFriends';
import YourTopics from '../components/YourTopics';
// import { whoami } from '../fetchUser';
import socketIoClient from "socket.io-client"

console.log("laoded homepage");
const socket = socketIoClient()
socket.on("friendConnected",()=>{
    console.log("connected");
})

initAxiosInterceptors()
export default function HomePage(props) {
    const [user, setUser] = useState(null)
    useEffect(() => {        
        if(props.user){            
            setUser(props.user)

        };
        props.updateUser()
        // socket.
        // Cleanup (componenDidUnmount)
        return () => socket.disconnect();
        // let io = new WebSocket("ws://localhost:3000")
    }, [])
    
    return (
        <div className="home">
            {/* {!user?"Loading...":<h2>Hello {user.name}</h2>} */}
            {user && <aside>
                <MyProfile user={user} />
                <SuggestedFriends updateUser = {(usr)=>setUser(usr)} id={user.id} />
            </aside>}
            <PostListContainer user={user} {...props}/>
            <YourTopics user = {user} />
            <Chat/>
        </div >
    )
}
