import React from 'react'
import "./PostList.css"
import PostList from "./PostList"

export default function PostListContainer(props) {
    
    return (
        <div className="post-list-container">
            <div onClick={()=>{props.history.push('/publish')}} className="new-post-input">
               <img width="40px" src="/api/img/default-profile-picture1.jpg" alt=""/>
               <input type="text"  placeholder="Write a new post"/>
            </div>

            <div className="order-by">              
                <button>
                    Hottest
                </button>
                <button>
                    Latest
                </button>
            </div>
            
           <PostList></PostList>


        </div>
    )
}
