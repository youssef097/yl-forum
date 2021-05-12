import axios from 'axios'
import React, { useEffect, useState } from 'react'
import FriendRequest from './FriendRequest'


export default function Notification() {
    const [notifications, setNotifications] = useState(null)
    // const [show, setShow] = useState("");
    const [showNotifications, setShowNotifications] = useState(false)
    
    useEffect(() => {
        axios.get("/api/user/received-friend-requests")
            .then(({ data }) => {                
                setNotifications(data.requests);
            })

    }, [])

    return (
        <div className="notifications">
            <div className="navbar-bell" onClick={() => { setShowNotifications(!showNotifications) }}  >
                <i className="fas fa-bell"></i>
                <span className="notification-badge">{notifications?.length} </span>
            </div>
                Notifications
            {showNotifications && <div className="notification-list"  >
                <h2>Notifications</h2>
                {notifications && notifications.map((n) => <FriendRequest data={n} />)}
            </div>
            }
        </div>
    )
}
