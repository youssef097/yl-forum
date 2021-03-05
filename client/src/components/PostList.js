import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Post from './Post'
import {isAuth} from "../auth"
import Loading from './Loading'

export default function PostList() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        let route = isAuth()?"get-posts":"explore";
        axios.get(`/api/post/${route}`)
        .then(({data})=>{
            setPosts(data.posts)
        }).catch((error)=>{
            console.log(error);
        })
        
    }, [])

    return (
        <div className="post-list" >
            {posts.length?posts.map((p)=>{
                return <Post postData = {p}></Post>
            }):<Loading/>}
        </div>
    )
}
