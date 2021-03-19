import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { isAuth } from '../auth'
import Loading from '../components/Loading'
import Post from '../components/Post'
import PostListContainer from '../components/PostListContainer'

import "./Profile.css"

export default function ProfilePage(props) {
    const [userData, setUserData] = useState(null)
    const [userPosts, setUserPosts] = useState([])
    const [followed, setFollowed] = useState(null)

    function fetchUserPosts() {
        if (userPosts !== null) {
            axios.get("/api/post/get-profile-posts/" + props.match.params.id)
                .then(({ data }) => {
                    console.log(data);
                    setUserPosts(data.posts)
                }).catch((err) => {
                    console.log(err);
                })

        }
    }
    function fetchUserInfo() {
        axios.get("/api/get-user/" + props.match.params.id)
            .then(({ data }) => {
                setUserData(data.user)
                fetchUserPosts()
            }).catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        fetchUserInfo()
    }, [])

    function handleFollow(f_id) {
        axios.post("/api/user/follow/" + f_id)
            .then(({ data }) => {
                fetchUserInfo()
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleUnfollow(u_id) {
        axios.post("/api/user/unfollow/" + u_id)
            .then(({ data }) => {
                fetchUserInfo()
            })
            .catch((err) => {
                console.log(err);
            })
    }
    // if(userData?.id){
    //     axios.get("/api/post/get-profile-posts/"+props.match.params.id)
    //     .then(({data})=>{
    //         console.log(data);
    //         setUserPosts(data)          
    //     }).catch((err)=>{
    //         console.log(err);
    //     })
    // }

    // console.log(userPosts);

    return (
        <div className="topic-page glass">
            {userData === null ? <Loading /> : userData === "ERROR" ? "Error" : <div>
                <div style={{ backgroundImage: `url('/api/uploads/${userData.banner}')` }} className="banner">

                </div>
                <div className="topic-info">
                    <img width="30px" height="30px" style={{ borderRadius: "50%", border: "2px solid rgba(54, 255, 155)" }} src={userData.profile !== null ? "/api/uploads/" + userData.profile : "/api/img/default-profile-picture1.jpg"} alt="" />


                    <div>
                        <div>
                            <h2>{userData.name}</h2>
                            <p>{userData.bio}</p>
                            <div>
                                <b> {userData.followers} </b> followers
                                <b> {userData.follows} </b> follows
                            </div>
                            {isAuth() ? <div>
                                {userData.isFollowed ? <button className="danger" onClick={() => handleUnfollow(userData.id)}>
                                    Unfollow
                            </button> : <button onClick={() => handleFollow(userData.id)}>
                                    Follow
                             </button>}
                            </div> : ""}
                        </div>


                    </div>
                </div>
                <div className="post-list">
                    {userPosts.length ? userPosts.map((p) => {
                        return <Post postData={p}></Post>
                    }) : "No posts yet"}

                </div>
                <div className="glass">

                </div>
                {/* <img src={`/api/uploads/${data.banner}`} alt=""/> */}
            </div>}
        </div>
    )


}
