import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { isAuth } from '../auth'
import Comment from '../components/Comment'
import CommentInput from '../components/CommentInput'
import CommentSection from '../components/CommentSection'
import Loading from '../components/Loading'
import Post from '../components/Post'

export default function PostPage(props) {
    console.log(props);
    const [postdata, setPostdata] = useState(null)
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    // const [loading, comments = useState(true)
    const [text, setText] = useState("")
    // console.log(props.match.params.id);
    console.log(postdata);

    window.scrollTo(0, 0)

    useEffect(() => {
        let post = {}
        let coms = []
        axios.get("/api/post/get-post/" + props.match.params.id).then(({ data }) => {

            post = data.post
            setPostdata(post)
            setLoading(false)

            // axios.get("/api/comment/get-comments/" + post.id)
            //     .then(({ data }) => {
            //         coms = (data.comments)
            //         setPostdata(post)
            //         setComments(coms)
            //         setLoading(false)
            //     }).catch((err) => { console.log(err); })
        }).catch((err) => {
            setLoading(false)
        })
    }, [])


    // function getComments() {
    //     // setLoading(true)
    //     axios.get("/api/comment/get-comments/" + postdata.id)
    //         .then(({ data }) => {
    //             console.log(data);
    //             setComments(data.comments)
    //             // setLoading(false)
    //         })
    // }

    // function sendComment() {
    //     axios.post("/api/comment/create/" + postdata.id, { text })
    //         .then((res) => {
    //             getComments()
    //             setText("")
    //         }).catch((err) => {
    //             console.log(err);
    //         })
    // }
    return (
        <div>
            <div className="topic-page glass">
                <h3>Post</h3>
                {loading ? <Loading /> :
                    postdata !== null ? <Post maxHeight={false} postData={postdata} /> : "Could not found"
                }
                <div className="glass">

                {/* refreshComments={()=>{getComments()}} */}
                    {loading?<Loading/>: isAuth()&&<CommentInput myData={props.myData}  postId={postdata.id}/> }

                    <h3>comments</h3>

                    {loading ? <Loading /> : <CommentSection myData={props.myData} postId={postdata.id} />}
                </div>
            </div>
            <aside>

            </aside>
        </div>
    )
}
