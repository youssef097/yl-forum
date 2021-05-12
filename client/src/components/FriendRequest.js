import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function FriendRequest({data}) {    
    const [accepted, setAccepted] = useState(data.accepted);

    // useEffect(() => {
    //     axios.get("/api/user/received-friend-requests")
    //     .then(({data})=>{
    //         console.log(data);
    //         // setNotifications();
    //     })
        
    // }, [])
    console.log(data);
    function acceptFriendRequest(){
        axios.post("/api/user/accept-friend-request/"+data.id)
        .then(({data})=>{            
            setAccepted(1)
        })
    }
    function declineFriendRequest(){
        axios.post("/api/user/decline-friend-request/"+data.id)
        .then(({data})=>{            
            console.log(data);
            setAccepted(2)
        })
    }
    return (
        <div className="friend-request">
            {/* <h5>Friend request</h5> */}
            
            <img src={data?.profile ? data.profile : "/api/img/default-profile-picture1.jpg"} className="profile-image" alt="" />
            <div className="request-details">
                <div>
                    <Link to={"/user/"+data.id} ><b>{data.name}</b></Link> wants to be your friend
                </div>
                {accepted === 2? <span className="danger">Declined</span>: accepted===1?<div>Accepted</div>
                :<div>
                    <button onClick={()=>{acceptFriendRequest()}} >Accept</button>
                    <button  onClick={()=>{declineFriendRequest()}} className="danger">Decline</button>
                </div>
                }
            </div>
        </div>
    )
}
