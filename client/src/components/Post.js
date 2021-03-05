import React from 'react'
import {Link} from "react-router-dom"
import parser from "html-react-parser"
import m from "moment"

export default function Post({postData}) {
    console.log(postData);
    return (
        <div className="post">
            <div>
                <img width="30px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Sport_balls.svg/200px-Sport_balls.svg.png" alt=""/>
                <Link to={"/topic/"+postData.t_id}><b>{postData.title}</b></Link>
                <small>
                    Published by <Link to={"/user/"+postData.u_id} > {postData.u_name} </Link> 
                    {m(postData).fromNow()}
                </small>
            </div>
            <div className="post-content">                
                <div className="post-text">{parser(postData.text)}</div>
            </div>
        </div>
    )
}
