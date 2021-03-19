import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import Topic from './Topic'

import Loading from './Loading'
import { isAuth } from '../auth'
export default function YourTopics({user}) {
    const [topics, setTopics] = useState(null)
    useEffect(() => {
        axios.get("/api/topic/subscribed-topics").then(({data})=>{
            console.log(data.topics);
            setTopics(data.topics)
        })        
    }, [])
    return (
        <aside className="your-topics">
            <div>
                {topics===null?<Loading/>:<div>
                    <div className="your-topics-header">
                        <h3>{user?"Topics you follow":"Popular Topics"}</h3>                    
                    </div>
                    <div className="your-topics-body">
                        {topics.map((t)=>  <Link to={"/topic/"+t.id} > <Topic key={t.id} topicData={t} /></Link> )}                    
                    </div>
                    { isAuth()&&
                    <div className="your-topics-buttons">
                        <Link to="/create-topic"> <button>Create your own topic</button></Link>
                            <span>or</span>
                        <Link to="/explore"> <button>Explore</button></Link>

                    </div>}
                </div>


                }
            </div>
        </aside>
    )
}
