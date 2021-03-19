import React from 'react'
import "../styles/PostList.css"
import PostList from "./PostList"

export default function PostListContainer(props) {    
    let redirectUrl = "";
    if(props.match.path === "/topic/:id"){
        redirectUrl = "?topic=" + props.match.params.id;
    };
    // if(props.match)
    return (
        <div className="post-list-container" style={{width:"55%"}}>

            {props.joined === true || props.joined === undefined ? <div onClick={()=>{props.history.push('/publish'+redirectUrl)}} className="new-post-input">
               <img width="40px" src="/api/img/default-profile-picture1.jpg" alt=""/>
               <input type="text"  placeholder="Write a new post"/>
            </div>: <div>Join if u want to publish</div>}

            <div className="order-by">              
                <button>
                    Hottest
                </button>
                <button>
                    Latest
                </button>
            </div>
            
           <PostList topic={props.topic} ></PostList>


        </div>
    )
}
