import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Topic from '../components/Topic'
// use

export default function ExplorePage(props) {
    const [topics, setTopics] = useState([])
    console.log(props);
    useEffect(() => {
        axios.get("/api/topic/explore").then(({ data }) => {
            console.log(data.topics);
            setTopics(data.topics);
        })
    }, [])
    return (
        <div className="shadow " style={{ maxWidth: "799px", margin: "auto", paddingTop: "3rem" }}>
            <div className="explore-topic-list">
                <h2>trending Topics</h2>

                {topics.map((t) => <Topic {...props} topicData={t} />)}
            </div>
        </div>
    )
}
