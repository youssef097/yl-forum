import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { isAuth } from '../auth'
import Loading from '../components/Loading'
import Post from '../components/Post'
import PostListContainer from '../components/PostListContainer'

import "./Profile.css"

export default function ProfilePage(props) {
    const [userData, setUserData] = useState(null)
    const [bio, setBio] = useState("")
    const [avatar, setAvatar] = useState(null)
    const [banner, setBanner] = useState(null)
    const [userPosts, setUserPosts] = useState([])
    const [followed, setFollowed] = useState(null)
    const [editBio, setEditBio] = useState(false);

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
                console.log(data.user);
                setUserData(data.user)
                setBio(data.user.bio)
                setBanner(data.user.banner)
                setAvatar(data.user.profile)

                fetchUserPosts()
            }).catch((err) => {
                console.log(err);
                setBio(props.user.bio)
                setBanner(props.user.banner)
                setAvatar(props.user.profile)
            })
    }

    useEffect(() => {
        if(props.user || props.match.params.id =="my-profile"){
            if(!props.user){
                axios.get("/api/user/whoami")
                .then(({ data }) => {
                  if (!props.user) {
                    setUserData(data.user)
                    console.log(data.user);
                  }
                }).catch((err) => {
                  setUserData(null)
                })
            }
            setUserData(props.user)
        }else{
            fetchUserInfo()
        }
    }, [])

    let formData = new FormData()

    function handleSaveChanges(e) {
        // if (avatar !== null) {
        formData.append("avatar", avatar)
        // }
        // if (bio !== null) {
            
        formData.append("bio", bio||null)
        // }
        // if (bio !== null) {
        formData.append("banner", banner)
        // }


        // console.log(formData.get("image"), formData.get("banner"));

        axios.post("/api/user/update-profile", formData, { body: { bio }, headers: { "Content-Type": "multipart/form-data" } })
            .then(({ data }) => {
                console.log(data);
            }).catch((err) => {
                console.log(err);
            })

    }


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

    function previewFile() {
        const blah = document.getElementById("profile-img")
        // console.log();
        const imgInp = document.getElementById("profile-image-upload")
        const [file] = imgInp.files
        if (file) {
            blah.src = URL.createObjectURL(file)
        }

    }

    function previewBanner() {
        const blah = document.getElementById("banner-img")
        // console.log();
        const imgInp = document.getElementById("banner-image-upload")
        const [file] = imgInp.files
        if (file) {
            blah.src = URL.createObjectURL(file)
        }
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

                <div className="banner">
                    <img id="banner-img" onClick={() => {
                        document.getElementById("banner-image-upload").click();
                    }} src={userData.banner !== null ? "/api/uploads/" + userData.banner : "/api/img/default-profile-picture1.jpg"} alt="" style={{ width: "100%", height: "100%" }} />
                    <input id="banner-image-upload" accept="image/*" name="banner" className="hidden" type="file" onChange={(e) => {
                        setBanner(e.target.files[0])
                        previewBanner()
                    }
                    } />
                </div>
                <div className="topic-info">

                    {/* <div class="profile-pic"> */}

                    <img alt="User Pic" id="profile-img" onClick={() => {
                        document.getElementById("profile-image-upload").click();
                    }} src={userData.profile !== null ? "/api/uploads/" + userData.profile : "/api/img/default-profile-picture1.jpg"} height="30px" />
                    <input id="profile-image-upload" name="avatar" accept="image/*" className="hidden" type="file" onChange={(e) => {
                        previewFile()
                        setAvatar(e.target.files[0])
                    }} />



                    <div>
                        <div>
                            <h2>{userData.name} </h2>
                            <p>{userData.bio}</p>
                            <div>
                                <b> {userData.followers} </b> followers
                                <b> {userData.follows} </b> follows
                            </div>
                            <div>
                                <h5>Bio</h5>
                                {
                                    editBio?<>
                                        <textarea   value={bio} onChange={(e)=>{ setBio(e.target.value)}} id="" cols="20" rows="3"/>
                                           
                                        
                                    </>
                                    :<>
                                <p>{userData.bio?userData.bio: bio?bio:<small> <i>No bio</i></small>}</p>
                                    </>
                                }
                                <button className="edit-bio" onClick={()=>setEditBio(!editBio)}>
                                    {editBio?<i class="fas fa-save"></i>:<i class="fas fa-edit"></i>}
                                </button>
                            </div>
                            {isAuth() ? <div>
                                {userData.isFollowed ? <button className="danger" onClick={() => handleUnfollow(userData.id)}>
                                    Unfollow
                            </button> : <button onClick={() => handleFollow(userData.id)}>
                                    Follow
                             </button>}
                            </div> : ""}
                            <div>
                                {isAuth() && userData.isFriend ? "Friend" : ""}
                            </div>

                        </div>


                    </div>
                    <div style={{ float: "right" }}>
                        <button onClick={() => handleSaveChanges()}>Save Changes</button>
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
