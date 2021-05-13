import React from 'react'
import { Link, Redirect } from "react-router-dom"
import parser from "html-react-parser"
import m from "moment"

export default function Post({ postData,maxHeight }) {
    console.log(maxHeight);
    return (
        <div className="post shadow" style={{maxHeight:maxHeight?"500px":"none"}} onClick={()=>{}} >
            <div className="post-header glass">
                <Link to={"/topic/" + postData.t_id}><img width="30px" height="30px" style={{ borderRadius: "50%", border: "2px solid rgba(54, 255, 155)" }} src={postData.t_img !== "null" ? "/api/uploads/" + postData.t_img : "/api/img/no-photo-topic.PNG"} alt="" /></Link>
                <Link to={"/topic/" + postData.t_id}><b>{postData.title}</b></Link>
                <small>
                    Published by <Link to={"/user/" + postData.u_id} > {postData.u_name} </Link>
                    {m(postData).fromNow()}
                </small>
            </div>
            <div className="post-content">
                <div className="post-text">{parser(postData.text)}</div>
            </div>
            <div className="post-footer">
                {/* <i class="fas fa-heart"></i>  */}
                <div>
                <i class="far fa-heart"></i>
                {postData.likes} 

                </div>
                <div>
                <i class="fas fa-comment-alt"></i> 
                {postData.comments} 

                </div>
                <Link  to={`/post/${postData.id}`}> <button>View more</button> </Link>
            </div>
        </div>
    )
}
