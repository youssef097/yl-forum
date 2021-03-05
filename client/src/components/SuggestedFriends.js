import React, { useEffect, useState } from 'react'
import Loading from "../components/Loading"
import axios from "axios"
export default function SuggestedFriends({ id, updateUser }) {

    const [friends, setFriends] = useState(null)
    useEffect(() => {
        fetchFriends()
    }, [id])

    function fetchFriends() {
        axios.get("/api/user/suggested-friends")
            .then(({ data }) => {
                setFriends(data.users);
                // console.log(updateUser);
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
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
    return (
        <div className="suggested-friends">
            <div className="card-header">
                <h3>Suggested friends</h3>
            </div>
            <div className="card-body">
                {!friends ? <Loading/> : friends.map((e) => {
                    if (e.id === id) {
                        updateUser(e)
                    } else {
                        return (<div key={e.id}>
                            {/* <div> */}
                            {/* </div> */}
                            <img height="100%" src={e?.profile ? e.profile : "/api/img/default-profile-picture1.jpg"} alt="" />
                            <div>
                                <span className="bold" >{e.name}</span> <span >{e.followers}</span> followers
                                {e.isFollowed ? <button   className="danger" onClick={() => handleUnfollow(e.id)}>
                                    Unfollow
                            </button> : <button  onClick={() => handleFollow(e.id)}>
                                        Follow
                             </button>}

                            </div>
                        </div>)

                    }
                })
                }
            </div>
        </div>
    )
}
