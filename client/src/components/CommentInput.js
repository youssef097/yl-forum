import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function CommentInput({ postId, isAnswer, refreshComments, myData }) {
    const [text, setText] = useState("")
    console.log(myData);
    // console.log(refreshComments);
    function sendComment() {

        axios.post(`/api/comment/${isAnswer ? "answer" : "create"}/` + postId, { text })
            .then((res) => {
                refreshComments()
                setText("")
            }).catch((err) => {
                console.log(err);
            })
    }
    return (
        <div className="write-comment">
            <img className="avatar" height="100%" src={myData?.profile ? "/api/uploads/"+myData.profile : "/api/img/default-profile-picture1.jpg"} className="profile-image" alt="" />
            <input onChange={(e) => { setText(e.target.value) }} value={text} name="" id="" cols="30" rows="5"/>            
            <button onClick={() => { sendComment() }} >Comment</button>
        </div>
    )
}
