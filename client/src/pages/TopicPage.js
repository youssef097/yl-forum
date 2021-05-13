import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./TopicPage.css"
import Loading from "../components/Loading"
import PostListContainer from "../components/PostListContainer"
import { isAuth } from '../auth'
export default function TopicPage(props) {
    console.log(props);
    const [data, setData] = useState(null)
    const [join, setJoin] = useState(null)

    let auth = isAuth();

    function fetchTopic() {
        axios.get(`/api/topic/getTopic/${props.match.params.id}`).then(({ data }) => {
            setData(data.topic)
            console.log(data);
        }).catch((err) => {
            setData("ERROR")
        })
    }
    useEffect(() => {
        fetchTopic()
    }, [])

    function joinTopic(id) {
        // console.log();
        if (!auth) {
            // console.log(props);
            props.history.push(`/login?redirect=${props.match.url}`)
        } else {
            axios.post("/api/topic/join/" + id).then(({ data }) => {
                fetchTopic()
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    function disjoinTopic(id) {
        axios.post("/api/topic/disjoin/" + id).then(({ data }) => {
            fetchTopic()
        }).catch((err) => {
            console.log(err);
        })

    }

    return (
        <div className="topic-page">
            {data === null ? <Loading /> : data === "ERROR" ? "Error" : <div>
                <div style={{ backgroundImage: `url('/api/uploads/${data.banner}')` }} className="banner">

                </div>
                <div className="topic-info">
                    <img width="30px" height="30px" style={{ borderRadius: "50%", border: "2px solid rgba(54, 255, 155)" }} src={data.image !== "null" ? "/api/uploads/" + data.image : "/api/img/no-photo-topic.PNG"} alt="" />


                    <div>
                        <div>
                            <h2>{data.title}</h2>
                            <p>{data.description}</p>
                        </div>
                        <div>
                            {data.joined === true ?
                                <button onClick={() => { disjoinTopic(data.id)}}> Joined</button> :
                                <button onClick={() => { joinTopic(data.id)  }}> Join</button>
                            }

                        </div>
                    </div>
                </div>
                <div className="glass">
                    <PostListContainer fullWidth = {true} {...props} joined = {data.joined} topic={data.id} />
                </div>
                {/* <img src={`/api/uploads/${data.banner}`} alt=""/> */}
            </div>}
        </div>
    )
}
