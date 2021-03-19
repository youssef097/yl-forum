import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Post from './Post'
import { isAuth } from "../auth"
import Loading from './Loading'
import { Link } from 'react-router-dom'

export default function PostList({ topic }) {
    const [posts, setPosts] = useState(null)
    useEffect(() => {
        let route = isAuth() ? "get-posts" : "explore";
        let url = `/api/post/${route}${route === "get-posts" && topic ? "/by-topic/" + topic : ""}`
        console.log(url);
        axios.get(url)
            .then(({ data }) => {
                setPosts(data.posts)
            }).catch((error) => {
                console.log(error);
            })
    }, [])

        return (
            <div className="post-list" >
                {posts === null ? <Loading /> : posts.length ? posts.map((p) => {
                    return <Post postData={p}></Post>
                }) : <div className="your-topics-buttons">
                    <Link to="/create-topic"> <button>Create your own topic</button></Link>
                    <span>or</span>
                    <Link to="/explore"> <button>Explore</button></Link>
                </div>}
            </div>
        )
}
