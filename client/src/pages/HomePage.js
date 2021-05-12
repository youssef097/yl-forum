
import { React, useEffect, useState } from 'react'
import { getToken, initAxiosInterceptors } from '../auth';
import Chat from '../components/Chat';
import MyProfile from '../components/MyProfile';
import PostListContainer from '../components/PostListContainer';
import SuggestedFriends from '../components/SuggestedFriends';
import YourTopics from '../components/YourTopics';
// import { whoami } from '../fetchUser';
// import socketIoClient from "socket.io-client"
import Loading from '../components/Loading';

console.log("laoded homepage");




        
       
    initAxiosInterceptors()
    export default function HomePage(props) {

        const [user, setUser] = useState(null)
        useEffect(()=>{
            console.log("UseEFect cargado!");
            if(props.user){            
                setUser(props.user)                
            }else{
                props.updateUser()
            }

            // console.log(socket.id);
         
        },[])
    
        // if(props.user){
        //     const socket = socketIoClient("",{
        //         auth:{
        //             token:getToken()
        //         }
        //     })
        //     socket.emit("userConnected")
        //     socket.on("connectedFriend",(user)=>{
        //         console.log(user);
        //     })
        // }

        // socket.
        // Cleanup (componenDidUnmount)
        // return () => socket.disconnect();
        // let io = new WebSocket("ws://localhost:3000")
    
    
    return (
        <div className="home">
            {/* {!user?"Loading...":<h2>Hello {user.name}</h2>} */}
            {!user?<Loading/>: <aside>
                <MyProfile user={user} />
                <SuggestedFriends updateUser = {(usr)=>setUser(usr)} id={user.id} />
            </aside>}
            <PostListContainer user={user} {...props}/>
            <YourTopics user = {user} />
            <Chat/>
        </div >
    )
}
