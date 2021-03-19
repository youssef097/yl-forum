import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Topic from '../components/Topic'
// use

export default function ExplorePage(props) {
    const [topics, setTopics] = useState([])
    console.log(props);
    useEffect(() => {
        axios.get("/api/topic/explore").then(({ data }) => {
            setTopics(data.topics);
        })
    }, [])
    return (
        <div style={{ maxWidth: "799px", margin: "auto", paddingTop: "3rem" }}>
            <h2>trending Topics</h2>
            <div style={{ display: 'grid', gridTemplateColumns: "1fr 1fr 1fr", gap: "1em" }} >
                {topics.map((t) => <Topic {...props} topicData={t} />)}
            </div>
        </div>
    )
}
