import React from 'react'

export default function MyProfile({ user }) {

    return (
        <div className="my-profile shadow">
            <img className="banner" src={user?.banner ? "/api/uploads/"+user.banner : "/api/img/default-banner.jpg"} alt="" />
            <div className="content">
                <div>
                    <div>
                        <img src={user?.profile ?"/api/uploads/" +user.profile : "/api/img/default-profile-picture1.jpg"} className="profile-image" alt="" />
                        <div className="user-data">
                            <span className="user-name">{user.name}</span>
                        </div>
                    </div>
                    <div className="user-data">
                        <div className="user-followers">
                            <div>
                                <h3>{user.follows}</h3>
                                <span>follows</span>
                            </div>
                            <div>
                                <h3>{user.followers}</h3>
                                <span>followers</span>
                            </div>
                            <div>
                                <h3>{user.posts}</h3>
                                <span>posts</span>
                            </div>
                            <button className="edit-profile-button">Edit Profile</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
