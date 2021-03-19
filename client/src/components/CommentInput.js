import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function CommentInput({postId, isAnswer, refreshComments}) {
    const [text, setText] = useState("")
    // console.log(refreshComments);
    function sendComment() {
        
        axios.post(`/api/comment/${isAnswer?"answer": "create"}/` + postId, { text })
            .then((res) => {
                refreshComments()
                setText("")
            }).catch((err) => {
                console.log(err);
            })
    }
    return (
        <div>
        <input onChange={(e) => { setText(e.target.value) }} value={text} name="" id="" cols="30" rows="5">

        </input>
        <button onClick={() => { sendComment() }} >Send</button>
    </div>
    )
}
