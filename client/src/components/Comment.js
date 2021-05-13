import axios from 'axios'
import React, { useState } from 'react'
import CommentInput from './CommentInput'
import CommentSection from './CommentSection'
import Loading from './Loading'

export default function Comment({ commentData, parentComment, isAnswer, myData }) {
    const [displayCommentInput, setdisplayCommentInput] = useState(false)
    const [showAnswers, setShowAnswers] = useState(false)
    const [loading, setLoading] = useState(false)
    const [answers, setAnswers] = useState([])
    // useEffect(() => {

    // }, [])
    console.log(commentData);
    function fetchAnswers() {
        axios.get("/api/comment/get-comments/" + commentData.id)
            .then(({ data }) => {
                // coms = (data.comments)
                // setPostdata( data.comments)
                console.log(data);
                setAnswers(data.comments)
                setLoading(false)
            }).catch((e) => {
                console.log(e);
                setLoading(false)
            })
    }

    return (
        <div style={{ paddingLeft: "1em" }} className="comment" >
            <div>
                <img className="avatar" height="40px" src={commentData?.profile ? "/api/uploads/" + commentData.profile : "/api/img/default-profile-picture1.jpg"} className="profile-image" alt="" />
            </div>
            <div>

                {parentComment ? <h5>{commentData.user} to {parentComment.user} </h5> : <h4>{commentData.user} commented </h4>}

                {commentData.text}
                {isAnswer}
                <button onClick={() => { setdisplayCommentInput(!displayCommentInput) }}>Answer</button>
                <button >
                    <i onClick={() => { setShowAnswers(!showAnswers) }} className="fas fa-caret-square-down"> </i>
                </button>
                <div >
                    {displayCommentInput &&
                        <CommentInput postId={commentData.id} myData={myData} isAnswer={true} />
                    }
                    {showAnswers &&
                        <div>
                            <h5>Responses</h5>
                            <CommentSection isAnswer={true} parentComment={commentData} myData={myData} postId={commentData.id} />
                        </div>}
                </div>
            </div>
        </div>
    )
}
