import React, { useEffect, useState } from 'react'
import Loading from "../components/Loading"
import axios from "axios"
import { Link } from "react-router-dom"
export default function SuggestedFriends({ id, updateUser }) {

    const [friends, setFriends] = useState(null)
    useEffect(() => {
        fetchFriends()
    }, [])

    function fetchFriends() {
        axios.get("/api/user/suggested-friends")
            .then(({ data }) => {
                setFriends(data.users);
            }).catch((err) => {
                console.log(err);
            })
    }

    function handleFollow(f_id) {
        axios.post("/api/user/follow/" + f_id)
            .then(({ data }) => {
                fetchFriends()
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleUnfollow(u_id) {
        axios.post("/api/user/unfollow/" + u_id)
            .then(({ data }) => {
                fetchFriends()
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function sendFriendRequest(f_id) {
        axios.post("/api//user/send-friend-request/" + f_id)
            .then(({ data }) => {
                fetchFriends()
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function cancelFriendsRequest(u_id) {
        axios.post("/api/user/cancel-friend-request/" + u_id)
            .then(({ data }) => {
                fetchFriends()
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="suggested-friends shadow">
            <div className="card-header">
                <h3>Suggested friends</h3>
            </div>
            <div className="card-body">
                {!friends ? <Loading /> : friends.map((e) => {
                    if (e.id !== id) {
                        // updateUser(e)
                        return (<div key={e.id} className="suggested-friend" onClick={() => { console.log(e); }} >
                            <img src={e?.profile ? "/api/uploads/" + e.profile : "/api/img/default-profile-picture1.jpg"} alt="" />
                            <div>
                                <Link to={`/user/${e.id}`} className="bold" >{e.name}</Link> <span >{e.followers}</span> followers
                                <div className="suggested-friend-button">

                                    {e.isFollowed ? <button className="danger" onClick={() => handleUnfollow(e.id)}>
                                        Unfollow
                                    </button> : <button onClick={() => handleFollow(e.id)}>
                                        Follow
                                    </button>
                                    }
                                    <div>

                                    {!e.isFriend ?
                                        <button onClick={() => { sendFriendRequest(e.id) }} >
                                            <i className="fas fa-user-plus"></i>

                                        </button> : <button className="danger" onClick={() => { cancelFriendsRequest(e.id) }} >
                                            <i className="fas fa-users-slash"></i>
                                        </button>
                                    }
                                    </div>
                                </div>

                            </div>
                        </div>)
                    }
                })
                }
            </div>
        </div>
    )
}
