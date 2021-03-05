import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./TopicPage.css"
import Loading from "../components/Loading"
export default function TopicPage(props) {
    console.log(props);
    const [data, setData] = useState(null)


    useEffect(() => {
        axios.get(`/api/topic/getTopic/${props.match.params.id}`).then(({ data }) => {
            setData(data.topic)
            console.log(data);
        }).catch((err) => {
            setData("ERROR")
        })

    }, [])

    return (
        <div className="topic-page glass">
            {data === null ? <Loading /> : data === "ERROR" ? "Error" : <div>
                <div style={{ backgroundImage: `url('/api/uploads/${data.banner}')` }} className="banner">

                </div>
                <div className="topic-info">
                    <img src={`/api/uploads/${data.image}`} alt="" />
                    <div>
                        <div>
                            <h2>{data.title}</h2>
                            <p>{data.description}</p>
                        </div>
                        <div>
                            <button>Join</button>
                        </div>
                    </div>
                </div>
                <div className="glass">

                </div>
                {/* <img src={`/api/uploads/${data.banner}`} alt=""/> */}
            </div>}
        </div>
    )
}
