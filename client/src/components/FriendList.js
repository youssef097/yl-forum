import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function FriendList({handleSelectUser,selected}) {
    const [friends, setFriends] = useState([])

    useEffect(() => {
        axios.get("/api/user/friends")
        .then(({data})=>{
            setFriends(data.users)
        })
    }, [])
    
    console.log(friends);
    return (
        <div className="friend-list">
            {!friends?"Loading...": friends.map((e)=>{
            return <div key={e.id} className={`user ${selected && selected.id === e.id?"chat-active":""}` } onClick={()=>handleSelectUser(e)}>
                <img height="100%" src={e?.profile ? e.profile : "/api/img/default-profile-picture1.jpg"} width="40px" alt="" />
                <div>
                    <Link to={`/user/${e.id}`} className="bold" >{e.name}</Link> <span >{e.followers}</span> followers
                </div>
            </div>
            })}
            
        </div>
    )
}
