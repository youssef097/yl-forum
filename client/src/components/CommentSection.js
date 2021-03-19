import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import Loading from './Loading'


export default function CommentSection({isAnswer,parentComment,postId}) {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    // console.log(psotId);
    useEffect(() => {
        axios.get(`/api/comment/${isAnswer?"get-answers":"get-comments"}/` + postId)
        .then(({ data }) => {
            // coms = (data.comments)
            // setPostdata( data.comments)
            console.log(data);
            setComments(data.comments)
            setLoading(false)
        }).catch((e)=>{
            console.log(e);
            setLoading(false)
        })
    }, [])
    return (
        <div>
            {loading?<Loading/>:comments.map((c) => <Comment isAnswer={true} parentComment={parentComment} commentData={c} />)}
        </div>
    )
}
