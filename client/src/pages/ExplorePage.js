import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Topic from '../components/Topic'


export default function ExplorePage(props) {
    const [topics, setTopics] = useState([])   
    console.log(props);
    useEffect(() => {
        axios.get("/api/topic/explore").then(({data})=>{
           setTopics(data.topics);
        })        
    }, [])
    return (
        <div  style={{maxWidth:"799px",margin:"auto", paddingTop:"3rem"} }>
            <div>trending Topics</div>
            <div  style={{display:'flex', flexDirection:"column", gap:"1em"}} >
                <h2>{topics.length}</h2>
                {topics.map((t)=> <Topic {...props} topicData={t} />)}
            </div>
        </div>
    )
}
